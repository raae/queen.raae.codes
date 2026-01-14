@extends('_layouts.main')

@section('body')
<article class="max-w-3xl mx-auto px-4 py-8">
    <header class="mb-8">
        <h1 class="text-4xl font-bold text-brown-900 mb-4">{{ $page->title }}</h1>

        @if($page->date)
            <time datetime="{{ $page->date }}" class="text-brown-700">
                {{ date('F j, Y', strtotime($page->date)) }}
            </time>
        @endif

        @if($page->tags)
            <div class="mt-4 flex flex-wrap gap-2">
                @foreach(explode(',', $page->tags) as $tag)
                    <span class="px-3 py-1 bg-brown-100 text-brown-800 rounded-full text-sm">
                        {{ trim($tag) }}
                    </span>
                @endforeach
            </div>
        @endif
    </header>

    <div class="prose prose-lg prose-brown max-w-none">
        @yield('content')
    </div>
</article>
@endsection
