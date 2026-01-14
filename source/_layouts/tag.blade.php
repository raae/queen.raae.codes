@extends('_layouts.main')

@section('body')
<div class="max-w-5xl mx-auto px-4 py-8">
    <header class="mb-12">
        <div class="mb-4">
            <a href="/posts" class="text-brown-700 hover:text-brown-900 font-medium">
                ← Back to all posts
            </a>
        </div>
        <h1 class="text-4xl font-bold text-brown-900 mb-4">
            Posts tagged: <span class="text-brown-700">{{ $page->tag }}</span>
        </h1>
        <p class="text-lg text-brown-700">
            {{ $page->posts->count() }} {{ $page->posts->count() === 1 ? 'post' : 'posts' }} found
        </p>
    </header>

    {{-- Posts List --}}
    <div class="space-y-6">
        @foreach($page->posts as $post)
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
                            @foreach(array_map('trim', explode(',', $post->tags)) as $tag)
                                <a href="/posts/tag/{{ $tag }}"
                                   class="px-2 py-1 bg-brown-100 text-brown-800 rounded text-xs hover:bg-brown-200 transition-colors {{ $tag === $page->tag ? 'ring-2 ring-brown-500' : '' }}">
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

    @if($page->posts->count() === 0)
        <p class="text-brown-600 text-center py-12">
            No posts found with this tag.
        </p>
    @endif
</div>
@endsection
