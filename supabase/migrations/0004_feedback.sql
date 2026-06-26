-- Calqulate Vitals — feedback popup + email capture
-- Run AFTER 0001_init.sql, 0002_admin.sql, 0003_longevity.sql.
-- Inserts happen server-side with the service-role key (bypasses RLS), so there
-- are intentionally NO public insert policies here.

-- 1. Feedback submissions (from the sitewide 60s popup) ----------------------
create table if not exists public.feedback (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  message text not null,
  source_url text,
  user_agent text,
  user_id uuid references auth.users(id) on delete set null,
  welcome_email_sent boolean default false,
  created_at timestamptz default now()
);
create index if not exists feedback_created_idx on public.feedback(created_at desc);

-- 2. Email unsubscribe list (honored by future manual update campaigns) ------
create table if not exists public.email_unsubscribes (
  email text primary key,
  reason text,
  created_at timestamptz default now()
);

-- RLS: nobody can write through the API (service role bypasses RLS and is the
-- only writer). Admin read policies are added only if the is_admin() helper from
-- 0002_admin.sql exists, so this migration runs cleanly on its own.
alter table public.feedback enable row level security;
alter table public.email_unsubscribes enable row level security;

do $$
begin
  if exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'is_admin'
  ) then
    drop policy if exists "admin_read_feedback" on public.feedback;
    create policy "admin_read_feedback" on public.feedback for select using (public.is_admin());

    drop policy if exists "admin_read_unsub" on public.email_unsubscribes;
    create policy "admin_read_unsub" on public.email_unsubscribes for select using (public.is_admin());
  else
    raise notice 'public.is_admin() not found — skipping admin read policies. Run 0002_admin.sql, then re-run this file to add them.';
  end if;
end $$;
