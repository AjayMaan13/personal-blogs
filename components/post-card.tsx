import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import { slugifyTag } from "@/lib/tags";
import { formatDate } from "@/lib/format-date";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent">
      <p className="font-mono text-xs text-muted-foreground">
        {formatDate(post.date)} &middot; {post.readingTime}
      </p>
      <h3 className="font-display text-xl text-foreground">
        <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">
          {post.title}
        </Link>
      </h3>
      <p className="line-clamp-3 font-serif text-sm text-muted-foreground">
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slugifyTag(tag)}`}
              className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
