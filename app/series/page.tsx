import type { Metadata } from "next";
import { getAllSeries } from "@/lib/posts";
import { SeriesCard } from "@/components/series-card";

export const metadata: Metadata = {
  title: "Series",
  description: "Multi-part posts, grouped together.",
  openGraph: { title: "Series", description: "Multi-part posts, grouped together." },
};

export default function SeriesIndexPage() {
  const series = getAllSeries();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl text-foreground">Series</h1>

      {series.length === 0 ? (
        <p className="mt-10 font-serif text-muted-foreground">
          No series yet — check back once a multi-part series is underway.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((item) => (
            <SeriesCard key={item.slug} series={item} />
          ))}
        </div>
      )}
    </main>
  );
}
