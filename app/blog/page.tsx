import type { Metadata } from "next";
import { getAllPostSummaries } from "@/lib/posts";
import { PostSearch } from "@/components/post-search";

export const metadata: Metadata = {
  title: "Blog | Ajay Maan",
  description: "Every post — search or browse by tag.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const posts = getAllPostSummaries();
  const page = Math.max(1, Number(pageParam) || 1);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl text-foreground">Blog</h1>
      <div className="mt-8">
        <PostSearch posts={posts} page={page} basePath="/blog" />
      </div>
    </main>
  );
}
