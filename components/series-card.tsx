import Link from "next/link";
import type { SeriesSummary } from "@/lib/posts";

export function SeriesCard({ series }: { series: SeriesSummary }) {
  return (
    <Link
      href={`/series/${series.slug}`}
      className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="flex size-10 items-center justify-center rounded-full border border-border font-display text-lg text-accent">
        {series.title.charAt(0).toUpperCase()}
      </div>
      <h3 className="font-display text-xl text-foreground transition-colors group-hover:text-accent">
        {series.title}
      </h3>
      {series.description && (
        <p className="line-clamp-2 font-serif text-sm text-muted-foreground">
          {series.description}
        </p>
      )}
      <p className="mt-auto font-mono text-xs text-muted-foreground">
        {series.posts.length} post{series.posts.length === 1 ? "" : "s"}
      </p>
    </Link>
  );
}
