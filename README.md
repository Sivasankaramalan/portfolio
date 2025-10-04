# Portfolio

A modern personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS v4. It highlights experience, projects, skills, blog articles, and contact information with smooth in-page navigation and theme switching.

## Features

- **Next.js App Router** with static + client components where appropriate
- **Responsive fixed header** with active section tracking (IntersectionObserver)
- **In‑page smooth navigation** using a delegated hook that respects the dynamic header height
- **Accessible theme toggle** (light / dark / system) with semantic tokens
- **Glass & layered UI styling** using Tailwind v4 + OKLCH color tokens
- **Mobile sheet menu** with scroll locking and focus management
- **Blog listing** with tags, dates, and reading time
- **Projects & Experience sections** using reusable `Card` components
- **Section accent gradients** and subtle reveal animations

## Stack

| Layer | Tech |
| ----- | ---- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript / React 18 |
| Styling | Tailwind CSS v4, custom OKLCH tokens, utility classes |
| Icons | lucide-react |
| Theming | next-themes + CSS variables |
| UI Primitives | Hand-rolled + Radix-based components (sheet, tooltip, etc.) |
| Content | Local data (`lib/*`), static assets in `public/` |

## Project Structure

```
app/               # Next.js app router pages & routes
  api/             # API routes (resume view/download)
  layout.tsx       # Root layout & ThemeProvider
  page.tsx         # Landing page sections
components/        # Section components + UI primitives
  site-header.tsx  # Fixed navigation + theme toggle
  theme-toggle.tsx # Accessible theme switch
  ui/              # UI primitive components (many unused can be pruned)
hooks/             # Reusable client hooks (e.g. use-toast, use-in-page-nav)
lib/               # Data helpers (blog, resume, utils)
public/            # Images, logos, resume PDF, placeholders
scripts/           # Utility scripts (e.g., extract-pdf-text)
styles/            # Global Tailwind layer and tokens
```

## Getting Started

Install dependencies (pnpm recommended):

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Build production bundle:

```bash
pnpm build
pnpm start
```

## Environment

No environment variables are required for the current feature set. If you later add analytics, forms, or external APIs, document them here.

## Theming

Color design tokens are defined in `styles/globals.css` using OKLCH. Dark mode is handled by `next-themes` adding the `class` attribute to `<html>`. The `ThemeToggle` uses a radiogroup pattern for accessibility.

## Navigation & Active Section Logic

- Anchor links are plain `<a href="#fragment">` elements.
- A delegated hook (`useInPageNav`) applies smooth scrolling with header offset, sets focus to the target section (or its heading), and updates `localStorage` with the last active section.
- IntersectionObserver updates the active state and styling as the user scrolls.

## Accessibility Notes

- Skip link (`#main-content`) provided.
- Theme toggle uses proper aria roles and visually hidden labels.
- Focus rings preserved with Tailwind focus-visible utilities.
- Mobile menu traps scroll (body overflow lock) but not focus (content is a sheet, dismissible).

## Cleanup & Unused Components

A large set of generic UI primitives (accordion, dialog, dropdown, etc.) exists under `components/ui/` but many are currently unused. Duplicated hooks removed:

- Removed: `components/ui/use-mobile.tsx`, `components/ui/use-toast.ts`
- Active hook versions remain in `hooks/`.

If you want to slim the bundle further, you can delete or archive unused primitives. Consider moving them into `components/ui/_unused/` first for safe rollback.

## Adding Content

- Blog articles: extend `lib/blog.ts` data or migrate to MDX.
- Projects / Experience: modify the relevant arrays inside their section components.
- Resume: replace the PDF under `public/resume/` with updated filename (adjust API route if name changes).

## Scripts

`scripts/extract-pdf-text.cjs` – utility for extracting raw text from the resume PDF (locally, not part of runtime).

## Performance Considerations

- Most sections are static and rendered once; only the header, theme toggle, and nav logic are interactive.
- Avoid importing unused heavy UI primitives in top-level components to keep the client bundle lean.

## Potential Next Steps

- Remove or archive unused UI components to reduce repo noise
- Add MDX pipeline for blog detail pages
- Implement <Toaster /> & toast usage if notifications become needed
- Add tests for hooks (`useInPageNav`, `use-toast`) and theme logic
- Integrate SEO metadata per section or blog post

## License

Personal portfolio source. You may reuse patterns, but review and adjust branding, content, and assets before publishing.

---
Generated README to reflect current architecture and ongoing cleanup efforts.
