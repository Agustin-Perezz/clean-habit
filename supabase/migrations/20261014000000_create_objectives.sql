create table if not exists public.objectives (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  priority_label text,
  accent_color text not null,
  segments jsonb not null default '[]'::jsonb,
  habits jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.objectives enable row level security;

create policy "Anyone can read objectives"
  on public.objectives
  for select
  using (true);

create policy "Anyone can insert objectives"
  on public.objectives
  for insert
  with check (true);

create policy "Anyone can update objectives"
  on public.objectives
  for update
  using (true)
  with check (true);

create policy "Anyone can delete objectives"
  on public.objectives
  for delete
  using (true);

grant select on public.objectives to anon;
grant select, insert, update, delete on public.objectives to authenticated;
grant select, insert, update, delete on public.objectives to service_role;