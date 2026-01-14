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

    foreach ($collections as $collectionName) {
        $collection = $jigsaw->getCollection($collectionName);

        foreach ($collection as $item) {
            // Extract date from path: YYYY/MM/DD-slug
            $path = $item->getPath();

            // Match pattern: YYYY/MM/DD-slug
            if (preg_match('#(\d{4})/(\d{2})/(\d{2})-([^/]+)#', $path, $matches)) {
                $year = $matches[1];
                $month = $matches[2];
                $day = $matches[3];
                $slug = $matches[4];

                // Set date in Y-m-d format for sorting
                $item->date = "$year-$month-$day";
                $item->year = $year;
                $item->month = $month;
                $item->day = $day;
                $item->slug = $slug;
            }
        }
    }

});
