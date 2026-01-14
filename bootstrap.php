<?php

use TightenCo\Jigsaw\Jigsaw;
use Mni\FrontYAML\Markdown\MarkdownParser as FrontYAMLMarkdownParser;
use Highlight\Highlighter;

/** @var \Illuminate\Container\Container $container */
/** @var \TightenCo\Jigsaw\Events\EventBus $events */

/*
 * Disable CommonMark due to conflict with Blade @ escaping
 *
 * Issue: Jigsaw's MarkdownHandler escapes @ symbols to {{'@'}} which works with
 * the default JigsawMarkdownParser but creates invalid PHP when used with CommonMark.
 *
 * Trade-off: We lose CommonMark's backslash line break feature (\), but @ symbols
 * (@raae, @GatsbyJS) work correctly. Users can use two spaces at end of line for breaks.
 */
$container['config']->put('commonmark', false);

/*
 * Apply server-side syntax highlighting to code blocks
 */
$events->afterBuild(function (Jigsaw $jigsaw) {
    $highlighter = new Highlighter();

    // Get all HTML files in the build directory
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($jigsaw->getDestinationPath()),
        RecursiveIteratorIterator::SELF_FIRST
    );

    foreach ($files as $file) {
        if ($file->isFile() && $file->getExtension() === 'html') {
            $html = file_get_contents($file->getPathname());

            // Find all code blocks with language classes
            $html = preg_replace_callback(
                '/<pre><code class="language-(\w+)">(.*?)<\/code><\/pre>/s',
                function ($matches) use ($highlighter) {
                    $language = $matches[1];
                    $code = html_entity_decode($matches[2], ENT_QUOTES | ENT_HTML5);

                    try {
                        $highlighted = $highlighter->highlight($language, $code);
                        return '<pre><code class="hljs language-' . $language . '">' .
                               $highlighted->value .
                               '</code></pre>';
                    } catch (\Exception $e) {
                        // If highlighting fails, return original
                        return $matches[0];
                    }
                },
                $html
            );

            file_put_contents($file->getPathname(), $html);
        }
    }
});

/*
 * Extract date from directory path and add to page metadata
 * Posts are organized as YYYY/MM/DD-slug/index.md
 */
$events->afterCollections(function (Jigsaw $jigsaw) {
    $collections = ['posts_queen', 'posts_olavea'];

    // First, ensure all posts have proper dates extracted from filenames
    foreach ($collections as $collectionName) {
        $collection = $jigsaw->getCollection($collectionName);

        foreach ($collection as $post) {
            // If date is not set in frontmatter, extract from filename
            $filename = $post->getFilename();
            if (preg_match('#^(\d{4})-(\d{2})-(\d{2})-(.+)$#', $filename, $matches)) {
                // Only set if not already in frontmatter or if it's invalid
                if (!isset($post->date) || empty($post->date)) {
                    $year = $matches[1];
                    $month = $matches[2];
                    $day = $matches[3];
                    $post->date = "$year-$month-$day";
                }
            }
        }
    }

    // Collect all unique tags from both post collections
    $allTags = collect();

    foreach ($collections as $collectionName) {
        $collection = $jigsaw->getCollection($collectionName);

        foreach ($collection as $post) {
            if (isset($post->tags)) {
                $tags = array_map('trim', explode(',', $post->tags));
                foreach ($tags as $tag) {
                    if (!empty($tag)) {
                        $allTags->push($tag);
                    }
                }
            }
        }
    }

    $uniqueTags = $allTags->unique()->sort()->values();

    // Generate a page for each tag
    foreach ($uniqueTags as $tag) {
        // Get all posts with this tag
        $taggedPosts = collect();

        foreach ($collections as $collectionName) {
            $collection = $jigsaw->getCollection($collectionName);
            foreach ($collection as $post) {
                if (isset($post->tags)) {
                    $postTags = array_map('trim', explode(',', $post->tags));
                    if (in_array($tag, $postTags)) {
                        $taggedPosts->push($post);
                    }
                }
            }
        }

        // Sort by date descending
        $taggedPosts = $taggedPosts->sortByDesc('date');

        // Create a new page for this tag
        $jigsaw->newPage(
            'posts/tag/' . $tag,
            [
                'extends' => '_layouts.tag',
                'tag' => $tag,
                'posts' => $taggedPosts,
            ]
        );
    }
});
