alter table public.candidates
  add column if not exists strengths text[] not null default '{}',
  add column if not exists weaknesses text[] not null default '{}';
