import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format-date";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent"
    >
      <p className="font-mono text-xs text-muted-foreground">
        {formatDate(post.date)} &middot; {post.readingTime.text}
      </p>
      <h3 className="font-display text-xl text-foreground transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="line-clamp-3 font-serif text-sm text-muted-foreground">
        {post.description}
      </p>
    </Link>
  );
}
