import { execSync } from "child_process";
import { cpSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL(".", import.meta.url));

console.log("Building frontend...");
execSync("pnpm --filter @workspace/jaaga run build:vercel", {
  stdio: "inherit",
  cwd: root,
});

const src = resolve(root, "artifacts/jaaga/dist");
const dest = resolve(root, "dist");

if (!existsSync(src)) {
  console.error("Build output not found at:", src);
  process.exit(1);
}

console.log("Copying output from", src, "to", dest);
if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("Done.");
