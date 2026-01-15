@extends('_layouts.main')

@section('body')
<main class="pb-12">
    {{-- Header Section --}}
    <header class="py-12 px-6 bg-[#fffaf0]">
        <div class="container mx-auto max-w-2xl [&>*]:max-w-xl">
            <p class="text-xs uppercase leading-none text-teal-900 my-7">
                {{ $page->siteName }}
            </p>
            <h1 class="text-[2.75rem] font-black leading-none my-9 text-brown-900">
                Sailing the high seas of the World Wide Web
            </h1>
            <p class="text-xl leading-relaxed my-4 text-brown-900">
                Ahoy, seasoned JavaScript developers and daring dev pirates! Join our swashbuckling crew as we embark on thrilling treasure hunts unraveling the secrets of HTML, CSS, and JavaScript, all while having a blast!
            </p>
        </div>
    </header>

    {{-- Latest Posts Section --}}
    <section class="py-12 px-6 bg-[#fcedd8]">
        <div class="container mx-auto max-w-2xl [&>*]:max-w-xl">
            <h2 class="text-3xl font-black leading-none my-8 text-brown-900">
                <a href="/posts" class="text-inherit underline decoration-transparent transition hover:decoration-amber-600">
                    Latest Posts
                </a>
            </h2>

            @php
                $postsQueen = isset($posts_queen) ? $posts_queen : collect([]);
                $postsOlavea = isset($posts_olavea) ? $posts_olavea : collect([]);
                $allPosts = collect([...$postsQueen, ...$postsOlavea])
                    ->sortByDesc('date')
                    ->take(7);
            @endphp

            @if($allPosts->count() > 0)
                <ul class="list-none px-0 my-0 -ml-1 space-y-4 mt-12">
                    @foreach($allPosts as $post)
                    <li class="mx-2 px-5 py-3 pb-4 relative border-0 border-l-4 border-solid border-amber-500 flex flex-col transition hover:bg-amber-400/30 focus-within:border-l-transparent focus-within:ring-4 focus-within:ring-offset-4 focus-within:ring-amber-500">
                        <p class="text-xs my-0 order-first leading-8 font-medium text-teal-800 uppercase tracking-tight">
                            @if($post->date)
                                {{ date('F jS, Y', strtotime($post->date)) }}
                            @endif
                        </p>
                        <h3 class="text-lg my-0 font-bold text-brown-900">
                            <a href="{{ $post->getPath() }}" class="text-inherit no-underline focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                {{ $post->title }}
                            </a>
                        </h3>
                    </li>
                    @endforeach
                </ul>

                <ul class="list-none px-0 my-0 -ml-1 space-y-4">
                    <li class="mx-2 pt-4">
                        <a href="/posts" class="w-full no-underline inline-flex items-center justify-between border-2 border-solid border-teal-800 px-4 py-2 text-sm text-teal-900 font-bold shadow-sm hover:bg-amber-400/40 focus:outline-none focus:ring-4 focus:ring-teal-500">
                            More...
                            <svg class="ml-2 -mr-1 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </li>
                </ul>
            @endif
        </div>
    </section>

    {{-- Who are we Section --}}
    <section class="py-12 px-6 bg-[#fffaf0]">
        <div class="container mx-auto max-w-2xl [&>*]:max-w-xl">
            <h2 class="text-3xl font-black leading-none my-8 text-brown-900">
                Who are we?
            </h2>

            <div class="prose prose-lg max-w-none">
                <p>Queen Raae is a seasoned web developer who loves duct-taping together side projects in addition to making apps trusted by the Swedish Armed Forces, The Norwegian Water Resources and Energy Directorate, and others.</p>

                <p>Cap'n Ola is the junior developer with a business background who asks all the right questions!</p>

                <p>Together with Pirate Princess Lillian, we spend our days sailing the sharky waters around the Gatsby islands.</p>

                <p>Join us for our <a href="{{ $page->socialMedia['youtube'] }}">weekly treasure hunts</a> over on YouTube to get to know us better 🏴‍☠️</p>
            </div>
        </div>
    </section>
</main>
@endsection
