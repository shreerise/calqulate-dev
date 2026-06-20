-- Calqulate Vitals — initial schema
-- Postgres / Supabase. Run in the Supabase SQL editor or via the CLI.
-- All health data is row-level-secured to the owning user.

create extension if not exists "uuid-ossp";

-- 1. Profiles (1:1 with auth.users) -----------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  sex text check (sex in ('male','female')),
  race text,
  dob date,
  state text,
  glp1_flag boolean default false,
  created_at timestamptz default now(),
  deleted_at timestamptz
);

-- 2. Subscriptions (mirrors Stripe via webhook) -----------------------------
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  tier text not null default 'free' check (tier in ('free','plus','pro')),
  status text not null default 'inactive',
  current_period_end timestamptz,
  updated_at timestamptz default now()
);
create unique index if not exists subscriptions_user_idx on public.subscriptions(user_id);

-- 3. Measurements (append-only time series — the core asset) -----------------
create table if not exists public.measurements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at timestamptz not null default now(),
  -- raw inputs
  age int,
  sex text,
  race text,
  height_cm numeric,
  weight_kg numeric,
  waist_cm numeric,
  hip_cm numeric,
  neck_cm numeric,
  systolic_bp int,
  diastolic_bp int,
  on_bp_meds boolean default false,
  smoker boolean default false,
  diabetes boolean default false,
  family_diabetes boolean default false,
  physically_active boolean default false,
  eats_vegetables_daily boolean default false,
  total_cholesterol numeric,
  hdl numeric,
  ldl numeric,
  a1c numeric,
  high_glucose_history boolean default false,
  created_at timestamptz default now()
);
create index if not exists measurements_user_taken_idx on public.measurements(user_id, taken_at desc);

-- 4. Risk results (computed report snapshot per measurement) -----------------
create table if not exists public.risk_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  measurement_id uuid not null references public.measurements(id) on delete cascade,
  composite_score int,
  composite_grade text,
  ascvd_percent numeric,
  heart_age int,
  heart_age_delta int,
  diabetes_percent numeric,
  report_json jsonb not null,
  computed_at timestamptz default now()
);
create index if not exists risk_results_user_idx on public.risk_results(user_id, computed_at desc);

-- 5. Reports (doctor-shareable PDF exports) ----------------------------------
create table if not exists public.reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_url text,
  generated_at timestamptz default now()
);

-- 6. Reminders ---------------------------------------------------------------
create table if not exists public.reminders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  due_at timestamptz not null,
  sent_at timestamptz,
  channel text default 'email'
);

-- Row Level Security ---------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.subscriptions enable row level security;
alter table public.measurements  enable row level security;
alter table public.risk_results  enable row level security;
alter table public.reports       enable row level security;
alter table public.reminders     enable row level security;

-- Helper: owner-only policies
do $$
declare t text;
begin
  foreach t in array array['profiles','subscriptions','measurements','risk_results','reports','reminders']
  loop
    execute format($f$
      drop policy if exists "own_select" on public.%1$s;
      create policy "own_select" on public.%1$s for select using (
        (case when '%1$s' = 'profiles' then id else user_id end) = auth.uid()
      );
      drop policy if exists "own_modify" on public.%1$s;
      create policy "own_modify" on public.%1$s for all using (
        (case when '%1$s' = 'profiles' then id else user_id end) = auth.uid()
      ) with check (
        (case when '%1$s' = 'profiles' then id else user_id end) = auth.uid()
      );
    $f$, t);
  end loop;
end $$;

-- Auto-create a profile + free subscription on signup -----------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
    on conflict (id) do nothing;
  insert into public.subscriptions (user_id, tier, status) values (new.id, 'free', 'active')
    on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
