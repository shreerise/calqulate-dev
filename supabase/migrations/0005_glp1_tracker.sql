-- Calqulate Vitals — GLP-1 Tracker (Phase 1 foundation)
-- Run AFTER 0001..0004. Durable, versioned, soft-deletable tables that back the
-- "never lose your data" promise and form the mobile-ready persistence contract.
--
-- Every table carries: id, user_id, created_at, updated_at, version, deleted_at.
--   • version + updated_at are auto-maintained by the touch_glp1_row() trigger.
--   • deleted_at is a SOFT delete (restore-able); rows are never hard-deleted by the app.

-- ── 0. Shared trigger: bump version + updated_at on every UPDATE ───────────────
create or replace function public.touch_glp1_row()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  new.version := coalesce(old.version, 0) + 1;
  return new;
end;
$$;

-- ── 1. Medications ─────────────────────────────────────────────────────────────
create table if not exists public.glp1_medications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  compound text not null,
  brand_name text,
  source text not null default 'branded',
  concentration_mg_per_ml numeric,
  dose_interval_hours int not null default 168,
  start_date date not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 2. Progress photos (object-storage refs only) ─────────────────────────────
create table if not exists public.glp1_photos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at timestamptz not null,
  storage_key text not null,
  caption text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 3. Dose logs ───────────────────────────────────────────────────────────────
create table if not exists public.glp1_dose_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  medication_id uuid references public.glp1_medications(id) on delete set null,
  taken_at timestamptz not null,
  amount_mg numeric not null,
  injection_site text,
  skipped boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 4. Weight logs (decimal precision preserved) ──────────────────────────────
create table if not exists public.glp1_weight_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at timestamptz not null,
  weight_kg numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 5. Body composition (fat vs lean) ─────────────────────────────────────────
create table if not exists public.glp1_body_composition (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at timestamptz not null,
  weight_kg numeric not null,
  body_fat_pct numeric not null,
  fat_mass_kg numeric,
  lean_mass_kg numeric,
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 6. Food logs (protein & fiber first) ──────────────────────────────────────
create table if not exists public.glp1_food_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz not null,
  label text not null,
  protein_g numeric not null,
  fiber_g numeric not null,
  calories numeric,
  carbs_g numeric,
  fat_g numeric,
  photo_id uuid references public.glp1_photos(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 7. Water logs ──────────────────────────────────────────────────────────────
create table if not exists public.glp1_water_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz not null,
  volume_ml numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 8. Side effects (severity AND "no symptoms today") ────────────────────────
create table if not exists public.glp1_side_effects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz not null,
  no_symptoms boolean not null default false,
  type text,
  severity int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 9. Daily check-ins (mood/energy/craving/sleep) ────────────────────────────
create table if not exists public.glp1_checkins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz not null,
  mood int,
  energy int,
  craving int,
  sleep_hours numeric,
  bowel_movements int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 10. Lab / biomarker results ───────────────────────────────────────────────
create table if not exists public.glp1_lab_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at timestamptz not null,
  type text not null,
  value numeric not null,
  unit text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 11. Exercise logs (resistance-training emphasis) ──────────────────────────
create table if not exists public.glp1_exercise_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz not null,
  type text not null,
  label text not null,
  duration_min numeric,
  sets int,
  reps int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── 12. Reminders ──────────────────────────────────────────────────────────────
create table if not exists public.glp1_reminders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  schedule text not null,
  enabled boolean not null default true,
  channel text[] not null default array['web-push'],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- ── Indexes, triggers, RLS (owner-only + admin read) for every table ──────────
do $$
declare t text;
declare has_admin boolean;
begin
  -- The admin-read policy needs public.is_admin() from 0002_admin.sql. If 0002
  -- hasn't been run, still create the (critical) owner-only policy and just skip
  -- the optional admin-read one — so this migration is self-sufficient.
  select exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'is_admin'
  ) into has_admin;

  foreach t in array array[
    'glp1_medications','glp1_photos','glp1_dose_logs','glp1_weight_logs',
    'glp1_body_composition','glp1_food_logs','glp1_water_logs','glp1_side_effects',
    'glp1_checkins','glp1_lab_results','glp1_exercise_logs','glp1_reminders'
  ]
  loop
    -- per-user, newest-first listing
    execute format(
      'create index if not exists %1$s_user_created_idx on public.%1$s(user_id, created_at desc);', t);

    -- version/updated_at auto-bump on UPDATE
    execute format('drop trigger if exists touch_%1$s on public.%1$s;', t);
    execute format(
      'create trigger touch_%1$s before update on public.%1$s
         for each row execute function public.touch_glp1_row();', t);

    -- RLS: owners do everything to their own row (non-deleted handled in app).
    execute format('alter table public.%I enable row level security;', t);
    execute format($f$
      drop policy if exists "own_all" on public.%1$s;
      create policy "own_all" on public.%1$s for all
        using ( user_id = auth.uid() )
        with check ( user_id = auth.uid() );
    $f$, t);

    -- Optional admin read-all (only if the is_admin() helper exists).
    if has_admin then
      execute format($f$
        drop policy if exists "admin_read_all" on public.%1$s;
        create policy "admin_read_all" on public.%1$s for select using (public.is_admin());
      $f$, t);
    end if;
  end loop;
end $$;

-- Useful secondary indexes for time-series queries
create index if not exists glp1_dose_logs_taken_idx on public.glp1_dose_logs(user_id, taken_at desc);
create index if not exists glp1_weight_logs_taken_idx on public.glp1_weight_logs(user_id, taken_at desc);
create index if not exists glp1_body_comp_taken_idx on public.glp1_body_composition(user_id, taken_at desc);
create index if not exists glp1_lab_results_taken_idx on public.glp1_lab_results(user_id, type, taken_at desc);
