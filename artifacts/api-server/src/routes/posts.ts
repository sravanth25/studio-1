import { Router } from "express";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "../../data/posts.json");

function getPosts() {
  if (!fs.existsSync(dataFilePath)) return [];
  return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
}

function savePosts(posts: unknown[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
}

const postsRouter = Router();

postsRouter.get("/posts", (_req, res) => {
  const posts = getPosts();
  res.json(posts);
});

postsRouter.post("/posts", (req, res) => {
  try {
    const posts = getPosts();
    const body = req.body;
    const newPost = {
      id: Date.now(),
      ...body,
    };
    posts.unshift(newPost);
    savePosts(posts);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to save post" });
  }
});

postsRouter.delete("/posts/:id", (req, res) => {
  try {
    const posts = getPosts();
    const id = Number(req.params.id);
    const filtered = posts.filter((p: { id: number }) => p.id !== id);
    savePosts(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

postsRouter.put("/posts/:id", (req, res) => {
  try {
    const posts = getPosts();
    const id = Number(req.params.id);
    const idx = posts.findIndex((p: { id: number }) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Post not found" });
    posts[idx] = { ...posts[idx], ...req.body };
    savePosts(posts);
    res.json(posts[idx]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

export default postsRouter;
