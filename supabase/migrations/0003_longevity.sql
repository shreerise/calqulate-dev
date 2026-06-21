-- Calqulate Vitals v2 — longevity platform tables
-- Run AFTER 0001_init.sql and 0002_admin.sql.

-- 1. Health snapshots (rich longitudinal record) ----------------------------
create table if not exists public.health_snapshots (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  snapshot_date date not null default current_date,
  weight_kg numeric,
  waist_cm numeric,
  body_fat_pct numeric,
  bp_systolic int,
  bp_diastolic int,
  total_cholesterol numeric,
  hdl numeric,
  ldl numeric,
  triglycerides numeric,
  fasting_glucose numeric,
  hba1c numeric,
  vo2_max numeric,
  sleep_hours numeric,
  steps int,
  metabolic_score numeric,
  heart_age numeric,
  biological_age numeric,
  longevity_index numeric,
  data jsonb,
  created_at timestamptz default now()
);
create index if not exists health_snapshots_user_date_idx on public.health_snapshots(user_id, snapshot_date desc);

-- 2. GLP-1 protocols --------------------------------------------------------
create table if not exists public.glp1_protocols (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  medication text,
  start_date date,
  target_metabolic_score numeric,
  target_weight_kg numeric,
  status text default 'active',
  protocol_data jsonb,
  created_at timestamptz default now()
);

-- 3. Daily mission logs -----------------------------------------------------
create table if not exists public.daily_mission_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  adherence_score int,
  energy_level int,
  appetite_level int,
  side_effects jsonb,
  progress_photo text,
  notes text,
  created_at timestamptz default now()
);
create unique index if not exists daily_mission_logs_user_day_idx on public.daily_mission_logs(user_id, log_date);

-- 4. Trajectory simulations (cached Monte-Carlo runs) -----------------------
create table if not exists public.trajectory_simulations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  simulation_date timestamptz default now(),
  scenario text,
  months_ahead int,
  results jsonb,
  created_at timestamptz default now()
);
create index if not exists trajectory_sim_user_idx on public.trajectory_simulations(user_id, simulation_date desc);

-- 5. Push subscriptions + reminder prefs (for Phase 2 notifications) --------
create table if not exists public.push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  keys jsonb not null,
  created_at timestamptz default now(),
  unique (user_id, endpoint)
);
create table if not exists public.notification_prefs (
  user_id uuid primary key references auth.users(id) on delete cascade,
  push_enabled boolean default false,
  email_weekly boolean default true,
  updated_at timestamptz default now()
);

-- RLS (owner-only) + admin read ---------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'health_snapshots','glp1_protocols','daily_mission_logs',
    'trajectory_simulations','push_subscriptions','notification_prefs'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format($f$
      drop policy if exists "own_all" on public.%1$s;
      create policy "own_all" on public.%1$s for all
        using ( (case when '%1$s' = 'notification_prefs' then user_id else user_id end) = auth.uid() )
        with check ( (case when '%1$s' = 'notification_prefs' then user_id else user_id end) = auth.uid() );
      drop policy if exists "admin_read_all" on public.%1$s;
      create policy "admin_read_all" on public.%1$s for select using (public.is_admin());
    $f$, t);
  end loop;
end $$;
