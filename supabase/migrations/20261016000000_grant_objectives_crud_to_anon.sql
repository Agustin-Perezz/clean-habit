-- Local-only app: no user accounts are used, so anonymous CRUD must be allowed.
-- Mirrors the read policy: RLS policies already permit everyone; this grant
-- removes the authenticated-only restriction on writes.
grant insert, update, delete on public.objectives to anon;