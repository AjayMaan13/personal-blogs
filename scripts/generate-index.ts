import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "../lib/posts";

const OUT_DIR = path.join(process.cwd(), "content/generated");
const OUT_FILE = path.join(OUT_DIR, "posts-index.json");

function main() {
  const posts = getAllPosts();

  const index = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    series: post.series ?? null,
    coverImage: post.coverImage ?? null,
    readingTime: post.readingTime.text,
  }));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(index, null, 2)}\n`);

  console.log(
    `Generated ${index.length} post(s) -> ${path.relative(process.cwd(), OUT_FILE)}`,
  );
}

main();
