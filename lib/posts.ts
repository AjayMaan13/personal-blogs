import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getReadingTime, type ReadingTime } from "./reading-time";
import { slugifyTag } from "./tags";
import seriesMetaJson from "@/content/series.json";

// content/series.json can be `[]` (no series yet), which TypeScript infers
// as `never[]` from the literal — cast to the real shape so getAllSeries()
// below still type-checks once entries exist again.
interface SeriesMeta {
  slug: string;
  title: string;
  description?: string;
}
const seriesMeta = seriesMetaJson as SeriesMeta[];

export { slugifyTag } from "./tags";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  series?: string;
  seriesOrder?: number;
  coverImage?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  tags: string[];
  content: string;
  readingTime: ReadingTime;
}

export interface TagSummary {
  tag: string;
  slug: string;
  count: number;
}

// Lean, serializable shape for list/search/card rendering — used by the /blog
// list, tag pages, the homepage grid, and the generated search index, so
// there's one place that decides what a "post preview" looks like.
export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  series: string | null;
  coverImage: string | null;
  readingTime: string;
}

export interface SeriesSummary {
  slug: string;
  title: string;
  description?: string;
  posts: Post[];
}

function assertFrontmatter(
  slug: string,
  // gray-matter's parsed frontmatter is untyped; this function's job is to narrow it.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): asserts data is PostFrontmatter {
  if (typeof data.title !== "string" || !data.title) {
    throw new Error(`Post "${slug}" is missing a "title" in its frontmatter.`);
  }
  if (typeof data.description !== "string" || !data.description) {
    throw new Error(`Post "${slug}" is missing a "description" in its frontmatter.`);
  }
  if (typeof data.date !== "string" || !data.date) {
    throw new Error(`Post "${slug}" is missing a "date" in its frontmatter.`);
  }
  if (data.tags !== undefined && !Array.isArray(data.tags)) {
    throw new Error(`Post "${slug}" has a "tags" field that isn't an array.`);
  }
  if (data.series !== undefined && typeof data.series !== "string") {
    throw new Error(`Post "${slug}" has a "series" field that isn't a string.`);
  }
  if (data.series && data.seriesOrder === undefined) {
    throw new Error(`Post "${slug}" sets "series" but is missing "seriesOrder".`);
  }
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  assertFrontmatter(slug, data);

  return {
    ...data,
    slug,
    tags: data.tags ?? [],
    content,
    readingTime: getReadingTime(content),
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function toPostSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    series: post.series ?? null,
    coverImage: post.coverImage ?? null,
    readingTime: post.readingTime.text,
  };
}

export function getAllPostSummaries(): PostSummary[] {
  return getAllPosts().map(toPostSummary);
}

export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: posts[index + 1] ?? null, // older post (list is sorted newest-first)
    next: posts[index - 1] ?? null, // newer post
  };
}

export function getAllTags(): TagSummary[] {
  const bySlug = new Map<string, { tag: string; count: number }>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      const existing = bySlug.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        bySlug.set(slug, { tag, count: 1 });
      }
    }
  }

  return Array.from(bySlug.entries())
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tagSlug: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => slugifyTag(tag) === tagSlug),
  );
}

export function getAllSeries(): SeriesSummary[] {
  const grouped = new Map<string, Post[]>();

  for (const post of getAllPosts()) {
    if (!post.series) continue;
    const posts = grouped.get(post.series) ?? [];
    posts.push(post);
    grouped.set(post.series, posts);
  }

  return Array.from(grouped.entries()).map(([slug, posts]) => {
    const meta = seriesMeta.find((series) => series.slug === slug);
    return {
      slug,
      title: meta?.title ?? slug,
      description: meta?.description,
      posts: posts.sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)),
    };
  });
}

export function getSeriesBySlug(slug: string): SeriesSummary | null {
  return getAllSeries().find((series) => series.slug === slug) ?? null;
}
