import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSeries, getSeriesBySlug, toPostSummary } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export function generateStaticParams() {
  return getAllSeries().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};
  return {
    title: `${series.title} | Ajay Maan`,
    description: series.description ?? `Posts in the "${series.title}" series.`,
  };
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Series</p>
      <h1 className="mt-2 font-display text-3xl text-foreground">{series.title}</h1>
      {series.description && (
        <p className="mt-4 max-w-2xl font-serif text-muted-foreground">{series.description}</p>
      )}

      {/* series.posts is already ordered by seriesOrder (see getAllSeries in
          lib/posts.ts) — rendered here in that order, not re-sorted by date. */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {series.posts.map((post) => (
          <PostCard key={post.slug} post={toPostSummary(post)} />
        ))}
      </div>
    </main>
  );
}
