import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, "../../data/posts.json");

function getPosts() {
  if (!fs.existsSync(dataFilePath)) return [];
  return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const id = Number(req.query.id);
  const posts = getPosts();

  if (req.method === "DELETE") {
    const filtered = posts.filter((p) => p.id !== id);
    return res.status(200).json({ success: true, removed: posts.length - filtered.length });
  }

  if (req.method === "PUT") {
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Post not found" });
    const updated = { ...posts[idx], ...req.body };
    return res.status(200).json(updated);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
