import type { ProcessedPost } from './posts';

export function makeAbsolute(markdown: string, siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return markdown
    .replace(/(?<=["|\s])\/static\//g, `${base}/static/`)
    .replace(/(?<=["|\s])\/emails\//g, `${base}/emails/`)
    .replace(/(?<=["|\s])\/posts\//g, `${base}/posts/`);
}

export function getPostDisclaimers(
  post: { tags: { label: string }[] },
  disclaimers: Map<string, string>
): string[] {
  return post.tags
    .map((tag) => disclaimers.get(tag.label))
    .filter((d): d is string => !!d);
}

export function postToFeedItem(
  post: ProcessedPost,
  disclaimers: Map<string, string>,
  siteUrl: string
) {
  const postDisclaimers = getPostDisclaimers(post, disclaimers);
  let content = makeAbsolute(post.content, siteUrl);
  if (postDisclaimers.length > 0) {
    content += `<br/><ul>${postDisclaimers.map((d) => `<li>${d}</li>`).join('')}</ul>`;
  }

  return {
    title: post.emojii ? `${post.emojii} ~ ${post.title}` : post.title,
    description: post.description,
    pubDate: new Date(post.date),
    link: post.slug,
    content,
  };
}
