import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostNav({ prev, next }: { prev: Post | null; next: Post | null }) {
  return (
    <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      <PostNavCard label="Previous Post" post={prev} emptyText="You're at the oldest post!" />
      <PostNavCard
        label="Next Post"
        post={next}
        align="right"
        emptyText="You're at the newest post!"
      />
    </nav>
  );
}

function PostNavCard({
  label,
  post,
  align = "left",
  emptyText,
}: {
  label: string;
  post: Post | null;
  align?: "left" | "right";
  emptyText: string;
}) {
  const alignClasses = align === "right" ? "sm:col-start-2 text-right" : "text-left";

  if (!post) {
    return (
      <div className={`rounded-lg border border-border bg-surface px-5 py-4 ${alignClasses}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {align === "right" ? `${label} →` : `← ${label}`}
        </p>
        <p className="mt-1 font-serif text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group rounded-lg border border-border bg-surface px-5 py-4 transition-colors hover:border-accent ${alignClasses}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {align === "right" ? `${label} →` : `← ${label}`}
      </p>
      <p className="mt-1 font-display text-lg text-foreground transition-colors group-hover:text-accent">
        {post.title}
      </p>
    </Link>
  );
}
