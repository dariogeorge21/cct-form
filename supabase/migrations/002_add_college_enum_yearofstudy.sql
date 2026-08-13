-- ============================================================
-- Migration: 002_add_college_enum_yearofstudy.sql
-- Project:   ORAH 2026 — CCT Event Management
-- Created:   2026-08-13
-- ============================================================
-- Apply via: Supabase Dashboard → SQL Editor → Run
--            OR: supabase db push (if using CLI)
-- ============================================================
-- NOTE: No CHECK constraints are applied for college or
--       year_of_study — validation is enforced at the
--       application layer (Zod schema + form validation).
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- STEP 1: Add the new `college` column
-- ────────────────────────────────────────────────────────────
-- Allow NULL initially so existing rows (if any) don't fail,
-- then back-fill and enforce NOT NULL.

ALTER TABLE registrations
    ADD COLUMN IF NOT EXISTS college text;

UPDATE registrations
SET college = 'Other'
WHERE college IS NULL;

ALTER TABLE registrations
    ALTER COLUMN college SET NOT NULL;

COMMENT ON COLUMN registrations.college IS
    'College the participant attends (e.g. SJCET, ACP, DMC, STC, SJC, SGC, or a custom value).';

COMMENT ON COLUMN registrations.year_of_study IS
    'Year of study (e.g. UG - 1st Year, PG - 2nd Year, or a custom value).';


-- ============================================================
-- END OF MIGRATION
-- ============================================================
