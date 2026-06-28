-- Calqulate Vitals — GLP-1 Phase 3 (refills/cost + multi-compound)
-- Run AFTER 0005 + 0006.

-- ── Multi-compound / peptide + TRT support on medications ─────────────────────
alter table public.glp1_medications
  add column if not exists kind text not null default 'glp1',
  add column if not exists custom_name text,
  alter column compound drop not null;

-- ── Refills / pharmacy + cost tracking ────────────────────────────────────────
create table if not exists public.glp1_refills (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  medication_id uuid references public.glp1_medications(id) on delete cascade,
  filled_date date not null,
  doses_supplied int not null,
  pharmacy text,
  copay_usd numeric,
  savings_card boolean not null default false,
  prior_auth_status text not null default 'none',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version int not null default 1,
  deleted_at timestamptz
);

-- Index + version trigger + RLS (owner-only + optional admin read), matching 0005.
do $$
declare has_admin boolean;
begin
  create index if not exists glp1_refills_user_created_idx on public.glp1_refills(user_id, created_at desc);
  create index if not exists glp1_refills_med_idx on public.glp1_refills(user_id, medication_id, filled_date desc);

  drop trigger if exists touch_glp1_refills on public.glp1_refills;
  create trigger touch_glp1_refills before update on public.glp1_refills
    for each row execute function public.touch_glp1_row();

  alter table public.glp1_refills enable row level security;
  drop policy if exists "own_all" on public.glp1_refills;
  create policy "own_all" on public.glp1_refills for all
    using ( user_id = auth.uid() ) with check ( user_id = auth.uid() );

  -- Optional admin read-all (only if public.is_admin() from 0002_admin.sql exists).
  select exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'is_admin'
  ) into has_admin;
  if has_admin then
    drop policy if exists "admin_read_all" on public.glp1_refills;
    create policy "admin_read_all" on public.glp1_refills for select using (public.is_admin());
  end if;
end $$;
