// src/lib/server/data.ts (server-only)
import fs from "fs";
import path from "path";
import type { Post } from "../types";

const filePath = path.join(process.cwd(), "data/posts.json");

export function getPosts(): Post[] {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function savePosts(posts: Post[]) {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}
