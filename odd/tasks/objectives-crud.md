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

- [ ] T1 — Migration `create_objectives` (RLS like books, update/delete policies added) + seed 3
      reference objectives + `pnpm supabase:reset` + `pnpm supabase:gen-types`. Route: inline. S1 S4 S5
- [ ] T2 — Domain: `objective.entity.ts` (Objective + invariants), `objective.schema.ts`
      (zod, source of truth), errors `ObjectiveNotFoundError`/`InvalidObjectiveError`. Route: inline. S1
- [ ] T3 — Use-cases: create/get/update/delete-objective (request dto, response dto, repository
      interface, use-case each) + unit tests RED→GREEN. Route: inline. S1
- [ ] T4 — Infra: objective row types, `objective.mapper` (+ test), 4 supabase repositories
      (one per interface, flat `repositories/objectives/`). Route: inline. S1
- [ ] T5 — Container: `objectives.container.ts` exposing create/getObjectives/update/remove. Route: inline. S1
- [ ] T6 — Delivery: `src/app/queries.ts` (`getObjectives`), `src/app/actions.ts`
      (create/update/delete, `requireUser()` first, DTO parse, revalidatePath("/")). Route: inline. S1 S4
- [ ] T7 — UI: `focus-objective-defaults.ts` (accent palette, segment template, default habits,
      form field constants), dialog types, `FocusObjectiveFormDialog` + `FocusObjectiveFormFields`
      + `FocusObjectiveDeleteForm`, `FocusHeaderActions` button wiring, card edit affordance,
      objective empty state, `useFocusDashboard(initialObjectives)` (server data + effect sync),
      `page.tsx` + Suspense section + skeleton. Route: inline. S1 S2 S3 S6
- [ ] T8 — Checks: `pnpm typecheck`, `pnpm lint`, `pnpm build` (with env), `pnpm test:unit`;
      fix fallout. Route: inline. S1-S6
- [ ] T9 — Single PR (work-unit commits), Trello card: append PR link, move to Done. Route: inline. S1-S6

## Log

- L1 (2026-10-14, verbatim): "I've left three tickets in trello, pick them in order"
- L2 (2026-10-14, verbatim): "I'm not going to deploy this app, so there is no needed for user I
  think" → no user scoping: no user_id, global RLS; actions keep `requireUser()` per repo mandate
  (books pattern), disclosed to user as requiring local sign-in to mutate.
- L3 (2026-10-14): user chose "Single PR (Recommended)" for ticket 1 delivery.