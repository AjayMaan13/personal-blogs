# personal-blogs

Ajay Maan's personal blog — Next.js (App Router) + MDX, styled with Tailwind
CSS v4. Search, tag filtering, series grouping, a sticky table of contents,
and syntax-highlighted code blocks, all built on posts that are just MDX
files on disk.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4**
- **MDX** via `next-mdx-remote/rsc` + `gray-matter`
- **`rehype-pretty-code`** + shiki for code blocks (filenames, line numbers)
- **`next-themes`** for the light/dark toggle
- **`fuse.js`** for client-side post search

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run dev` runs a
`predev` step that regenerates `content/generated/posts-index.json` from
whatever's in `content/posts/` — that file is derived, gitignored, and never
edited by hand.

## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used in `sitemap.xml`, `robots.txt`, `rss.xml`, and Open Graph tags (`lib/site.ts`) | `https://example.com` |

No domain is registered yet. Once one is live, set `NEXT_PUBLIC_SITE_URL` in
your Vercel project's environment variables (or a local `.env.local` for
testing) to the real URL, e.g. `https://ajaymaan.com`.

## Writing a post

Add an `.mdx` file to `content/posts/`. The filename (minus `.mdx`) becomes
the URL slug. Frontmatter:

```yaml
---
title: "Post Title"
description: "One-line summary — shown on cards, in search, and as the meta description."
date: "2026-09-15" # YYYY-MM-DD
tags: ["nextjs", "ai"] # optional
series: "some-series-slug" # optional — omit for a standalone post
seriesOrder: 1 # required if `series` is set
coverImage: "/images/posts/slug/cover.png" # optional, not yet wired into any UI
---
```

Code fences support two extras from `rehype-pretty-code`:

````
```ts title="app/layout.tsx" showLineNumbers
// renders with a filename header and line numbers
```
````

### Adding a series

1. Add an entry to `content/series.json` (`slug`, `title`, `description`).
2. Set `series` (matching that slug) and `seriesOrder` on each post in the
   series. `lib/posts.ts#getAllSeries` groups and orders them automatically —
   nothing else to wire up.

## Project structure

```
app/            routes (home, /blog, /blog/[slug], /tags/[tag], /series, /series/[slug], /about)
components/     UI components — header/footer, post cards, search, ToC, MDX renderers
content/posts/  the actual blog posts (.mdx)
content/series.json   series metadata (title/description per series slug)
lib/            data layer — lib/posts.ts is the single source for reading/querying posts
scripts/        generate-index.ts — builds the search index from content/posts/
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (regenerates the post index first) |
| `npm run build` | Production build (regenerates the post index first) |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run generate-index` | Manually regenerate `content/generated/posts-index.json` |

## Deployment

Deploys to [Vercel](https://vercel.com) like any other Next.js app — import
the repo, no special build configuration needed. Set `NEXT_PUBLIC_SITE_URL`
in the project's environment variables once a domain is live (see above).
