-- ============================================================================
-- Make recommendations public immediately (no approval / no authentication).
-- ============================================================================
-- Visitors submit a recommendation and it is shown right away. No admin/login
-- flow exists for this feature. This migration runs on top of the original
-- create_recommendations migration and removes the moderation/authenticated
-- pieces that were added previously.
-- ----------------------------------------------------------------------------

-- New recommendations are public by default (displayed immediately).
alter table public.recommendations
  alter column approved set default true;

-- Remove the authenticated/admin moderation policies (no auth is used).
drop policy if exists "authenticated_select_all_recommendations" on public.recommendations;
drop policy if exists "authenticated_update_recommendations" on public.recommendations;
drop policy if exists "authenticated_delete_recommendations" on public.recommendations;

-- Revoke the write privileges that only existed for the old mod role.
revoke update, delete on public.recommendations from authenticated;

-- Ensure any rows already stored as unapproved (approved = false) are treated
-- as public too, so previously submitted recommendations still show up.
update public.recommendations
  set approved = true
  where approved = false;