---
title: "Build the insight layer — not just for agents"
tags: AI, SaaS, MCP, AX, agent-operations
brands: Outseta, Userlist
peeps: benediktdeicke
---

Every SaaS is racing to expose their data to AI. MCP servers, CLIs, better API docs. Good. But raw access isn't the only value.

Think about what happens when an agent wants to answer "what should I write about next?" based on your email history. Right now it has to download everything, read through it all, figure out the patterns. Every time. That's expensive, slow, and wasteful. The same processing, repeated for every user, every session.

What if the SaaS provider did that work once?

> "If we as service providers can provide a layer on top of our content with some vector search and some thematic extraction — we run a little AI on our side that could pull out themes."
> <cite>Me on [Slow & Steady ep. 236 (February 2026)](https://slowandsteadypodcast.com/236?#t=36:16) ↓</cite>

<iframe width="100%" height="180" frameborder="no" scrolling="no" seamless="" src="https://share.transistor.fm/e/0ec939c2?#t=36:16"></iframe>

Pre-process the data. Extract themes, compute scores, build embeddings. The agent asks for themes first, then drills into the specific content it needs. Two steps instead of downloading the whole archive every time.

And embeddings are cheap. The heavy processing is not.

## I did this with podcast transcripts

I've built exactly this for the Slow & Steady podcast. Raw transcripts go in, and out comes a structured knowledge base: ideas extracted, stories tagged, quotable moments indexed by theme. When I ask Jean-Claude "what should I blog about?", it doesn't read through 236 episodes of raw audio transcripts. It searches the processed knowledge base, finds the themes, then pulls the specific quotes it needs to give me ideas.

(Sidenote: if you want this for your podcast, let me know.)

## Now imagine this for your SaaS

In that same episode I pitched Benedikt on doing something similar for the emails in [Userlist](https://userlist.com/?via=queen). Their MCP server can do CRUD: list users, get a broadcast, create a campaign. But what if it could also answer "which onboarding emails aren't landing?" without the agent doing all the analysis itself? Pre-process the engagement data, and the agent gets the answer in one call.

At Outseta we're in the same spot. Our MCP MVP mirrors the API. Fine for basic operations. But the questions we actually want agents to answer aren't CRUD:

"Which customers are at risk?" — that needs a computed score, not a list endpoint.
"What topics drive conversions?" — that needs pattern analysis across email and billing data.
"Where are users getting stuck?" — that needs theme extraction from support tickets.

If we pre-process this, build the intelligence on our side so the agent gets patterns instead of spending tokens discovering them every time, I think we'll be even more valuable to our customers. And their agents.

## Agents and humans, same insights

But why stop at the API? If the intelligence is good enough for an agent, it's good enough for your users. Put it in the dashboard. Surface the patterns where people already work.

Userlist and Outseta could both pitch ideas for the next broadcast based on what the data already knows. That's not an API feature. That's a product feature.

Build the smart layer into your product first. Then expose it through the UI, API, MCP, CLI, whatever comes next. The interface changes. The intelligence stays.

At Outseta we have billing, email, support, CRM all in one place. The [system of record](/2026/03/07-outseta-a-system-of-record/). Now the question is: what intelligence do we build on top of it?
