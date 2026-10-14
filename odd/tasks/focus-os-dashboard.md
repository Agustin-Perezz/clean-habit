# Focus OS Dashboard — `/` route

## Objective
Replace the create-next-app placeholder at `/` with a pixel-faithful implementation of the
supplied "Focus OS" habit-tracker dashboard design: fixed 260px sidebar, fixed 64px topbar,
12-column workspace (8-col objective cards + 4-col metrics aside). Data is mocked in-repo only.

## Problem / Why
`src/app/page.tsx` currently renders the Next.js starter. The user supplied a complete
HTML + Tailwind design and asked to match it pixel-for-pixel, UI only, with mocked data.

## Scope
In scope:
- Delivery-layer UI for `/` (App Router, route-private components).
- Design tokens (colors, fonts, spacing, font sizes) added to `globals.css` + `layout.tsx`.
- Mock data module + types.
- Local UI interactivity only: checkbox completion toggles, ring/percent recompute,
  quick-ingest appends a task. No persistence.

Out of scope:
- Supabase / auth / server actions / proxy changes.
- New domain entities, use cases, repositories, containers.
- Real data fetching.

## Constraints
- Clean Architecture layering untouched — delivery layer only.
- `src/app/AGENTS.md`: `page.tsx` = composition only; route-private components named with the
  feature prefix (`Focus*`); ~50-line hard limit per component, split at 40; type aliases for props
  (never inline types in params).
- `docs/development-guidelines.md`: constants over magic values; guard clauses; descriptive names.
- Tailwind v4 (`@theme inline` in `globals.css`) — extend tokens there, no Tailwind config file.
- Never hand-edit `database.types.ts` (not touched).
- Fonts: Inter (display/body) + Material Symbols Outlined (icons).
- Server/client boundary as low as possible: one client workspace component drives UI state.
- **Use shadcn native components** from `@/components/ui/*` where they fit (Input, Button, Card,
  Label, Separator, Textarea, DropdownMenu, Dialog, Sheet). Only hand-roll what has no installed
  equivalent (circular check, toggle switch, segmented bar, radial ring, heatmap).
- **Token naming (zero regression)**: Focus OS colors/typography/spacing keep their design names in
  `@theme`; the only collisions are prefixed — `focus-primary` (design `primary`) and
  `radius-focus-*` (md/lg/xl/2xl) to avoid overwriting shadcn's `--color-primary` / `--radius-*`.
  Everything else copies the design class names verbatim.
- Fonts: Inter via `next/font/google` (verified available); Material Symbols Outlined via a
  `<link>` stylesheet (not exported by `next/font/google` in next 16.3.5).

## Design tokens (source of truth — from supplied HTML)
Colors:
- canvas-parchment #f5f5f7, background/surface #f9f9fb, canvas-white #ffffff
- surface-container-lowest #ffffff, surface-container-low #f3f3f5, surface-container #eeeef0,
  surface-container-high #e8e8ea, surface-container-highest #e2e2e4
- ink-primary #1d1d1f, ink-secondary #333333, ink-tertiary #7a7a7a
- primary #004e9f, primary-container #0066cc, on-primary #ffffff, on-primary-container #dfe8ff
- hairline #e0e0e0, hairline-subtle rgba(0,0,0,0.08), divider-soft rgba(0,0,0,0.04)
- error-container #ffdad6, on-error-container #93000a
- tile-dark-1 #272729, tile-dark-2 #2a2a2c, tile-dark-3 #252527
- sky-link-on-dark #2997ff, inverse-surface #2f3132
- heat/success/priority greens + ambers used inline in design:
  #22c55e, #facc15, #f59e0b, #f97316, #15803d, #d98218, #34C759, #FF9F0A, #5856D6, #e5e5ea
- accent chip translucent rgba(210,210,215,0.64)

Typography (Inter):
- hero-display 56/60 -0.025em 600 ; display-lg 40/44 -0.02em 600 ; display-md 34/44 -0.015em 600
- tagline 21/26 -0.01em 600 ; body 17/25 -0.015em 400 ; body-strong 17/22 -0.015em 600
- caption 14/20 -0.01em 400 ; caption-strong 14/18 -0.01em 600 ; micro-legal 10/14 -0.005em 400
- nav-link 12/16 -0.005em 400

Spacing: space-xs .25rem, space-sm .5rem, space-md 1.0625rem, space-lg 1.5rem, space-xl 2rem,
gutter 1.5rem, margin 2rem, margin-mobile 1rem.

Radii: base .25rem, lg .5rem, xl .75rem, full 9999px (cards use rounded-2xl).

## Tasks
- [x] T1 — Design foundation: load Inter + Material Symbols fonts (`layout.tsx`); add Focus OS
      color/typography/spacing tokens to `globals.css` (`@theme inline`). No source logic.
      Route: inline (orchestrator). Done.
- [x] T2 — Mock data module: types + seeded mock (user, nav, objective cards, habits, summit,
      heatmap grid, quick-ingest options, quote). Route: delegated. Done.
- [x] T3 — Shell: `FocusSidebar` (traffic lights, Focus OS, Tracking/Library nav, user footer) and
      `FocusTopbar` (search + ⌘K, calendar, tune, avatar). Route: delegated. Done.
- [x] T4 — Page header + workspace grid + objective cards (`FocusDashboardHeader`, `FocusObjectiveCard`,
      `FocusSegmentedBar`, `FocusHabitRow`, `FocusToggle`). Route: delegated. Done.
- [x] T5 — Aside widgets (`FocusSummitCard` radial ring, `FocusHeatmap`, `FocusQuickIngest`,
      `FocusQuoteNote`). Route: delegated. Done.
- [x] T6 — Client workspace interactivity (checkbox toggles recompute per-card %/counters, global
      momentum pill, points pill, summit score + ring; quick-ingest appends a habit) wired to mock
      data; assemble `page.tsx` as composition only. Route: delegated. Done.

## Acceptance criteria
- `/` visually matches the supplied design at ≥1440px, and stacks to a single column below `lg`.
- All three objective cards, aside metrics, heatmap and quick-ingest render with mock values.
- `pnpm typecheck`, `pnpm lint`, `pnpm build` all pass.
- No edits outside the allowed surfaces below.

## Allowed edit surfaces
- src/app/layout.tsx
- src/app/globals.css
- src/app/page.tsx
- src/app/mock-data.ts
- src/app/components/**
- src/app/hooks/**

## Checks
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- Structural readback of the diff against the design.

## Verification evidence
- `pnpm typecheck` → `TypeScript: No errors found` (exit 0), re-run by orchestrator.
- `pnpm lint` (biome check .) → `Checked 129 files ... No fixes applied.` (exit 0), re-run by orchestrator.
- `pnpm build` → FAILS in this environment: no `.env` present, and untouched `src/app/dashboard/page.tsx`
  imports `env.ts`, which throws at module eval. Environmental/pre-existing, not caused by this change.
- `NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=... pnpm build` → success;
  `/` listed as `○ (Static) prerendered as static content`.
- Initial render numbers verified against built SSR HTML: momentum 60%, cards 75%/67%/33%,
  counters 3-of-4 / 2-of-3 / 1-of-3, "+6 Points Today", summit 6/10, ring offset 105.6,
  "4 tasks remaining…", 90 heatmap cells with the documented active indices, "5/7 Streak".
- Structural readback: `page.tsx` is composition-only; one `"use client"` root (`FocusWorkspace`)
  backed by `useFocusDashboard`; all 29 components ≤48 lines (hard limit 50).

## Known approximations (disclosed)
- Heatmap active-cell pattern is **mock data** (per the "mock all the data" instruction) and was
  transcribed by hand from the supplied HTML; the exact set of dark cells may differ from the
  design by a few cells. Grid structure (18×5 via `grid-flow-col grid-rows-5`, exact cell colors,
  trend badge) is faithful. Single-line fix in `HEATMAP_ACTIVE_INDICES` if an exact pattern is supplied.
- shadcn `Card` was not used: tailwind-merge cannot dedupe the custom `--color-*` / `--radius-focus-*`
  token classes against Card's defaults, so cards are plain divs with exact design classes.
  `Button`, `Input`, `Label`, `Separator` ARE used.

## Delivery strategy
`ask-on-risk` (default). Forecast ≈ 900–1200 authored lines → exceeds the ~400-line delivery budget.


## Follow-ups (after first commit)
- [x] F1 — Disable CI/CD auto-runs: `.github/workflows/ci.yml` triggers changed from
      push(main)/pull_request to `workflow_dispatch` only (manual). Reversible.
- [x] F2 — Narrow the content column: shared `FOCUS_CONTENT_MAX_WIDTH`, tightened
      1440 → 1280 → 1120 → **1024px** (`max-w-[1024px]`); objective cards are now ~675px wide.
- [x] F3 — Fix topbar/content misalignment: topbar now renders the same centered
      `FOCUS_CONTENT_MAX_WIDTH` container as the workspace, so the search field's left edge
      lines up with the main content on wide viewports. Verified at 1920px and 1512px:
      search field, `h1` and first card share the same left x (578 / 374).

## Next step
Follow-ups F1–F3 done; verify + commit. Remaining: delivery-strategy decision (single PR vs chained).
