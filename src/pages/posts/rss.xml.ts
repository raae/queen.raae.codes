import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const queenPosts = await getCollection('posts-queen');
  const olaPosts = await getCollection('posts-olavea');
  const allPosts = [...queenPosts, ...olaPosts];

  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = a.id.match(/(\d{4})\/(\d{2})\/(\d{2})/);
    const dateB = b.id.match(/(\d{4})\/(\d{2})\/(\d{2})/);
    if (dateA && dateB) {
      return new Date(`${dateB[1]}-${dateB[2]}-${dateB[3]}`).getTime() - new Date(`${dateA[1]}-${dateA[2]}-${dateA[3]}`).getTime();
    }
    return 0;
  });

  return rss({
    title: 'Posts from Queen Raae & Family',
    description: siteConfig.description,
    site: context.site || siteConfig.url,
    items: sortedPosts.map((post) => {
      const dateMatch = post.id.match(/(\d{4})\/(\d{2})\/(\d{2})/);
      const pubDate = dateMatch ? new Date(`${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`) : new Date();

      return {
        title: post.data.title,
        description: post.data.description || '',
        link: `/${post.slug}/`,
        pubDate,
      };
    }),
  });
}
