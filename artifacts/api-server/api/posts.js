import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data/posts.json");

function getPosts() {
  if (!fs.existsSync(dataFilePath)) return [];
  return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    return res.status(200).json(getPosts());
  }

  if (req.method === "POST") {
    const posts = getPosts();
    const newPost = { id: Date.now(), ...req.body };
    posts.unshift(newPost);
    return res.status(201).json(newPost);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
