alter table public.jobs
  add column if not exists is_published boolean not null default false;

create index if not exists jobs_is_published_idx on public.jobs(is_published);

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'jobs'
      and policyname = 'jobs_select_published_public'
  ) then
    create policy jobs_select_published_public
      on public.jobs
      for select
      using (is_published = true);
  end if;
end
$$;
