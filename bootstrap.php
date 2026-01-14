<?php

use TightenCo\Jigsaw\Jigsaw;

/** @var \Illuminate\Container\Container $container */
/** @var \TightenCo\Jigsaw\Events\EventBus $events */

/*
 * Extract date from directory path and add to page metadata
 * Posts are organized as YYYY/MM/DD-slug/index.md
 */
$events->afterCollections(function (Jigsaw $jigsaw) {
    // Collect all unique tags from both post collections
    $allTags = collect();

    $collections = ['posts_queen', 'posts_olavea'];
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
