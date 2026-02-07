---
title: No perfect MCP needed, Jean-Claude will figure it out
tags: AI, MCP, DX, AX
brands: Outseta, Userlist, Slow&Steady
peeps: benediktdeicke
---

In what became AI episode #2 I asked Benedikt if he had shipped the [Userlist](https://userlist.com/?via=queen) MCP server.

Kind of. OAuth flows are working. But the schemas are hard to automatically generate, so I've been looking into replacing the current serializer library.

And I was like hold up, hold up!

Does your API send back proper error messages? You know, if I send a too long title when scheduling a broadcast, does it tell me it's too long?

Yeah. It does.

Then ship it.

These models are genuinely good at figuring things out now. When our friend Jean-Claude hits an error, he will read the error message and try again. You might be on the hook for more tokens than necessary, but he will get it right eventually. And if you are lucky he remembers how to do it right the next time 🤯

Turns out it's not just me saying this. The [MCP spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling) itself says tool execution errors "contain actionable feedback that language models can use to self-correct and retry with adjusted parameters."

And the folks using MCP servers for marketing right now? They're not sitting there watching each API call:

> "They're just YOLOing things and sending them off into subagents. So if it takes four tries to get this broadcast up, they're not even gonna see that. They're just gonna see it when it's done."

Hear it on [Slow & Steady ep. 236 (at 33:07)](https://slowandsteadypodcast.com/236?#t=33:07) ↓

<iframe width="100%" height="180" frameborder="no" scrolling="no" seamless="" src="https://share.transistor.fm/e/0ec939c2?#t=33:07"></iframe>

I'm not saying schemas don't matter. They do! Rich descriptions, proper types, field constraints — all of that makes the experience smoother. But out the gate you're fine with "title is a string". Better done, than perfect as they say at Userlist.

On the topic of MCP Servers, my next step for the [Outseta](https://outseta.com/?via=queen) MCP is to publish it as a remote MCP server making it accessible for those not ready to npx @outseta/outseta-mcp. And yeah, I've been stuck picking the perfect hosting setup. Same trap, different serializer library.

What's the MCP you've been not-shipping? 😬
