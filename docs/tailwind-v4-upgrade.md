# Tailwind CSS v4 Upgrade Notes

This project is structured for Tailwind CSS v4+ using the modern single `@import "tailwindcss";` entrypoint and modular design tokens.

## Key Characteristics
- Single import pipeline (`@import "tailwindcss";` in `app/globals.css`)
- Tokens isolated in `theme/tokens.css` (plain CSS variables, no `@theme` required)
- Local preset (`theme/preset.ts`) maps semantic class names to CSS variables
- Optional: Remove `tailwind.config.ts` for zero‑config if no extra scanning logic is needed

## File Overview
| File | Purpose |
|------|---------|
| `app/globals.css` | Imports Tailwind, animation utilities, and token file, plus custom utilities. |
| `theme/tokens.css` | Light + dark CSS variable definitions & semantic aliases. |
| `theme/preset.ts` | Tailwind preset that exposes variable-backed colors, radii, shadow, fonts. |
| `tailwind.config.ts` | Content globs + preset registration (explicit build control). |

## Why Tokens Are Plain CSS
Using raw `:root {}` + `.dark {}` blocks keeps portability across Tailwind versions and non-Tailwind consumers (Storybook, design previews, etc.). If you prefer v4 `@theme` syntax you could reintroduce:
```css
@theme inline {
  --color-background: var(--background);
  /* ... */
}
```
But plain variables are the most interoperable.

## Adding New Semantic Tokens
1. Add the base variable in `theme/tokens.css` (e.g. `--info: ...;` and `--info-foreground: ...;`).
2. Add aliases if desired: `--color-info: var(--info);`.
3. (Optional) Extend in `theme/preset.ts` if you want utility classes like `bg-info`:
```ts
extend: { colors: { info: 'var(--color-info)', 'info-foreground': 'var(--color-info-foreground)' } }
```

## Dark Mode Strategy
- Controlled by `class` strategy. Toggling `.dark` on `<html>` or `<body>` adjusts variables; utilities update naturally.

## Common Pitfalls After Migrating
| Symptom | Cause | Fix |
|---------|-------|-----|
| Duplicate base styles | Kept old `@tailwind base;` plus new `@import` | Remove the three old `@tailwind` directives. |
| Unused utilities purged | Missing path in `content` globs | Add correct folders (e.g. `app/**/*.{tsx,mdx}`). |
| Colors not updating in dark mode | Overridden by hard-coded hex in components | Replace direct hex with variable-backed classes or inline `style`. |
| Build says unknown at-rule | Left an `@theme` or `@plugin` without v4 pipeline | Remove or configure PostCSS for v4. |

## Adding Plugins (Typography, etc.)
In v4 you can still use plugins by exporting them in `tailwind.config.ts`:
```ts
import typography from '@tailwindcss/typography'
export default { presets: [preset], content: [...], plugins: [typography] }
```
Keep plugin CSS out of your token files.

## Testing Error Boundaries (Unrelated but Documented)
Use `/debug-error` route to throw a controlled error and confirm `app/error.tsx` + `app/global-error.tsx` behavior.

## Future Enhancements
- Introduce per-section accent gradients (map `--accent-about`, etc.)
- Provide a theming switch by swapping a second token file (`theme/tokens-alt.css`)
- Package `theme/` as a reusable npm library if extracted to monorepo

## Quick Checklist for Another Project
1. Install deps: `tailwindcss@^4 @tailwindcss/postcss postcss`
2. Create `globals.css` with:
   ```css
   @import "tailwindcss";
   @import "../theme/tokens.css";
   ```
3. Copy `tokens.css` into a `theme/` folder.
4. Add optional `theme/preset.ts` and reference in `tailwind.config.ts`.
5. Confirm content globs include all component/layout paths.
6. Remove legacy `@tailwind base/components/utilities` directives.

---
Feel free to extend this document with project-specific conventions.
