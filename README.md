# Coffee Brand — Next.js Project

A professional, production-ready Next.js (App Router) website scaffold for a premium specialty coffee brand.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18 |
| Styling | Tailwind CSS |
| Animations | GSAP + Framer Motion |
| Database | MongoDB + Mongoose |
| Media | Cloudinary |
| API (future) | Express.js |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Fill in your values in .env.local

# 3. Start the development server
npm run dev
```

## Project Structure

See each file for a placeholder comment describing its purpose.

- **`app/`** — Next.js App Router pages and API route handlers
- **`components/`** — Reusable React components (layout, hero, sections, UI primitives, animations)
- **`lib/`** — Database clients, Cloudinary utilities, and shared helpers
- **`hooks/`** — Custom React hooks (scroll frames, parallax, GSAP)
- **`services/`** — Data access layer (blog, coffee, Instagram)
- **`data/`** — Static seed data (menu, products, testimonials)
- **`models/`** — Mongoose schemas (Blog, Category, Product)
- **`controllers/`** — Express.js controller functions
- **`routes/`** — Express.js router definitions
- **`middleware/`** — Auth and error-handling middleware
- **`config/`** — Server-side database and Cloudinary config
- **`context/`** — React Context providers (Theme, Animation)
- **`styles/`** — Global CSS and animation keyframes
- **`public/`** — Static assets (images, frames, videos, icons)
