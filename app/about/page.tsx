import type { Metadata } from "next";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am and what this blog is about.",
  openGraph: { title: "About", description: "Who I am and what this blog is about." },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">About</p>
      <h1 className="mt-2 font-display text-3xl text-foreground">Ajay Maan</h1>

      <div className="mt-8 space-y-5 font-serif text-base leading-relaxed text-foreground">
        <p>
          I&rsquo;m a software developer based in Toronto, Canada. I&rsquo;m currently building
          AI/ML-powered automation tools as a Software Developer at the Government of Ontario,
          and studying Computer Programming &amp; Analysis at Seneca Polytechnic.
        </p>
        <p>
          Most of what I build sits somewhere between web development, AI/ML, and whatever a
          hackathon deadline forced me to learn that weekend. I like shipping things that
          actually run in production, not just demos &mdash; and I like writing about the parts
          that were harder than they looked.
        </p>
        <p>
          This blog is where I put that writing: what I&rsquo;m building, what broke and how I
          fixed it, and what I learned along the way. No polish for polish&rsquo;s sake &mdash;
          just what I&rsquo;d have wanted to read before I started.
        </p>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <SocialLinks />
      </div>
    </main>
  );
}
