# JaaGa Insights

A property documents blog and insights app for Indian real estate, ported from Next.js to the Replit pnpm workspace stack.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/jaaga run dev` — run the Vite frontend (port varies, set via PORT env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React 19, Tailwind CSS v4, wouter (routing)
- API: Express 5 (api-server artifact at port 8080)
- Blog data: `data/posts.json` (served via `/api/posts`)
- UI: shadcn/ui components, lucide-react icons
- Rich text editor: react-quill (blog editor)

## Where things live

- `artifacts/jaaga/` — Vite + React frontend
  - `src/pages/` — page components (home, blogs, blog-post, category, about, contact, login, blog-editor)
  - `src/components/` — shared components (header, footer, blog cards, chatbot, etc.)
  - `src/lib/api.ts` — blog data fetching (`/api/posts` proxy)
  - `src/lib/data.ts` — static category/service data
  - `src/context/auth-context.tsx` — localStorage-based auth
- `artifacts/api-server/` — Express API server
  - `src/routes/posts.ts` — GET/POST/PUT/DELETE `/api/posts` backed by `data/posts.json`
- `data/posts.json` — source of truth for blog posts

## Architecture decisions

- Next.js → Vite: All `next/link` → wouter `Link`, `next/image` → `<img>`, `useRouter/usePathname` → `useLocation`
- `'use server'` Genkit AI flows (jaaga-ai-assistant, text-to-speech) are not browser-runnable — chatbot falls back to a stub response; SEO generator is also stubbed
- Vite dev server proxies `/api/*` to `http://localhost:8080` to avoid CORS on blog data
- Auth is localStorage-based (no backend needed for the simple admin login)
- Blog data lives in `data/posts.json` at the workspace root, accessible by both servers

## Product

- **Home page**: Hero, category cards (links to jaaga.ai services or category pages), featured blog posts, FAQ section, CTA
- **Blogs list** (`/blogs`): All posts with search/filter by category
- **Blog post** (`/blogs/:slug`): Full post with sidebar, related articles, breadcrumb
- **Category pages** (`/category/:slug`): Posts filtered by category
- **About** (`/about`): Company mission page
- **Contact / Contact-Us**: Social media connect page
- **Login** (`/login`): Admin login (email: jaagamarketing@gmail.com / password: Jaaga@marketing)
- **Blog Editor** (`/blogs/editor`): Authenticated editor to create/manage posts (uses react-quill)
- **Chatbot popup**: Floating bot icon (stubbed AI response)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The api-server must be running for blog data to load (it serves `data/posts.json` at `/api/posts`)
- Vite proxy `/api` → `localhost:8080` only works in dev; for production, configure a reverse proxy
- The `src/app/` directory contains the original Next.js page files (kept for reference) — the actual pages used are in `src/pages/`
- `src/ai/flows/` contains Genkit server-side flows — these can't run in the browser and are not imported by the frontend
- react-quill is loaded lazily in the blog editor to avoid SSR issues

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
