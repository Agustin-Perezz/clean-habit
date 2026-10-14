# Objectives CRUD — `/` route

Objective: real CRUD of the Focus OS objective cards, persisted in Supabase, mirroring the
`books` reference feature layer by layer. Branch `feat/objectives-crud`, single PR (user choice),
unit runner `pnpm test:unit` (vitest), checks `pnpm typecheck && pnpm lint && pnpm build`.

## Specs

- S1 (ticket, verbatim): "I want the core functionality of the app, CRUD of the cards only, leave
  the rest with mock if needed. The “new objective” button should open a modal with the form"
  - CRUD = objective cards only: create, read, update, delete of objectives via the container.
  - "The rest" stays mock: habit completion toggles and quick-ingest additions remain
    client-side ephemeral; aside metrics, heatmap, summit, quote, user stay mocked.
  - Habits/segments are seeded mock content stored as jsonb on the objective so cards render
    complete (per "leave the rest with mock if needed").
- S2: The existing "New Objective" button (`FocusHeaderActions`) opens a modal (shadcn `Dialog`)
  with the create form: Title (required), Category (required), Priority label (optional).
- S3: Each card exposes an edit affordance (pencil icon on the card header) opening the same
  modal prefilled; delete is a destructive button in the edit dialog footer.
- S4: Data is global — no user_id, no per-user queries, RLS `using (true)` mirroring books.
  Mutating actions keep `requireUser()` as first line per `src/app/AGENTS.md` mandate
  (books pattern). Consequence disclosed to user: local sign-in required to mutate.
- S5: The 3 current mock cards move to `supabase/seed.sql` as reference data (distinct
  created_at preserving design order); `mock-data.ts` keeps types + helpers, drops
  `INITIAL_OBJECTIVES`.
- S6: Read path follows TTB (`src/app/AGENTS.md`): `page.tsx` composes the static shell;
  objectives are fetched inside a Suspense-bound server child, not awaited at the top.

## Tasks

- [x] T1 — Migration `create_objectives` (RLS like books, update/delete policies added) + seed 3
      reference objectives + `pnpm supabase:reset` + `pnpm supabase:gen-types`.
      Route: inline. S1 S4 S5. Commit `14c6d76`. Done.
- [x] T2 — Domain: `objective.entity.ts` (Objective + invariants), `objective.schema.ts`
      (zod, source of truth), errors `ObjectiveNotFoundError`/`InvalidObjectiveError`.
      Route: inline. S1. Commit `615849e`. Done.
- [x] T3 — Use-cases: create/get/update/delete-objective + unit tests RED→GREEN (RED observed:
      4 failed on missing modules; GREEN: 5 passed). Route: inline. S1. Commit `a7faf3d`. Done.
- [x] T4 — Infra: objective row types, `objective.mapper` (+ test, caught a camelCase/snake_case
      key bug), 4 supabase repositories. Route: inline. S1. Commit `7e4091c`. Done.
- [x] T5 — Container: `objectives.container.ts` exposing create/getObjectives/update/remove.
      Route: inline. S1. Commit `56b9904`. Done.
- [x] T6 — Delivery: `src/app/queries.ts`, `src/app/actions.ts` (requireUser first, safeParse
      DTOs, revalidatePath("/")), `objective-defaults.ts`. Route: inline. S1 S4. Commit `143e172`. Done.
- [x] T7 — UI: dialog types, `FocusObjectiveDialogForm`, `FocusObjectiveFormFields`,
      `FocusObjectiveFormDialog`, `FocusObjectivePendingButton`, `FocusObjectiveDeleteForm`,
      `FocusObjectiveBoard`, `FocusObjectiveEmptyState`, `FocusWorkspaceDialog`,
      `FocusObjectivesSection` (Suspense child) + `FocusWorkspaceSkeleton`,
      edit pencil on card header, `useFocusDashboard(initialObjectives)` with server-sync effect,
      `page.tsx` Suspense shell, `mock-data.ts` drops `INITIAL_OBJECTIVES`.
      Route: inline. S1 S2 S3 S6. Commit `eb4a784`. Done.
- [x] T8 — Checks: typecheck ✓, lint ✓ (after biome fixes + 50-line split of FocusWorkspace),
      build ✓ (with env; `/` now dynamic), unit 22/22 ✓, E2E 4/4 ✓ (after fixing a strict-mode
      locator in the test), full Playwright suite 16/16 ✓, server-render spot check ✓.
      Route: inline. S1-S6. Commits `cd96bd1` + earlier. Done.
- [ ] T9 — Single PR (work-unit commits), Trello card: append PR link, move to Done. Route: inline. S1-S6

## Verification evidence

- `pnpm typecheck` → No errors (exit 0).
- `pnpm lint` → `Checked 174 files ... No fixes applied` (exit 0).
- `pnpm build` (with env) → success; `/` listed as `ƒ (Dynamic)`, shell static.
- `pnpm test:unit` → 11 files / 22 tests passed (5 objective use-case + 4 mapper + 13 existing).
- `pnpm test` (Playwright, full suite) → 16/16 passed incl. new `tests/objectives.test.ts`
  (public read, authenticated create via modal, edit, delete) against local Supabase.
- `pnpm start` spot check → SSR HTML contains all 3 seeded objectives in design order
  (Deep Work → Physical Vitality → Craft & Creative Mastery) + New Objective button.

## RDD assessment

- After commit `14c6d76`: `risk: medium`, `review_due: false` (`under_budget`).
- After final commit range (base `main`): `risk: medium` (executable_change: `src/app/actions.ts`),
  `review_due: false` (`under_budget`); candidate stays pending in the slice for PR-time review.

## Log

- L1 (2026-10-14, verbatim): "I've left three tickets in trello, pick them in order"
- L2 (2026-10-14, verbatim): "I'm not going to deploy this app, so there is no needed for user I
  think" → no user scoping: no user_id, global RLS; actions keep `requireUser()` per repo mandate
  (books pattern), disclosed to user as requiring local sign-in to mutate.
- L3 (2026-10-14): user chose "Single PR (Recommended)" for ticket 1 delivery.
- L4 (2026-10-14): Implementation followed books pattern layer by layer; habits/segments stored
  as seeded jsonb (per S1 "leave the rest with mock"); toggles + quick-ingest stay ephemeral
  (disclosed). E2E create/edit/delete run as authenticated user per S4.