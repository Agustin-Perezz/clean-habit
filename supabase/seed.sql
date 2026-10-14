-- Seed data for local development and tests.
-- Runs after migrations on `supabase db reset` (see config.toml [db.seed]).
-- Keep this minimal: reference data only, not test fixtures.

insert into public.books (title, author) values
  ('The Pragmatic Programmer', 'David Thomas'),
  ('Clean Architecture', 'Robert C. Martin'),
  ('Refactoring', 'Martin Fowler')
on conflict do nothing;

-- Focus OS reference objectives (created_at offsets keep the design order under
-- created_at-desc reads: Deep Work, Physical Vitality, Craft Mastery).
insert into public.objectives (title, category, priority_label, accent_color, segments, habits, created_at) values
  (
    'Deep Work & Focus',
    'Cognitive Discipline',
    'Priority',
    '#d98218',
    '["#22c55e", "#facc15", "#f59e0b", "#f97316", "#e5e5ea", "#e5e5ea"]'::jsonb,
    '[
      {"id": "deep-work-1", "title": "Morning 90-min uninterrupted code sprint", "completed": true, "points": 1},
      {"id": "deep-work-2", "title": "Zero-inbox sweep & asynchronous triage", "completed": true, "points": 1},
      {"id": "deep-work-3", "title": "Literature & systems design review (45m)", "completed": true, "points": 1},
      {"id": "deep-work-4", "title": "Evening offline reflection & shutdown protocol", "completed": false, "points": 1}
    ]'::jsonb,
    now()
  ),
  (
    'Physical Vitality & Endurance',
    'Health & Longevity',
    'Vitality',
    '#FF9F0A',
    '["#22c55e", "#facc15", "#f59e0b", "#f97316", "#e5e5ea", "#e5e5ea"]'::jsonb,
    '[
      {"id": "physical-vitality-1", "title": "Zone 2 aerobic cardio / 45-minute trail run", "completed": true, "points": 1},
      {"id": "physical-vitality-2", "title": "Optimal hydration intake (3.0 Liters water)", "completed": true, "points": 1},
      {"id": "physical-vitality-3", "title": "Full-body mobility routine & cold recovery", "completed": false, "points": 1}
    ]'::jsonb,
    now() - interval '1 day'
  ),
  (
    'Craft & Creative Mastery',
    'Skill Acquisition',
    null,
    '#5856D6',
    '["#22c55e", "#facc15", "#e5e5ea", "#e5e5ea", "#e5e5ea", "#e5e5ea"]'::jsonb,
    '[
      {"id": "craft-mastery-1", "title": "Apple HIG interactive prototype exploration", "completed": true, "points": 1},
      {"id": "craft-mastery-2", "title": "Type specimen typography pairing exercises", "completed": false, "points": 1},
      {"id": "craft-mastery-3", "title": "Write concise product critique memo", "completed": false, "points": 1}
    ]'::jsonb,
    now() - interval '2 days'
  )
on conflict do nothing;