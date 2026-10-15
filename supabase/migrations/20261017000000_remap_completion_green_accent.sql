-- Accent colours must never collide with the completion green, or an open habit
-- circle looks like a completed one. Remap objectives already carrying it.
update public.objectives
set accent_color = '#d98218'
where lower(trim(accent_color)) = '#15803d';
