@extends('_layouts.main')

@section('body')
<div class="max-w-5xl mx-auto px-4 py-8">
    <header class="mb-12">
        <h1 class="text-4xl font-bold text-brown-900 mb-4">All Posts</h1>
        <p class="text-lg text-brown-700">
            Browse all {{ $allPostsCount ?? 0 }} articles from Queen Raae and Cap'n Ola
        </p>
    </header>

    @php
        // Combine both collections
        $postsQueen = isset($posts_queen) ? $posts_queen : collect([]);
        $postsOlavea = isset($posts_olavea) ? $posts_olavea : collect([]);

        $allPosts = collect([...$postsQueen, ...$postsOlavea])
            ->sortByDesc('date');

        // Get unique tags for filtering
        $allTags = $allPosts
            ->pluck('tags')
            ->filter()
            ->flatMap(function($tags) {
                return array_map('trim', explode(',', $tags));
            })
            ->unique()
            ->sort()
            ->values();
    @endphp

    {{-- Filter by Tags --}}
    @if($allTags->count() > 0)
        <div class="mb-8 p-6 bg-brown-50 rounded-lg">
            <h2 class="text-lg font-semibold text-brown-900 mb-3">Filter by Tag</h2>
            <div class="flex flex-wrap gap-2">
                @foreach($allTags as $tag)
                    <a href="/posts/tag/{{ $tag }}"
                       class="px-3 py-1 bg-white border border-brown-200 text-brown-800 rounded hover:bg-brown-100 hover:border-brown-300 transition-colors text-sm">
                        {{ $tag }}
                    </a>
                @endforeach
            </div>
        </div>
    @endif

    {{-- Posts List --}}
    <div class="space-y-6">
        @foreach($allPosts as $post)
        <article class="border-b border-brown-200 pb-6 hover:border-brown-400 transition-colors">
            <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                    <a href="/{{ $post->getPath() }}" class="group">
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
                            @foreach(array_map('trim', explode(',', $post->tags)) as $tag)
                                <a href="/posts/tag/{{ $tag }}"
                                   class="px-2 py-1 bg-brown-100 text-brown-800 rounded text-xs hover:bg-brown-200 transition-colors">
                                    {{ $tag }}
                                </a>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </article>
        @endforeach
    </div>

    @if($allPosts->count() === 0)
        <p class="text-brown-600 text-center py-12">
            No posts found. Make sure to run <code class="px-2 py-1 bg-brown-100 rounded">./build.sh</code> to copy content.
        </p>
    @endif
</div>
@endsection
