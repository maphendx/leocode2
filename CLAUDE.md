# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

LEOCODE marketing/landing site — a Next.js 16 (App Router) + React 19 site for a Lviv-based children's coding/drones school. UI copy is Ukrainian; keep new user-facing strings in Ukrainian to match.

## Commands

Package manager: Bun is used (see `bun.lock`), but the scripts are `npm`-compatible.

- `bun dev` / `npm run dev` — dev server (binds `0.0.0.0`, port 3000)
- `npm run build` — production build (runs lint)
- `npm run build:no-lint` — production build skipping lint (used by Netlify, see `netlify.toml`)
- `npm run start` — serve the built app
- `npm run lint` — ESLint over `.js,.mjs,.cjs,.ts,.tsx`

There is no test runner configured.

## Architecture

### Routing & rendering
- App Router under `src/app`. Locale-style URL segments are Ukrainian transliterations (`/workshopy`, `/partnerstva-shkil`, `/work`).
- `src/app/layout.tsx` is the root layout: loads Mulish font (latin+cyrillic), injects `SchemaMarkup`, renders `ClientBody`, and conditionally mounts `LiveChatLoader` only in production. SEO metadata is centralized in `src/lib/seo.ts` (`siteConfig`, `buildPageMetadata`, `DEFAULT_KEYWORDS`).
- `src/app/sitemap.ts` and `src/app/robots.ts` generate sitemap/robots from `siteConfig.url`.
- Page composition pattern (see `src/app/page.tsx`): each home section is wrapped individually in `ErrorBoundary` with a localized fallback so a single section can fail without breaking the page.

### Edge middleware
- `src/proxy.ts` (note: not `middleware.ts`) handles canonical-host redirects (`www.` → apex) and adds `X-Robots-Tag: noindex` for Vercel preview hosts. The canonical host is derived from `NEXT_PUBLIC_BASE_URL`. Matcher is `/:path*`.

### Form submission API
- `src/app/api/submit-form/route.ts` is the only API route. It writes to Google Sheets via `googleapis` using a service account.
- Required env vars: `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY` (newlines escaped as `\n`), `GOOGLE_SHEET_ID`.
- The route auto-creates sheets ("Відповіді форми", "Реєстрації", "Літній табір") with Ukrainian headers and styled formatting if missing. Routing between "Реєстрації" vs. "Літній табір" is controlled by the `isSummerCamp` flag on the request body. Phone numbers are written prefixed with `'` to force text formatting in Sheets.
- Validation is inline in the same file (`validateFormData`) — accepts both `name` and `parentName`; phone must match `^\+\d{8,15}$`.

### UI conventions
- shadcn/ui (style `new-york`, base color `zinc`) configured in `components.json`. Generated primitives live in `src/components/ui/`. Aliases: `@/components`, `@/lib`, `@/hooks`, `@/components/ui`.
- Tailwind: there are **two** config files (`tailwind.config.js` and `tailwind.config.ts`) plus `@tailwindcss/postcss` (Tailwind v4) wired in `postcss.config.mjs`. Be careful which one is authoritative when changing theme tokens — verify with the dev server before assuming.
- Animations: `framer-motion`; carousels: `swiper`; 3D: `@react-three/fiber` + `@react-three/drei` + `three`.
- Component groups under `src/components/`: `home/` (landing sections), `partnerstva/`, `other/`, `cookies/`, `analytics/`, `utils/` (e.g., `ErrorBoundary`, `LiveChatLoader`, `SchemaMarkup`), and the shared `Header.tsx` / `Footer.tsx`.

### Cross-cutting
- `src/contexts/ModalContext.tsx` — global modal state for forms.
- `src/lib/` — shared utilities: `seo.ts`, `cookieUtils.ts`, `imageUtils.ts`, `networkUtils.ts`, `svgUtils.ts`, `utils.ts` (shadcn `cn`).
- `src/services/imagePreloader.ts` and `src/hooks/` (`useHydrated`, `useIntersectionObserver`, `usePrefersReducedMotion`) — performance helpers used to defer non-critical assets.
- `next.config.js` configures remote image hosts (`leocode.com.ua`, `images.unsplash.com`), AVIF/WebP, custom `qualities`/`deviceSizes`, security headers (HSTS, X-Frame-Options, Permissions-Policy), and 1y immutable cache for static media.

## Lint rules to know
- `@typescript-eslint/no-explicit-any` is **error** repo-wide, **warn** for `src/app/api/**`, and **off** specifically for `src/app/api/submit-form/route.ts` (see `.eslintrc.js`). Prefer typed alternatives outside the API route.

## Deployment
- Netlify build runs `npm run build:no-lint` and publishes `.next` (`netlify.toml`). The `www → apex` redirect is enforced both at Netlify and in `src/proxy.ts`.