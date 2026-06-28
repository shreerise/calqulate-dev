-- Calqulate Vitals — GLP-1 dose reminders (Phase 1)
-- Extends glp1_reminders so a reminder can target a medication, fire ahead of the
-- due time, and de-duplicate sends. The due time itself is COMPUTED in the cron
-- from the medication + latest dose (never a stale stored schedule), so it can't drift.

alter table public.glp1_reminders
  add column if not exists medication_id uuid references public.glp1_medications(id) on delete cascade,
  add column if not exists lead_minutes int not null default 0,
  add column if not exists last_fired_at timestamptz;

-- Cron scan: enabled, non-deleted dose reminders.
create index if not exists glp1_reminders_dose_idx
  on public.glp1_reminders(kind, enabled)
  where deleted_at is null;
