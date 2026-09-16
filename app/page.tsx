import Link from "next/link";
import { getAllPostSummaries } from "@/lib/posts";
import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import { SocialLinks } from "@/components/social-links";

export default function Home() {
  const latestPosts = getAllPostSummaries().slice(0, 3);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface p-8 text-center sm:items-start sm:text-left">
          <h2 className="font-display text-xl text-foreground">About me</h2>
          <p className="font-serif text-base text-muted-foreground">
            I&rsquo;m a software developer based in Toronto, Canada, currently
            building AI/ML-powered automation tools at the Government of
            Ontario and studying Computer Programming &amp; Analysis at
            Seneca Polytechnic. I write about what I build, break, and learn
            along the way.
          </p>
          <SocialLinks />
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-24">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-foreground">Latest posts</h2>
          <Link
            href="/blog"
            className="font-mono text-sm text-accent transition-colors hover:text-foreground"
          >
            See all posts &rarr;
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
