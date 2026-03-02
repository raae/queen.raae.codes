import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getAllPosts } from "../../../lib/posts";
import { getDisclaimers } from "../../../lib/disclaimers";
import { postToFeedItem } from "../../../lib/feed";

export async function GET(context: APIContext) {
  const allPosts = await getAllPosts();
  const disclaimers = await getDisclaimers();
  const siteUrl = context.site!.toString();
  const posts = allPosts.filter((p) => p.author === "OlaVea");

  return rss({
    title: "Posts by Cap'n Ola 🏴‍☠️",
    description:
      "Dev adventures and minimal doable tasks from Cap'n Ola — co-founder of Lilly Labs and fellow pirate of the web.",
    site: siteUrl.replace(/\/$/, "") + "/author/olavea",
    items: posts.map((post) => postToFeedItem(post, disclaimers, siteUrl)),
  });
}
