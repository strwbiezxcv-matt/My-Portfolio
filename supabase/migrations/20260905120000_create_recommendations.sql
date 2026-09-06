-- ============================================================================
-- recommendations table + Row Level Security (public, NO authentication)
-- ============================================================================
-- Run this in your Supabase SQL Editor (or `supabase db push`) to persist
-- recommendations submitted through the portfolio.
--
-- Model:
--   * Visitors (anon) can INSERT a recommendation and SELECT the public ones.
--   * The frontend stores submissions with approved = true, so they appear
--     immediately on the right side — no login, no admin, no refresh needed.
--   * Visitors can NEVER update or delete any recommendation.
--   * Only the PUBLIC anon key is used by the frontend; no service-role key.
-- ----------------------------------------------------------------------------

create table if not exists public.recommendations (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  "from"     text not null default '',
  message    text not null,
  created_at timestamptz not null default now(),
  approved   boolean not null default true
);

-- New submissions are publicly visible by default (shown immediately).
alter table public.recommendations
  alter column approved set default true;

-- Table-level grants (PostgREST needs explicit grants per role).
-- anon and authenticated both get read + insert so the public form works even
-- if a browser happens to send an authenticated token.
grant select, insert on public.recommendations to anon, authenticated;

-- No write access beyond insert for anyone.
revoke update, delete on public.recommendations from anon, authenticated;

-- Enforce Row Level Security.
alter table public.recommendations enable row level security;

-- Drop any stale policies from earlier versions so this is idempotent.
drop policy if exists "anon_insert_recommendation" on public.recommendations;
drop policy if exists "anon_select_approved_recommendations" on public.recommendations;
drop policy if exists "authenticated_select_all_recommendations" on public.recommendations;
drop policy if exists "authenticated_update_recommendations" on public.recommendations;
drop policy if exists "authenticated_delete_recommendations" on public.recommendations;

-- Visitors can submit a recommendation (publicly).
create policy "anon_insert_recommendation"
  on public.recommendations
  for insert
  to anon, authenticated
  with check (true);

-- Visitors can only read recommendations that are meant to be public.
create policy "anon_select_approved_recommendations"
  on public.recommendations
  for select
  to anon, authenticated
  using (approved = true);