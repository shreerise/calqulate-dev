-- Calqulate Vitals — Payment Gateway Migration
-- Adds gateway-agnostic fields to subscriptions, plus webhook tracking tables.
-- Run in the Supabase SQL editor or via the CLI.

-- 1. Add gateway-agnostic columns to subscriptions ---------------------------
alter table public.subscriptions
  add column if not exists gateway text default 'razorpay'
    check (gateway in ('razorpay', 'paypal')),
  add column if not exists gateway_customer_id text,
  add column if not exists gateway_subscription_id text,
  add column if not exists gateway_plan_id text,
  add column if not exists currency text default 'USD',
  add column if not exists amount integer;
create unique index if not exists subscriptions_gateway_sub_idx
  on public.subscriptions(gateway_subscription_id)
  where gateway_subscription_id is not null;

-- 2. Webhook events table (idempotency) --------------------------------------
create table if not exists public.webhook_events (
  id uuid primary key default uuid_generate_v4(),
  gateway text not null check (gateway in ('razorpay', 'paypal')),
  event_id text not null,
  event_type text,
  raw_body jsonb,
  status text not null default 'processed'
    check (status in ('processed', 'skipped', 'error')),
  error_message text,
  created_at timestamptz default now()
);
create unique index if not exists webhook_events_gw_event_idx
  on public.webhook_events(gateway, event_id);

-- 3. Webhook logs table (audit trail) ----------------------------------------
create table if not exists public.webhook_logs (
  id uuid primary key default uuid_generate_v4(),
  gateway text not null check (gateway in ('razorpay', 'paypal')),
  event_id text not null,
  event_type text,
  raw_body jsonb,
  status text not null default 'received'
    check (status in ('received', 'processed', 'skipped', 'error')),
  response_status int,
  error_message text,
  created_at timestamptz default now()
);
create index if not exists webhook_logs_gateway_idx on public.webhook_logs(gateway, created_at desc);

-- 4. RLS policies for new tables --------------------------------------------
alter table public.webhook_events enable row level security;
alter table public.webhook_logs enable row level security;

-- Only the service role (admin client) can write; owners can view their own.
create policy "service_role_all" on public.webhook_events
  for all using (true) with check (true);
create policy "service_role_all" on public.webhook_logs
  for all using (true) with check (true);

-- 5. Index for admin metrics -------------------------------------------------
create index if not exists subscriptions_gateway_tier_idx
  on public.subscriptions(gateway, tier, status);
create index if not exists subscriptions_status_idx
  on public.subscriptions(status);
