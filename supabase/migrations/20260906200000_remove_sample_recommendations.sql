-- ============================================================================
-- Remove the 3 sample/anonymous recommendation records
-- ============================================================================
-- The original migration seeded three placeholder recommendations:
--   * Juan Dela Cruz / Easecore
--   * Maria Santos / ICPEP
--   * Carlo Reyes / Mentor
--
-- These are NOT real visitor recommendations and should not appear publicly.
-- This migration deletes ONLY those exact sample rows (matched by name + "from"
-- + message). Real recommendations submitted by visitors are never touched.
--
-- Run this in your Supabase SQL Editor. It is safe to run more than once.
-- ----------------------------------------------------------------------------

delete from public.recommendations
where
  (name = 'Juan Dela Cruz' and "from" = 'Easecore' and message = 'Very creative and easy to work with. Great attention to detail on every deliverable.')
  or (name = 'Maria Santos' and "from" = 'ICPEP' and message = 'Reliable, proactive, and always willing to go the extra mile for the team.')
  or (name = 'Carlo Reyes' and "from" = 'Mentor' and message = 'A fast learner with a strong design eye. Consistently delivers polished work ahead of schedule.');