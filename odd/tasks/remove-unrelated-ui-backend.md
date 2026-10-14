# Remove unrelated UI and back-end — Trello "Clean up"

Objective: remove every UI and back-end module that is not part of the actual Focus OS habit
tracker. Branch `refactor/remove-unrelated-ui-backend`, single PR (established preference),
unit runner `pnpm test:unit`, checks `pnpm typecheck && pnpm lint && pnpm build` + full Playwright.

## Specs

- S1 (ticket, verbatim): "Please remove all the ui and back-end logic that isn't related to the
  actual app"
  - Actual app = Focus OS habit tracker at `/` + the auth backend it uses (signin, magic link,
    OAuth, callback) + shared infrastructure (env, supabase clients, Sentry, shadcn kit).
  - Remove: books demo feature (all layers incl. table migration + seed rows + E2E test),
    `/dashboard` starter route (page, actions, SignOutButton) + its E2E test, stale README
    references to books, stale Mailpit/port claims in docs/supabase.md.
  - Keep: auth use-cases/container incl. sign-out (cohesive auth aggregate; sign-out becomes
    unwired after /dashboard removal — wiring it is new UI, out of scope, disclosed).
  - Keep: shadcn kit components (file-dropzone etc.) — generic primitives, not app logic.
- S2: `drop table public.books` via new migration; regenerate `database.types.ts`; seed.sql loses
  the books inserts. Data loss is local seed data only — explicitly requested removal.
- S3: proxy.ts adapts: protection prefix list empties; signed-in users hitting `/signin` are
  redirected to `/` instead of the removed `/dashboard`.

## Tasks

- [x] T1 — Migration `drop_books` + seed.sql cleanup + `pnpm supabase:reset` + gen-types
      (books=0 matches, objectives intact). Route: inline. S1 S2. Commit `53f4a8e`. Done.
- [x] T2 — Deleted books feature code: route, use-cases, domain entity/schema/Book errors,
      infra row types/mapper/test/repositories, container, tests/books.test.ts (628 lines).
      Route: inline. S1. Commit `7e3f699`. Done.
- [x] T3 — Removed /dashboard route + adapted src/proxy.ts (empty protection list, signed-in
      /signin → HOME_PATH "/") + auth.server DASHBOARD_PATH → HOME_PATH + callback redirect
      home + auth use-case tests + tests/signin.test.ts updated, tests/dashboard.test.ts
      deleted. Route: inline. S1 S3. Commit `37e1739`. Done.
- [x] T4 — Docs: README books tree lines removed, docs/supabase.md Mailpit claim now points
      at `supabase status` MAILPIT_URL. Route: inline. S1. Commit `8fdd38c`. Done.
- [x] T5 — Checks: typecheck ✓ (after stale .next rebuild), lint ✓ (143 files), build ✓
      (routes: `/`, `/auth/callback`, `/signin` only), unit 8 files/14 tests ✓,
      full Playwright 11/11 ✓ (books 2 + dashboard 3 tests removed with their features).
      Route: inline. S1-S3. Done.
- [ ] T6 — Independent verification (Risk: item 1 — table drop) + PR + Trello Done. Route: inline. S1

## Log

- L1 (2026-10-14, verbatim): "I've left three tickets in trello, pick them in order"
- L2 (2026-10-14, verbatim, ticket 2 description): "Please remove all the ui and back-end logic
  that isn't related to the actual app"
- L3 (2026-10-14): PR #2 merged to main first (user: "Merge it") to avoid seed.sql conflicts;
  main at 9ca9704.
- L4 (2026-10-14): docs/supabase.md Mailpit URL (55324) stale — live stack serves Mailpit at
  56325 per `supabase status`; user confirmed 55324 dead ("That link doesn't work").