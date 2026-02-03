import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllPosts } from '../../lib/posts';
import { generateOgImage } from '../../lib/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();

  return allPosts.map((post) => {
    const slugParam = post.slug.replace(/^\/|\/$/g, '');
    return {
      params: { slug: slugParam },
      props: { post },
    };
  });
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as any;

  const png = await generateOgImage({
    title: post.title,
    description: post.description,
    author: post.author,
  });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
