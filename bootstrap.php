<?php

use TightenCo\Jigsaw\Jigsaw;

/** @var \Illuminate\Container\Container $container */
/** @var \TightenCo\Jigsaw\Events\EventBus $events */

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
 * Fix relative image paths after build
 * Convert ./image.png to ../slug-image.png to match the new image location
 */
$events->afterBuild(function (Jigsaw $jigsaw) {
    $outputPath = $jigsaw->getDestinationPath();

    // Find all index.html files in post directories (YYYY/MM/DD/slug/index.html)
    $pattern = $outputPath . '/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]/*/index.html';

    foreach (glob($pattern) as $file) {
        // Extract slug from file path: /path/to/YYYY/MM/DD/slug/index.html
        if (preg_match('#/([^/]+)/index\.html$#', $file, $matches)) {
            $slug = $matches[1];

            $content = file_get_contents($file);

            // Replace src="./image.png" with src="../slug-image.png"
            $content = preg_replace_callback(
                '/(<img[^>]+src=")\.\/([^"]+)/',
                function($m) use ($slug) {
                    return $m[1] . '../' . $slug . '-' . $m[2];
                },
                $content
            );

            // Also fix href="./file" for links (not images)
            $content = preg_replace_callback(
                '/(<a[^>]+href=")\.\/([^"]+)/',
                function($m) use ($slug) {
                    return $m[1] . '../' . $slug . '-' . $m[2];
                },
                $content
            );

            file_put_contents($file, $content);
        }
    }
});
