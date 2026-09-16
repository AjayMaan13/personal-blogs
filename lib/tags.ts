// No Node APIs here on purpose — this needs to be safely importable from
// client components (e.g. PostCard's tag chip links), unlike lib/posts.ts
// which reads from the filesystem.
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
