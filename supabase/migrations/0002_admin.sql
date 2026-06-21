-- Calqulate Vitals — admin / developer mode
-- Run in the Supabase SQL editor AFTER 0001_init.sql.

-- 1. Roles + suspension on profiles ----------------------------------------
alter table public.profiles
  add column if not exists role text not null default 'user' check (role in ('user','admin'));
alter table public.profiles
  add column if not exists suspended boolean not null default false;
alter table public.profiles
  add column if not exists last_seen_at timestamptz;

-- 2. is_admin() helper (security definer avoids RLS recursion) --------------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- 3. Let admins read every row on the core tables --------------------------
do $$
declare t text;
begin
  foreach t in array array['profiles','subscriptions','measurements','risk_results','reports','reminders']
  loop
    execute format($f$
      drop policy if exists "admin_read_all" on public.%1$s;
      create policy "admin_read_all" on public.%1$s for select using (public.is_admin());
    $f$, t);
  end loop;
end $$;

-- 4. Audit logs ------------------------------------------------------------
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references auth.users(id) on delete set null,
  admin_email text,
  action text not null,
  target text,
  meta jsonb,
  ip text,
  created_at timestamptz default now()
);
create index if not exists audit_logs_created_idx on public.audit_logs(created_at desc);
alter table public.audit_logs enable row level security;
drop policy if exists "audit_admin_read" on public.audit_logs;
create policy "audit_admin_read" on public.audit_logs for select using (public.is_admin());

-- 5. Site settings (key/value) ---------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "settings_admin_all" on public.site_settings;
create policy "settings_admin_all" on public.site_settings for all
  using (public.is_admin()) with check (public.is_admin());

-- 6. Make yourself admin (edit the email, then run) ------------------------
-- update public.profiles set role = 'admin' where email = 'meet@calqulate.net';
