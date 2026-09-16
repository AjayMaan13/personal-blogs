"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { PostSummary } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";

const PAGE_SIZE = 6;

export function PostSearch({
  posts,
  page,
  basePath,
}: {
  posts: PostSummary[];
  page: number;
  basePath: string;
}) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.35,
      }),
    [posts],
  );

  const isSearching = query.trim().length > 0;
  const results = isSearching ? fuse.search(query).map((result) => result.item) : posts;

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const visiblePosts = isSearching
    ? results
    : results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const groupedByYear = groupByYear(visiblePosts);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search posts..."
        aria-label="Search posts"
        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      />

      {isSearching && (
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {results.length} post{results.length === 1 ? "" : "s"} found
        </p>
      )}

      {visiblePosts.length === 0 ? (
        <p className="mt-10 font-serif text-muted-foreground">
          {isSearching ? "No posts match your search." : "No posts here yet."}
        </p>
      ) : (
        <div className="mt-6 space-y-10">
          {groupedByYear.map(([year, yearPosts]) => (
            <section key={year}>
              <h2 className="mb-4 font-mono text-sm text-muted-foreground">{year}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {yearPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {!isSearching && (
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
      )}
    </div>
  );
}

function groupByYear(posts: PostSummary[]): [string, PostSummary[]][] {
  const groups = new Map<string, PostSummary[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const group = groups.get(year) ?? [];
    group.push(post);
    groups.set(year, group);
  }
  // `posts` is already sorted newest-first, so insertion order keeps years descending too.
  return Array.from(groups.entries());
}
