---
url: https://discord.com/channels/484383807575687178/484383808007962640/935868469231124570
---

raae (queen.raae.codes) — Today at 1:25 PM
Does it work with a hard coded url? A test to see if its a data layer problem, or a react-stl-viewer problem.
Tobias Kietzmann — Today at 1:26 PM
no, same issue
tried it already
in debug both are working
\*develop
raae (queen.raae.codes) — Today at 1:26 PM
Then its the react-stl-viewer i guess.
Try to do
window ? <StlViewer
            style={style}
            orbitControls
            shadows
            url={url}
        /> : null

Tobias Kietzmann — Today at 1:30 PM
just a second
"window" is not available during server side rendering.

See our docs page for more info on this error: https://gatsby.dev/debug-html

10 |
11 | const StlView = () => {
12 | return window ? (
| ^
13 | <StlViewer
14 | style={style}
15 | orbitControls
Gatsby
Debugging Incremental Builds
With the release of Gatsby v3 Incremental Builds is available to everyone. This improvement is (re)generating only subset of HTML files…

raae (queen.raae.codes) — Today at 1:33 PM
Sorry
typeof window !== "undefined" ? <StlViewer
            style={style}
            orbitControls
            shadows
            url={url}
        /> : null
Tobias Kietzmann — Today at 1:41 PM
this works! fantastic, thanks!
now i have to read whats happening there 😄 im coming from app development and i'm not very familar with web dev righti now
raae (queen.raae.codes) — Today at 1:56 PM
This is a little bit "hacky", but the easy way to solve it that is very common.
StlViewer is trying to access window, or document, or something that is not available when the page is rendered on the server.
Tobias Kietzmann — Today at 2:05 PM
Thanks alot!
raae (queen.raae.codes) — Today at 2:06 PM
I write and stream about this stuff, check out https://queen.raae.codes/ 😉
Queen Raae — Gatsby Bootcamps, Plugins, Streams and Webinars
Queen Raae — Gatsby Bootcamps, Plugins, Streams and Webinars
I teach web devs how to get the most out of Gatsby through workshops, rum-fueled treasure hunts in the sharky waters around the Gatsby islands and more!
