<?php

return [
    'production' => false,
    'baseUrl' => 'https://queen.raae.codes',
    'siteName' => 'Queen Raae',
    'title' => 'Queen Raae',
    'tagline' => 'Sailing the high seas of the World Wide Web',
    'description' => 'Ahoy, seasoned JavaScript developers and daring dev pirates! Join our swashbuckling crew as we embark on thrilling treasure hunts unraveling the secrets of HTML, CSS, and JavaScript, all while having a blast!',
    'lang' => 'en',
    'socialImage' => '/raae.jpg',
    'socialImageAlt' => 'Queen Raae holding a laptop in front of her gallery wall',
    'twitterCreator' => '@raae',
    'socialMedia' => [
        'github' => 'https://github.com/queen-raae',
        'twitter' => 'https://twitter.com/raae',
        'youtube' => 'https://www.youtube.com/QueenRaae',
    ],

    // Collections for blog posts
    'collections' => [
        'posts_queen' => [
            'extends' => '_layouts.post',
            'path' => function ($page) {
                // Extract date from source path: YYYY/MM/DD-slug
                $sourcePath = $page->getPath();
                if (preg_match('#(\d{4})/(\d{2})/(\d{2})-([^/]+)#', $sourcePath, $matches)) {
                    $year = $matches[1];
                    $month = $matches[2];
                    $day = $matches[3];
                    $slug = $matches[4];

                    // Set date for later use
                    $page->date = "$year-$month-$day";
                    $page->slug = $slug;

                    return "$year/$month/$day/$slug";
                }
                return $sourcePath;
            },
            'sort' => '-date',
        ],
        'posts_olavea' => [
            'extends' => '_layouts.post',
            'path' => function ($page) {
                // Extract date from source path: YYYY/MM/DD-slug
                $sourcePath = $page->getPath();
                if (preg_match('#(\d{4})/(\d{2})/(\d{2})-([^/]+)#', $sourcePath, $matches)) {
                    $year = $matches[1];
                    $month = $matches[2];
                    $day = $matches[3];
                    $slug = $matches[4];

                    // Set date for later use
                    $page->date = "$year-$month-$day";
                    $page->slug = $slug;

                    return "$year/$month/$day/$slug";
                }
                return $sourcePath;
            },
            'sort' => '-date',
        ],
        'talks' => [
            'path' => 'talks/{filename}',
            'sort' => '-date',
        ],
    ],

    // Helper function to get all posts merged from both authors
    'getAllPosts' => function ($page) {
        return collect([
            ...$page->posts_queen,
            ...$page->posts_olavea,
        ])->sortByDesc('date');
    },
];
