import { getCollection } from "astro:content";
import { format } from "date-fns";

// Parse date and slug from post path
// Pattern: /2022/03/17-demo/index.md -> date: 2022-03-17, slug: /2022-03-17-demo/
function parsePostPath(id: string): { date: string; slug: string } {
  const pattern = /(\d{4})\/(\d{2})\/(\d{2})-(.+)\/index/;
  const match = pattern.exec(id);

  if (match) {
    const [, year, month, day, name] = match;
    const date = `${year}-${month}-${day}`;
    const slug = `/${date}-${name}/`;
    return { date, slug };
  }

  return { date: "", slug: "" };
}

export interface ProcessedPost {
  id: string;
  slug: string;
  title: string;
  emojii: string;
  description: string;
  date: string;
  dateFormatted: string;
  dateISO: string;
  author: string;
  tags: { label: string; slug: string }[];
  isRelatable: boolean;
  content: string;
  render: () => Promise<{ Content: any }>;
}

// Process a single collection entry into a ProcessedPost.
// Tags and isRelatable are pre-computed by the schema transform in config.ts.
function processPost(entry: any, author: string): ProcessedPost {
  const { date, slug } = parsePostPath(entry.id);

  const title = entry.data.title || "";

  // Generate description from body content (excerpt), matching Gatsby's behavior
  const body = entry.body || "";
  const plainText = body
    .replace(/^---[\s\S]*?---\s*/m, "") // Remove frontmatter if present
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Replace links with text
    .replace(/#{1,6}\s+/g, "") // Remove headings
    .replace(/[*_~`>]/g, "") // Remove emphasis markers
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
  // Gatsby's pruneLength is 160 and truncates at word boundary
  let description = plainText;
  if (plainText.length > 160) {
    const truncated = plainText.substring(0, 160);
    const lastSpace = truncated.lastIndexOf(" ");
    description = (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "\u2026";
  }

  let dateFormatted = "";
  let dateISO = date;

  if (date) {
    try {
      const dateObj = new Date(date);
      dateFormatted = format(dateObj, "MMMM do, yyyy");
      dateISO = dateObj.toISOString();
    } catch (e) {
      dateFormatted = date;
    }
  }

  return {
    id: entry.id,
    slug,
    title,
    emojii: entry.data.emojii || "",
    description,
    date,
    dateFormatted,
    dateISO,
    author,
    tags: entry.data.tags || [],
    isRelatable: entry.data.isRelatable ?? true,
    content: entry.body || "",
    render: entry.render.bind(entry),
  };
}

// Module-level cache: getAllPosts() is called from many pages during a build.
// The content layer caches the raw collection data and schema transforms;
// this cache prevents re-running processPost() (excerpt generation, date
// formatting) on every call within a single build.
let _cachedPosts: ProcessedPost[] | null = null;

// Get all posts from both queen and olavea collections
export async function getAllPosts(): Promise<ProcessedPost[]> {
  if (_cachedPosts) return _cachedPosts;

  const queenPosts = await getCollection("posts-queen");
  const olaveaPosts = await getCollection("posts-olavea");

  const allPosts = [
    ...queenPosts.map((p) => processPost(p, "Queen")),
    ...olaveaPosts.map((p) => processPost(p, "OlaVea")),
  ];

  // Sort by slug descending (which is date-based)
  _cachedPosts = allPosts.sort((a, b) => b.slug.localeCompare(a.slug));
  return _cachedPosts;
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<ProcessedPost | undefined> {
  const allPosts = await getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

// Get related posts for a given post
export function getRelatedPosts(
  currentPost: ProcessedPost,
  allPosts: ProcessedPost[],
  limit: number = 3,
  titleThreshold: number = 0.7
): ProcessedPost[] {
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug && post.isRelatable)
    .map((post) => {
      // Count intersecting tags
      const intersectingTags = currentPost.tags.filter((t1) => post.tags.some((t2) => t2.slug === t1.slug));

      // Simple title similarity (word overlap)
      const currentWords = currentPost.title.toLowerCase().replace("gatsby", "").split(/\s+/);
      const postWords = post.title.toLowerCase().split(/\s+/);
      const commonWords = currentWords.filter((w) => postWords.includes(w) && w.length > 3);
      const titleScore = commonWords.length / Math.max(currentWords.length, postWords.length);

      const titleSimilarity = titleScore > titleThreshold ? titleScore : 0;
      const similarity = intersectingTags.length + 3.0 * titleSimilarity;

      return { ...post, similarity };
    })
    .filter((post) => post.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return relatedPosts;
}

// Get all unique tags with their posts
export async function getAllTags(): Promise<Map<string, { label: string; slug: string; posts: ProcessedPost[] }>> {
  const allPosts = await getAllPosts();
  const tagsMap = new Map<string, { label: string; slug: string; posts: ProcessedPost[] }>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tagsMap.has(tag.slug)) {
        tagsMap.set(tag.slug, { ...tag, posts: [] });
      }
      tagsMap.get(tag.slug)!.posts.push(post);
    });
  });

  return tagsMap;
}
