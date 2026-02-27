# AGENTS.md

## Cursor Cloud specific instructions

### Overview

SUBGarden is a Next.js 15 (App Router) marketing website for a sub-irrigation system. It is a single-app TypeScript project (not a monorepo) with i18n support (Italian, English, German via `next-intl`).

### Running the application

Standard commands are in `package.json` and `README.md`:

- `npm run dev` — starts the dev server on `http://localhost:3000`
- `npm run build` — production build
- `npm run lint` — ESLint

### Key caveats

- **No database or Docker required.** Blog content comes from local Markdown files in `content/blog/`, solutions data is hardcoded in `lib/solutions.ts`.
- **No external services required for dev.** The contact form (Resend) gracefully falls back to `console.log` when `RESEND_API_KEY` is not set. Analytics (GA4/GTM) loads only after cookie consent. Video URLs fall back to local assets.
- Copy `.env.example` to `.env.local` before running — all values have sensible defaults or are optional.
- The default locale is `it` (Italian). The root `/` redirects to `/it` via the `next-intl` middleware.
- No automated test suite exists in this project; verification is done via `npm run lint` and `npm run build`.
