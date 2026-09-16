import type { Metadata } from "next";
import { getAllTags, getPostsByTag, toPostSummary } from "@/lib/posts";
import { PostSearch } from "@/components/post-search";

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = getAllTags().find((t) => t.slug === tag)?.tag ?? tag;
  const description = `Posts tagged "${label}".`;
  return {
    title: `#${label}`,
    description,
    openGraph: { title: `#${label}`, description, type: "website" },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const { page: pageParam } = await searchParams;

  // Unknown tag slugs just resolve to zero posts — PostSearch already renders
  // a graceful empty state for that, so there's nothing to special-case here.
  const label = getAllTags().find((t) => t.slug === tag)?.tag ?? tag;
  const posts = getPostsByTag(tag).map(toPostSummary);
  const page = Math.max(1, Number(pageParam) || 1);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Tag</p>
      <h1 className="font-display text-3xl text-foreground">{label}</h1>
      <div className="mt-8">
        <PostSearch posts={posts} page={page} basePath={`/tags/${tag}`} />
      </div>
    </main>
  );
}
