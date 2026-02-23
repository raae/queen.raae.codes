import type { APIRoute, GetStaticPaths } from "astro";
import { getAllPosts } from "../../lib/posts";
import { generateOgImage } from "../../lib/og-image";
import { getAuthorInfo } from "../../lib/posts";

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();

  return allPosts.map((post) => {
    const slugParam = post.slug.replace(/^\/|\/$/g, "");
    const authorInfo = getAuthorInfo(post.author);
    return {
      params: { slug: slugParam },
      props: {
        title: post.title,
        description: post.description,
        author: post.author,
        authorEmoji: authorInfo.emoji || "",
        authorName: authorInfo.name,
      },
    };
  });
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, author, authorEmoji, authorName } = props as any;

  const png = await generateOgImage({ title, description, author, authorEmoji, authorName });

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
