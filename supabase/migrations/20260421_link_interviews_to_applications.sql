alter table public.interviews
  add column if not exists application_id uuid references public.applications(id) on delete set null;

create index if not exists interviews_application_id_idx
  on public.interviews(application_id);
