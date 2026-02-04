import type { APIRoute } from "astro";
import { getAllPosts } from "../../lib/posts";

export const GET: APIRoute = async () => {
  const allPosts = await getAllPosts();

  const searchData = allPosts.map((post) => ({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.dateFormatted,
    tags: post.tags,
  }));

  return new Response(JSON.stringify(searchData), {
    headers: { "Content-Type": "application/json" },
  });
};
