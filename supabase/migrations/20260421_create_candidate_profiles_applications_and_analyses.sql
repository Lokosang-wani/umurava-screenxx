do $$
begin
  if not exists (
    select 1 from pg_type where typname = 'application_status'
  ) then
    create type public.application_status as enum (
      'submitted',
      'analyzed',
      'interview',
      'hired',
      'rejected'
    );
  end if;
end
$$;

create table if not exists public.candidate_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  age integer,
  address text,
  default_cv_text text,
  default_cv_file_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  candidate_profile_id uuid not null references public.candidate_profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  cv_text text,
  cv_file_url text,
  status public.application_status not null default 'submitted',
  created_at timestamptz not null default timezone('utc', now()),
  unique (candidate_profile_id, job_id)
);

create table if not exists public.application_analyses (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique references public.applications(id) on delete cascade,
  match_score integer check (match_score between 0 and 100),
  potential_score integer check (potential_score between 0 and 100),
  decision public.candidate_decision,
  strengths text[] not null default '{}',
  weaknesses text[] not null default '{}',
  explanation text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists candidate_profiles_user_id_idx
  on public.candidate_profiles(user_id);

create index if not exists applications_candidate_profile_id_idx
  on public.applications(candidate_profile_id);

create index if not exists applications_job_id_idx
  on public.applications(job_id);

create index if not exists applications_status_idx
  on public.applications(status);

create index if not exists application_analyses_application_id_idx
  on public.application_analyses(application_id);

alter table public.candidate_profiles enable row level security;
alter table public.applications enable row level security;
alter table public.application_analyses enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'candidate_profiles'
      and policyname = 'candidate_profiles_select_own'
  ) then
    create policy candidate_profiles_select_own
      on public.candidate_profiles
      for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'candidate_profiles'
      and policyname = 'candidate_profiles_insert_own'
  ) then
    create policy candidate_profiles_insert_own
      on public.candidate_profiles
      for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'candidate_profiles'
      and policyname = 'candidate_profiles_update_own'
  ) then
    create policy candidate_profiles_update_own
      on public.candidate_profiles
      for update
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'applications'
      and policyname = 'applications_select_own'
  ) then
    create policy applications_select_own
      on public.applications
      for select
      using (
        exists (
          select 1
          from public.candidate_profiles
          where candidate_profiles.id = applications.candidate_profile_id
            and candidate_profiles.user_id = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'applications'
      and policyname = 'applications_insert_own'
  ) then
    create policy applications_insert_own
      on public.applications
      for insert
      with check (
        exists (
          select 1
          from public.candidate_profiles
          where candidate_profiles.id = applications.candidate_profile_id
            and candidate_profiles.user_id = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'applications'
      and policyname = 'applications_select_for_job_owner'
  ) then
    create policy applications_select_for_job_owner
      on public.applications
      for select
      using (
        exists (
          select 1
          from public.jobs
          where jobs.id = applications.job_id
            and jobs.created_by = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'applications'
      and policyname = 'applications_update_for_job_owner'
  ) then
    create policy applications_update_for_job_owner
      on public.applications
      for update
      using (
        exists (
          select 1
          from public.jobs
          where jobs.id = applications.job_id
            and jobs.created_by = auth.uid()
        )
      )
      with check (
        exists (
          select 1
          from public.jobs
          where jobs.id = applications.job_id
            and jobs.created_by = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'application_analyses'
      and policyname = 'application_analyses_select_own'
  ) then
    create policy application_analyses_select_own
      on public.application_analyses
      for select
      using (
        exists (
          select 1
          from public.applications
          join public.candidate_profiles
            on candidate_profiles.id = applications.candidate_profile_id
          where applications.id = application_analyses.application_id
            and candidate_profiles.user_id = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'application_analyses'
      and policyname = 'application_analyses_select_for_job_owner'
  ) then
    create policy application_analyses_select_for_job_owner
      on public.application_analyses
      for select
      using (
        exists (
          select 1
          from public.applications
          join public.jobs on jobs.id = applications.job_id
          where applications.id = application_analyses.application_id
            and jobs.created_by = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'application_analyses'
      and policyname = 'application_analyses_insert_for_job_owner'
  ) then
    create policy application_analyses_insert_for_job_owner
      on public.application_analyses
      for insert
      with check (
        exists (
          select 1
          from public.applications
          join public.jobs on jobs.id = applications.job_id
          where applications.id = application_analyses.application_id
            and jobs.created_by = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'application_analyses'
      and policyname = 'application_analyses_update_for_job_owner'
  ) then
    create policy application_analyses_update_for_job_owner
      on public.application_analyses
      for update
      using (
        exists (
          select 1
          from public.applications
          join public.jobs on jobs.id = applications.job_id
          where applications.id = application_analyses.application_id
            and jobs.created_by = auth.uid()
        )
      )
      with check (
        exists (
          select 1
          from public.applications
          join public.jobs on jobs.id = applications.job_id
          where applications.id = application_analyses.application_id
            and jobs.created_by = auth.uid()
        )
      );
  end if;
end
$$;
