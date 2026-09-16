// Single source for site-wide identity, reused by layout metadata, every
// page's <title>, sitemap.ts, robots.ts, and the RSS feed.
export const SITE_NAME = "Ajay Maan";
export const SITE_DESCRIPTION =
  "Personal blog — software, AI, and lessons from shipping projects.";

// No domain is registered yet (still deciding between a few options), so this
// defaults to a placeholder. Set NEXT_PUBLIC_SITE_URL once a real domain is
// live — see README.md.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
