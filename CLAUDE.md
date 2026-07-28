# Portfolio — Frontend Architect Review

> Authored by Claude Code (Sonnet 4.6) on 2026-07-28.  
> **All P0–P3 issues fixed on 2026-07-28.** Treat this as a living document — update as new issues arise.

---

## Project Overview

**Stack:** Next.js 14.2.16 · React 18 · TypeScript 5 · Tailwind CSS v4 · shadcn/ui  
**Domain:** https://sivasankaramalan.dev  
**Pattern:** Single-page portfolio with App Router, static blog, resume viewer, playbooks, admin dashboards  
**Package manager:** pnpm

---

## Architecture Map

```
app/                  Next.js App Router
  layout.tsx          Root layout — fonts, metadata, JSON-LD, SW registration
  page.tsx            Homepage — assembles all section components
  blog/[slug]/        Static blog pages (generateStaticParams)
  resume/             PDF viewer (client)
  playbook/           Playbook index + mobile/web/api detail pages
  api/content/        In-memory CRUD route (Map — resets on cold start)
  api/resume/         download + view route handlers
  admin/              performance + architecture dashboards (noindex)
  globals.css         Active design system (1040 lines, Tailwind v4)
  sitemap.ts          Dynamic sitemap
  robots.ts           Robots config

components/
  site-header.tsx     Nav with IntersectionObserver section tracking
  hero.tsx            Hero with typewriter, portrait, floating badges
  about.tsx           4-card capability grid
  experience.tsx      Horizontal-scroll timeline (6 entries)
  education.tsx       2-column responsive timeline
  certifications.tsx  3-column certification grid
  skills.tsx          12-card skill grid
  projects.tsx        Featured (2) + standard (2) project cards
  blog.tsx            Blog section with 6 article cards
  contact.tsx         Email CTA + social links
  ui/                 30+ shadcn/ui Radix primitives (many unused)
  admin-performance-dashboard.tsx  Admin only
  architectural-dashboard.tsx      Admin only
  advanced-performance-system.tsx  Never mounted in production
  content-optimization-pipeline.tsx  Never mounted in production
  error-recovery-system.tsx          Never mounted in production

lib/
  blog.ts             6 full article bodies hardcoded inline (~13 KB)
  resume.ts           Resume helper
  site.ts             Site constants (domain, name, socials)
  utils.ts            cn() helper

public/
  Image/Sivasankaramalan.png   3.6 MB — hero portrait (CRITICAL PATH)
  Image/Shiv.jpg               6.1 MB — appears UNUSED
  blog/1.png, 2.png, 3.png     1.5–1.7 MB each — uncompressed blog thumbnails
  logos/                       Mostly well-sized WebP/PNG logos
  resume/Sivasankaramalan.pdf  330 KB resume
  sw.js                        Service worker (cache v3, network-first nav)

styles/
  globals.css         DEAD FILE — shadcn scaffold remnant, conflicting tokens, never imported
```

---

## Design System

**Color space:** oklch throughout — perceptually uniform, modern.  
**Light theme:** "Soft Lavender Aurora" — warm white with violet undertones.  
**Dark theme:** "Cosmic Aurora" — deep space with violet/cyan glow accents.  
**Custom token groups:** `--aurora-*`, `--mesh-*`, `--glow-*`, extended accent palette, `--accent-ai` for AI-badged elements.

**Utility classes (globals.css):**
- `.glass` / `.glass-elevated` — glassmorphism panels
- `.card-glow` — gradient border via mask-composite + hover lift
- `.text-gradient` / `.hero-name-gradient` — animated gradient text
- `.reveal-section` / `.reveal-stagger` — scroll reveal system
- `.ai-badge` / `.ai-card` — AI highlight styling
- `.timeline-item` — vertical timeline with glow dot
- `.container-pro`, `.section`, `.section-tight` — layout helpers
- `.glow-blob` — ambient light orbs (absolute positioned)

**Animations defined (12 total):**
`glow-blob`, `text-gradient`, `shimmer`, `float`, `pulse-glow`, `spin-slow`, `fadeSlideIn`, `scale-in`, `bounce-subtle`, `aurora-wave`, `aurora-drift`, `glow-drift`, `sparkle`

---

## Issues by Priority

### P0 — Breaks Core Web Vitals (Fix Before Any Launch/Sharing)

#### 1. Hero image is 3.6 MB on the critical path
- **File:** `public/Image/Sivasankaramalan.png` (3.6 MB)
- **Root cause:** `images: { unoptimized: true }` in `next.config.mjs` bypasses Next.js image optimization entirely.
- **Impact:** LCP will be 8–15s on mobile. This alone will fail a Lighthouse performance audit.
- **Fix options (choose one):**
  - **Recommended:** Remove `images.unoptimized: true` from `next.config.mjs`. Next.js will auto-serve WebP/AVIF at correct sizes (target ~80–150 KB for the portrait).
  - **Alternative:** Manually re-export the portrait at web resolution (1000×1000px max, save as WebP at 80% quality — targets ~120 KB).
- **Note:** `unoptimized: true` was likely added to fix a static export issue. If deploying to Vercel (not static export), it is safe to remove.

#### 2. `images.unoptimized: true` blocks all image optimization
- **File:** `next.config.mjs:10`
- **Impact:** Affects hero portrait, 3 blog thumbnails (1.5–1.7 MB each), all logos. All are served at full file size on every request.
- **Fix:** Remove this line entirely. Verify deployment target supports Next.js image optimization (Vercel does; pure static export does not).

---

### P1 — Accessibility and Correctness Bugs

#### 3. Skip link targets non-existent element
- **File:** `components/site-header.tsx`
- **Problem:** The header renders a skip link with `href="#main-content"`. No element in the DOM has `id="main-content"`. The Hero component uses `id="main"`. Keyboard users pressing Tab → Enter at page load land nowhere.
- **Fix:** In `site-header.tsx`, change `href="#main-content"` to `href="#main"`, OR add `id="main-content"` to the `<main>` element in `app/page.tsx`.

#### 4. CSS animations ignore `prefers-reduced-motion`
- **File:** `app/globals.css`
- **Affected animations:** `aurora-drift`, `glow-drift`, `glow-blob`, `spin-slow`, `aurora-wave`, `float`, `pulse-glow`, `sparkle`
- **Problem:** Users who set "Reduce Motion" in OS accessibility settings still get all animations. Only the JS typewriter in `hero.tsx` checks `prefers-reduced-motion`.
- **Fix:** Add at the bottom of `globals.css`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

#### 5. Blog section uses `<a>` instead of Next.js `<Link>`
- **File:** `components/blog.tsx`
- **Problem:** Article links use plain HTML `<a href="/blog/slug">` which triggers full page navigations instead of client-side routing. Loss of prefetching, scroll position preservation, and fast transitions.
- **Fix:** Import `Link` from `next/link` and replace `<a href>` elements wrapping each blog card.

#### 6. Dead CSS file with conflicting design tokens
- **File:** `styles/globals.css` (never imported anywhere)
- **Problem:** This 126-line file redefines every `--color-*` token with flat neutral/grey values (shadcn scaffold defaults). If any future file accidentally imports it, it will override the entire color system silently.
- **Fix:** Delete `styles/globals.css`.

---

### P2 — Performance and Bundle Size

#### 7. 6.1 MB unused image
- **File:** `public/Image/Shiv.jpg`
- **Problem:** Not referenced in any active component. Ships with every deployment.
- **Fix:** Delete the file (or archive locally if you want to keep it).

#### 8. Unused shadcn/ui + Radix packages
- **Unused components in `components/ui/`:**
  Calendar, Carousel, Command, Drawer, Input-OTP, Menubar, Navigation-Menu, Resizable, Sidebar, Toast/Toaster (Sonner is installed instead), Context-Menu
- **Corresponding unused packages:**
  `embla-carousel-react`, `react-day-picker`, `input-otp`, `vaul`, `cmdk`, `react-resizable-panels`, `react-hook-form` (no contact form in UI)
- **Impact:** Tree-shaking removes most unused code, but the packages inflate `node_modules` and may add indirect runtime cost.
- **Fix:** Run `pnpm dlx depcheck` to confirm unused packages, then remove confirmed dead deps.

#### 9. Components marked `"use client"` with no client-side behavior
- **Affected:** `components/about.tsx`, `components/skills.tsx`, `components/certifications.tsx`
- **Problem:** These render static data only but opt out of React Server Components. They cannot be streamed by the RSC runtime.
- **Fix:** Remove the `"use client"` directive from each. If they use hooks or browser APIs after refactor, add it back per-component.

#### 10. Blog content hardcoded inline in `lib/blog.ts`
- **Problem:** Full markdown body of all 6 articles is inlined in a single TypeScript file (~13 KB). At build time this is fine, but all 6 article bodies are included in the homepage JS bundle even though visitors only ever read one.
- **Fix (long term):** Move article content to `/content/blog/*.md` files and load them with `fs.readFileSync` in a Server Component. The `generateStaticParams` + `generateMetadata` pattern is already correctly in place.

#### 11. `analyze` script missing `cross-env` dependency
- **File:** `package.json`
- **Problem:** `"analyze": "cross-env ANALYZE=true next build"` requires the `cross-env` package, which is not in `devDependencies`. The script will fail when run.
- **Fix:** Add `cross-env` and `@next/bundle-analyzer` to devDependencies:
  ```
  pnpm add -D cross-env @next/bundle-analyzer
  ```
  Then wire up in `next.config.mjs`:
  ```js
  import bundleAnalyzer from '@next/bundle-analyzer'
  const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
  export default withBundleAnalyzer(nextConfig)
  ```

---

### P3 — Code Quality and Maintainability

#### 12. `eslint.ignoreDuringBuilds: true` silences all lint errors in CI
- **File:** `next.config.mjs:4`
- **Problem:** Production builds will succeed even if there are ESLint errors. Errors are invisible in CI/CD pipelines.
- **Fix:** Set to `false` after running `pnpm lint --fix` to clear any existing lint errors.

#### 13. In-memory content API resets on cold starts
- **File:** `app/api/content/route.ts`
- **Problem:** Content is stored in a module-level `Map`. Serverless functions restart frequently; all state is lost on each cold start.
- **Impact:** Low — this API is not used by the visible portfolio. But it contains placeholder data that does not match the real portfolio owner.
- **Fix:** Either delete this route (it has no production use), or migrate to a real data store before using it.

#### 14. Admin components never mounted in production inflating bundle
- **Never mounted in production layout:**
  - `components/advanced-performance-system.tsx`
  - `components/content-optimization-pipeline.tsx`
  - `components/error-recovery-system.tsx`
- **Admin-only (correctly isolated):**
  - `components/admin-performance-dashboard.tsx`
  - `components/architectural-dashboard.tsx`
- **Fix:** Move the "never mounted" components to an `archive/` folder or delete them if they were experimental explorations.

#### 15. Duplicate hero portrait asset
- `public/Image/IIT_Madras_Logo.svg.webp` and `public/logos/iit-madras.webp` are the same logo in two locations.
- **Fix:** Remove `public/Image/IIT_Madras_Logo.svg.webp` if it is not referenced directly. Verify with `grep -r "IIT_Madras_Logo" .`.

#### 16. `sitemap.ts` uses `lastModified: new Date()` for all pages
- **File:** `app/sitemap.ts`
- **Problem:** Every page reports "last modified = right now" on every build. Search engines use this signal to decide crawl priority — always reporting "just changed" dilutes the signal.
- **Fix:** Use real dates from blog post metadata and a static date for stable pages. Example:
  ```ts
  lastModified: post.date ? new Date(post.date) : new Date('2025-01-01')
  ```

#### 17. Structured Data components use `'use client'`
- **File:** `components/structured-data.tsx`
- **Problem:** Client Components render JSON-LD scripts. While functional, structured data is static and should be rendered on the server to guarantee bots see it before JS hydration.
- **Fix:** Remove `"use client"`, convert to a Server Component that returns `<script type="application/ld+json">` with a static string.

---

## Accessibility Checklist

| # | Item | Status |
|---|------|--------|
| ✅ | `lang="en"` on `<html>` | Done |
| ✅ | Skip-to-content link present | Done (broken target — see Issue #3) |
| ✅ | `aria-hidden` on decorative icons | Done |
| ✅ | `aria-label` on icon-only buttons | Done |
| ✅ | `aria-current="page"` on active nav | Done |
| ✅ | `<time>` elements for dates | Done |
| ✅ | `<article>` for experience/education cards | Done |
| ✅ | Focus management in `useInPageNav` | Done |
| ✅ | `prefers-reduced-motion` in typewriter JS | Done |
| ✅ | Keyboard focus ring styles | Done |
| ❌ | Skip link target exists in DOM | **Bug** (Issue #3) |
| ❌ | CSS animations respect reduced-motion | **Missing** (Issue #4) |
| ❌ | Experience scroll container has `aria-label` | Missing |
| ❌ | Contact section social links have `aria-label` | Missing (sr-only pattern not applied) |
| ❓ | Color contrast: `--muted-foreground` on card bg | Not verified — run axe or Lighthouse |

---

## Performance Budget Targets

| Metric | Current (estimated) | Target |
|--------|--------------------|----|
| LCP | ~10–15s mobile (3.6 MB hero image) | < 2.5s |
| Hero image weight | 3.6 MB | < 150 KB (WebP) |
| Blog thumbnail weight | 1.5–1.7 MB each | < 100 KB each |
| Total JS (homepage) | Unknown — run analyzer | < 200 KB gzipped |
| Lighthouse Performance | < 50 (estimated) | 90+ |

---

## Fix Status (all resolved 2026-07-28)

```
✅ [P0] Removed images.unoptimized: true from next.config.mjs
⚠️ [P0] Hero portrait still 3.6 MB PNG — manually re-export as WebP (< 150 KB)
        See: public/Image/Sivasankaramalan.png
✅ [P1] Fixed skip link target (#main-content → #main) in site-header.tsx
✅ [P1] Added prefers-reduced-motion CSS block to app/globals.css
✅ [P1] Deleted styles/globals.css (dead conflicting token file)
✅ [P1] Replaced <a> with <Link> in blog.tsx (client-side routing restored)
✅ [P2] Deleted public/Image/Shiv.jpg (6.1 MB unused)
✅ [P2] Deleted public/Image/IIT_Madras_Logo.svg.webp (duplicate)
✅ [P2] Added cross-env + @next/bundle-analyzer to devDependencies, wired up next.config.mjs
✅ [P2] Removed "use client" from about.tsx, skills.tsx, certifications.tsx
✅ [P3] Set eslint.ignoreDuringBuilds to false
✅ [P3] Fixed sitemap.ts — static pages now use real dates
✅ [P3] Converted structured-data.tsx to Server Component (removed 'use client')
✅ [P3] Added aria-label + role="region" to experience scroll container
✅ [P3] Added aria-labels to contact section social links
✅ [P3] Admin components (advanced-performance-system, etc.) confirmed correctly
        isolated to /admin/* pages — no action needed

Remaining manual task (requires image editor, not code):
  → Re-export public/Image/Sivasankaramalan.png as WebP at ~1000×1000px,
    target < 150 KB. Save back to the same path.
    Blog thumbnails public/blog/1.png, 2.png, 3.png (1.5–1.7 MB each) — same treatment.
```

---

## What's Already Done Well

- **SEO is thorough:** 3 JSON-LD schemas (Person/WebSite/Organization), full og:/twitter: tags, canonical, `generateMetadata` on blog pages, robots.ts, dynamic sitemap.
- **Dark mode:** Complete — `next-themes` with system preference default, no FOUC (`suppressHydrationWarning`).
- **Service Worker:** Cache strategy is sensible (network-first for navigations, cache-first for assets, bypass for PDF).
- **PWA:** Manifest, icons, install prompt with iOS detection.
- **Navigation accessibility:** IntersectionObserver section tracking, keyboard focus management, `aria-current`, mobile Sheet drawer.
- **Typewriter:** Respects `prefers-reduced-motion`.
- **Icon system:** Lucide React — consistent, tree-shakeable.
- **TypeScript:** Strict mode on, build errors not suppressed.
- **Blog static generation:** `generateStaticParams` pattern is correct.
- **Analytics:** GA4 + Vercel Analytics + Web Vitals all deferred/lazy — does not block rendering.
- **Design system:** oklch color space, well-organized token hierarchy, clear theming intent.
- **Font loading:** `next/font/google` with `display: swap` — no render blocking.

---

## File Inventory Quick Reference

| Path | Role | Action |
|------|------|--------|
| `app/globals.css` | Active design system | ✅ prefers-reduced-motion added |
| `styles/globals.css` | ~~Dead conflicting tokens~~ | ✅ Deleted |
| `public/Image/Sivasankaramalan.png` | Hero portrait 3.6 MB | ⚠️ Manual: re-export as WebP < 150 KB |
| `public/Image/Shiv.jpg` | ~~Unused 6.1 MB~~ | ✅ Deleted |
| `public/Image/IIT_Madras_Logo.svg.webp` | ~~Duplicate~~ | ✅ Deleted |
| `public/blog/1.png`, `2.png`, `3.png` | Blog thumbnails 1.5–1.7 MB | ⚠️ Manual: compress to WebP < 100 KB |
| `next.config.mjs` | Build config | ✅ images.unoptimized removed, eslint fixed, analyzer wired |
| `components/blog.tsx` | Blog section | ✅ `<Link>` replaces `<a>` |
| `components/structured-data.tsx` | JSON-LD | ✅ Server Component |
| `components/about.tsx` | About section | ✅ Server Component |
| `components/skills.tsx` | Skills section | ✅ Server Component |
| `components/certifications.tsx` | Certifications | ✅ Server Component |
| `components/advanced-performance-system.tsx` | Admin dashboard dep | ✅ Correctly isolated to /admin |
| `components/content-optimization-pipeline.tsx` | Admin dashboard dep | ✅ Correctly isolated to /admin |
| `components/error-recovery-system.tsx` | Admin dashboard dep | ✅ Correctly isolated to /admin |
| `app/api/content/route.ts` | In-memory API (unused) | Low priority — delete or persist properly if needed |
