import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getAllPosts } from "../../../lib/posts";
import { getDisclaimers } from "../../../lib/disclaimers";
import { postToFeedItem } from "../../../lib/feed";

export async function GET(context: APIContext) {
  const allPosts = await getAllPosts();
  const disclaimers = await getDisclaimers();
  const siteUrl = context.site!.toString();
  const posts = allPosts.filter((p) => p.author === "Queen");

  return rss({
    title: "Posts by Queen Raae 👑",
    description:
      "Ahoy! JavaScript treasures, indie business adventures, and developer wisdom from Queen Raae — pirate queen of the web.",
    site: siteUrl.replace(/\/$/, "") + "/author/queen",
    items: posts.map((post) => postToFeedItem(post, disclaimers, siteUrl)),
  });
}
