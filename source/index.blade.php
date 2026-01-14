@extends('_layouts.main')

@section('body')
<div class="max-w-5xl mx-auto px-4 py-8">
    {{-- Hero Section --}}
    <header class="mb-16 text-center">
        <h1 class="text-5xl font-bold text-brown-900 mb-4">
            {{ $page->siteName }}
        </h1>
        <p class="text-2xl text-brown-700 mb-6">
            {{ $page->tagline }}
        </p>
        <div class="prose prose-lg prose-brown max-w-3xl mx-auto">
            <p>Ahoy, seasoned JavaScript developers and daring dev pirates! Join our swashbuckling crew as we embark on thrilling treasure hunts unraveling the secrets of HTML, CSS, and JavaScript, all while having a blast!</p>
            <p class="text-xl">🏴‍☠️ Set sail with us every other <a href="{{ $page->socialMedia['youtube'] }}/live">Saturday on YouTube at 11:00 CET</a></p>
        </div>
    </header>

    {{-- Latest Posts Section --}}
    <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-brown-900">Latest Posts</h2>
            <a href="/posts" class="text-brown-700 hover:text-brown-900 font-medium">
                View all posts →
            </a>
        </div>

        <div class="space-y-8">
            @php
                // In Jigsaw, collections are available as global variables
                $postsQueen = isset($posts_queen) ? $posts_queen : collect([]);
                $postsOlavea = isset($posts_olavea) ? $posts_olavea : collect([]);

                $allPosts = collect([...$postsQueen, ...$postsOlavea])
                    ->sortByDesc('date')
                    ->take(7);
            @endphp

            @if($allPosts->count() > 0)
                @foreach($allPosts as $post)
                <article class="border-b border-brown-200 pb-6 hover:border-brown-400 transition-colors">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <a href="{{ $post->getPath() }}" class="group">
                                <h3 class="text-2xl font-bold text-brown-900 mb-2 group-hover:text-brown-700 transition-colors">
                                    {{ $post->title }}
                                </h3>
                            </a>

                            <div class="flex items-center gap-4 text-sm text-brown-600 mb-3">
                                @if($post->date)
                                    <time datetime="{{ $post->date }}">
                                        {{ date('F j, Y', strtotime($post->date)) }}
                                    </time>
                                @endif
                                @if($post->author)
                                    <span>by {{ $post->author }}</span>
                                @endif
                            </div>

                            @if($post->tags)
                                <div class="flex flex-wrap gap-2">
                                    @foreach(array_slice(array_map('trim', explode(',', $post->tags)), 0, 3) as $tag)
                                        <span class="px-2 py-1 bg-brown-100 text-brown-800 rounded text-xs">
                                            {{ $tag }}
                                        </span>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>
                </article>
                @endforeach
            @else
                <p class="text-brown-600">No posts found. Make sure to run <code>./build.sh</code> to copy content.</p>
            @endif
        </div>
    </section>

    {{-- About Section --}}
    <section class="mb-16 bg-brown-50 rounded-lg p-8">
        <h2 class="text-3xl font-bold text-brown-900 mb-6">Who are we?</h2>

        <div class="prose prose-lg prose-brown max-w-none">
            <p>Queen Raae is a seasoned web developer who loves duct-taping together side projects in addition to making apps trusted by the Swedish Armed Forces, The Norwegian Water Resources and Energy Directorate, and others.</p>

            <p>Cap'n Ola is the junior developer with a business background who asks all the right questions!</p>

            <p>Together with Pirate Princess Lillian, we spend our days sailing the sharky waters around the Gatsby islands.</p>

            <p>Join us for our <a href="{{ $page->socialMedia['youtube'] }}">weekly treasure hunts</a> over on YouTube to get to know us better 🏴‍☠️</p>
        </div>
    </section>
</div>
@endsection
