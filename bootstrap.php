<?php

use TightenCo\Jigsaw\Jigsaw;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\MarkdownConverter;

/** @var \Illuminate\Container\Container $container */
/** @var \TightenCo\Jigsaw\Events\EventBus $events */

/*
 * Configure CommonMark to support hard line breaks (backslash at end of line)
 */
$container->bind('markdown', function () {
    $config = [
        'commonmark' => [
            'enable_em' => true,
            'enable_strong' => true,
            'use_asterisk' => true,
            'use_underscore' => true,
        ],
    ];

    $environment = new Environment($config);
    $environment->addExtension(new CommonMarkCoreExtension());

    return new MarkdownConverter($environment);
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

/*
 * Fix hard line breaks after build
 * Convert backslash-newline pattern to <br/> tags
 */
$events->afterBuild(function (Jigsaw $jigsaw) {
    $outputPath = $jigsaw->getDestinationPath();

    // Find all index.html files in post directories (YYYY/MM/DD/slug/index.html)
    $pattern = $outputPath . '/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]/*/index.html';

    foreach (glob($pattern) as $file) {
        $content = file_get_contents($file);

        // Replace backslash-newline with <br/>
        // Matches: ,\ followed by newline and capital letter (like "Queen")
        $content = preg_replace('/,\\\\\n(?=[A-Z])/', ",<br />\n", $content);

        // More general: any backslash-newline inside paragraph tags
        $content = preg_replace('/\\\\\n/', "<br />\n", $content);

        file_put_contents($file, $content);
    }
});
