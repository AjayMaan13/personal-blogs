import fs from "node:fs";
import path from "node:path";
import { getAllPostSummaries } from "../lib/posts";

const OUT_DIR = path.join(process.cwd(), "content/generated");
const OUT_FILE = path.join(OUT_DIR, "posts-index.json");

function main() {
  const index = getAllPostSummaries();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(index, null, 2)}\n`);

  console.log(
    `Generated ${index.length} post(s) -> ${path.relative(process.cwd(), OUT_FILE)}`,
  );
}

main();
