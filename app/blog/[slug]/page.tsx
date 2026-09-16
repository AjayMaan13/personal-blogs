import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostSlugs, getPostBySlug, getAdjacentPosts, type Post } from "@/lib/posts";
import { slugifyTag } from "@/lib/tags";
import { formatDate } from "@/lib/format-date";
import { mdxComponents } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { PostNav } from "@/components/post-nav";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

function readPost(slug: string): Post {
  try {
    return getPostBySlug(slug);
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = readPost(slug);
  return {
    title: `${post.title} | Ajay Maan`,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = readPost(slug);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Posts</p>
      <h1 className="mt-2 font-display text-4xl text-foreground">{post.title}</h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        {formatDate(post.date)} &middot; {post.readingTime.text} &middot; {post.readingTime.words}{" "}
        words
      </p>

      {/* TableOfContents and the article body share this wrapper on purpose:
          position: sticky needs its containing block to be taller than the
          sticky element itself, or there's no scroll distance for it to stay
          pinned across — it has to span the whole article, not just the ToC. */}
      <div className="mt-8">
        <TableOfContents containerId="post-content" />

        <div id="post-content" className="mt-8">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    { behavior: "append", properties: { className: ["heading-anchor"] } },
                  ],
                  [
                    rehypePrettyCode,
                    { theme: "github-dark-dimmed", keepBackground: false, bypassInlineCode: true },
                  ],
                ],
              },
            }}
          />
        </div>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
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

      <PostNav prev={prev} next={next} />
    </main>
  );
}
