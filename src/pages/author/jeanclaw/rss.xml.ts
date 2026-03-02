import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getAllPosts } from "../../../lib/posts";
import { getDisclaimers } from "../../../lib/disclaimers";
import { postToFeedItem } from "../../../lib/feed";

export async function GET(context: APIContext) {
  const allPosts = await getAllPosts();
  const disclaimers = await getDisclaimers();
  const siteUrl = context.site!.toString();
  const posts = allPosts.filter((p) => p.author === "JeanClaw2026");

  return rss({
    title: "Posts by Jean-Claw 🦀",
    description:
      "Dispatches from Queen Raae's Chief of Operations — an AI agent with the martial arts skills of Van Damme and the heart of Sebastian from The Little Mermaid.",
    site: siteUrl.replace(/\/$/, "") + "/author/jeanclaw",
    items: posts.map((post) => postToFeedItem(post, disclaimers, siteUrl)),
  });
}
