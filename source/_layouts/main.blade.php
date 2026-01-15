<!DOCTYPE html>
<html lang="{{ $page->language ?? 'en' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="canonical" href="{{ $page->getUrl() }}">
        <meta name="description" content="{{ $page->description }}">
        <title>{{ $page->title }}</title>
        @viteRefresh()
        <link rel="stylesheet" href="{{ vite('source/_assets/css/main.css') }}">
        <script defer type="module" src="{{ vite('source/_assets/js/main.js') }}"></script>
    </head>
    <body class="font-sans antialiased">
        <div id="app">
            {{-- Sticky header matching original Gatsby design --}}
            <header class="sticky top-0 backdrop-blur-lg z-50 bg-[#fffaf0b3] border-solid border-0 border-t-4 border-[#ff5722]">
                <div class="mx-auto max-w-4xl">
                    <nav class="py-3 px-4 flex items-center gap-3">
                        <a href="/" class="text-xl mr-auto hover:scale-110 transition-transform no-underline">
                            👑
                            <span class="sr-only">{{ $page->siteName }}</span>
                        </a>

                        <a href="{{ $page->socialMedia['twitter'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="hover:scale-110 transition-transform text-brown-700 text-sm">
                            Twitter
                        </a>
                        <a href="{{ $page->socialMedia['youtube'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="hover:scale-110 transition-transform text-brown-700 text-sm">
                            YouTube
                        </a>
                        <a href="{{ $page->socialMedia['github'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="hover:scale-110 transition-transform text-brown-700 text-sm">
                            GitHub
                        </a>
                    </nav>
                </div>
            </header>

            @yield('body')

            {{-- Footer --}}
            <footer class="border-t border-brown-200 mt-16 py-8 px-4">
                <div class="max-w-4xl mx-auto text-center text-brown-700 text-sm">
                    &copy; {{ date('Y') }} {{ $page->siteName }}. All rights reserved.
                </div>
            </footer>
        </div>
    </body>
</html>
