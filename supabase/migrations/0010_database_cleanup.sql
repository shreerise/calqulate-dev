-- Clean up Stripe remnants and stale schema after migrating to Razorpay + PayPal.
-- Safe to run on any database (uses IF EXISTS / column checks).

-- 1. Remove Stripe columns from subscriptions (replaced by gateway_* columns added in 0008)
alter table public.subscriptions
  drop column if exists stripe_customer_id,
  drop column if exists stripe_subscription_id;

-- 2. Drop the old comment (migration 0001 said "mirrors Stripe")
comment on table public.subscriptions is 'User subscription tiers, synced via payment gateway webhooks';
