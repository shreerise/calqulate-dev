-- Remove the "plus" tier — only "free" and "pro" remain.
-- Existing plus subscribers are upgraded to pro so they don't lose access.

update subscriptions
set tier = 'pro'
where tier = 'plus';

-- The old check allowed ('free','plus','pro') — drop and recreate.
alter table subscriptions
  drop constraint if exists subscriptions_tier_check;

alter table subscriptions
  add constraint subscriptions_tier_check
  check (tier in ('free', 'pro'));
