import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { YouTubeEmbed } from "@/components/youtube-embed";

type MDXComponentMap = NonNullable<MDXRemoteProps["components"]>;

const linkClassName =
  "text-accent underline decoration-border underline-offset-4 transition-colors hover:decoration-accent";

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  // rehype-autolink-headings' "#" permalinks are also plain <a> tags, so they
  // land here too — tagged with this class so we can render them as a quiet
  // icon instead of a normal prose link.
  const isHeadingAnchor =
    typeof props.className === "string" && props.className.includes("heading-anchor");

  if (isHeadingAnchor) {
    return (
      <a
        {...props}
        className="ml-2 text-muted-foreground no-underline opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent"
      >
        #
      </a>
    );
  }

  const href = props.href ?? "";
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return <a {...props} target="_blank" rel="noopener noreferrer" className={linkClassName} />;
  }

  return <Link {...props} href={href} className={linkClassName} />;
}

function InlineCode(props: ComponentPropsWithoutRef<"code">) {
  // Block code (inside rehype-pretty-code's <pre>) always carries
  // data-language; plain inline code (bypassInlineCode: true) never does —
  // that's the reliable signal for telling the two apart here.
  if ("data-language" in props) {
    return <code {...props} />;
  }

  return (
    <code
      {...props}
      className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
    />
  );
}

export const mdxComponents: MDXComponentMap = {
  YouTubeEmbed,
  h2: (props) => (
    <h2 {...props} className="group mt-12 scroll-mt-32 font-display text-2xl text-foreground" />
  ),
  h3: (props) => (
    <h3 {...props} className="group mt-8 scroll-mt-32 font-display text-xl text-foreground" />
  ),
  p: (props) => (
    <p {...props} className="mt-5 font-serif text-base leading-relaxed text-foreground" />
  ),
  a: Anchor,
  ul: (props) => (
    <ul {...props} className="mt-5 list-disc space-y-2 pl-6 font-serif text-foreground" />
  ),
  ol: (props) => (
    <ol {...props} className="mt-5 list-decimal space-y-2 pl-6 font-serif text-foreground" />
  ),
  li: (props) => <li {...props} className="leading-relaxed" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-6 border-l-2 border-accent bg-surface px-5 py-4 font-serif italic text-muted-foreground"
    />
  ),
  img: ({ alt, ...props }) => (
    // Author-provided images have no known dimensions, so next/image's
    // required width/height would have to be guessed; a plain responsive
    // <img> is the honest choice until posts actually carry image metadata.
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={alt ?? ""} className="mt-6 w-full rounded-lg border border-border" />
  ),
  hr: (props) => <hr {...props} className="my-10 border-border" />,
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse font-mono text-sm" />
    </div>
  ),
  th: (props) => (
    <th {...props} className="border-b border-border px-3 py-2 text-left text-foreground" />
  ),
  td: (props) => <td {...props} className="border-b border-border px-3 py-2 text-muted-foreground" />,
  code: InlineCode,
};
