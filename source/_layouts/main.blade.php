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
    <body class="text-gray-900 font-sans antialiased">
        {{-- Navigation Header --}}
        <nav class="bg-brown-50 border-b border-brown-200">
            <div class="max-w-5xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="text-2xl font-bold text-brown-900 hover:text-brown-700 transition-colors">
                        {{ $page->siteName }}
                    </a>
                    <div class="flex items-center gap-6">
                        <a href="/posts" class="text-brown-700 hover:text-brown-900 font-medium transition-colors">
                            All Posts
                        </a>
                        <a href="{{ $page->socialMedia['youtube'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="text-brown-700 hover:text-brown-900 font-medium transition-colors">
                            YouTube
                        </a>
                        <a href="{{ $page->socialMedia['github'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="text-brown-700 hover:text-brown-900 font-medium transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        @yield('body')

        {{-- Footer --}}
        <footer class="bg-brown-50 border-t border-brown-200 mt-16">
            <div class="max-w-5xl mx-auto px-4 py-8">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-brown-700 text-sm">
                        &copy; {{ date('Y') }} {{ $page->siteName }}. All rights reserved.
                    </div>
                    <div class="flex items-center gap-6">
                        <a href="{{ $page->socialMedia['twitter'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="text-brown-700 hover:text-brown-900 text-sm transition-colors">
                            Twitter
                        </a>
                        <a href="{{ $page->socialMedia['youtube'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="text-brown-700 hover:text-brown-900 text-sm transition-colors">
                            YouTube
                        </a>
                        <a href="{{ $page->socialMedia['github'] }}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="text-brown-700 hover:text-brown-900 text-sm transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </body>
</html>
