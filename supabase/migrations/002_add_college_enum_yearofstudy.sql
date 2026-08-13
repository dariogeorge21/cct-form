-- ============================================================
-- Migration: 002_add_college_enum_yearofstudy.sql
-- Project:   ORAH 2026 — CCT Event Management
-- Created:   2026-08-13
-- ============================================================
-- Apply via: Supabase Dashboard → SQL Editor → Run
--            OR: supabase db push (if using CLI)
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- STEP 1: Add the new `college` column
-- ────────────────────────────────────────────────────────────
-- Allow NULL initially so existing rows (if any) don't fail.
-- We'll set a default and then make it NOT NULL.

ALTER TABLE registrations
    ADD COLUMN IF NOT EXISTS college text;

-- Back-fill any existing rows with a placeholder so NOT NULL is safe.
UPDATE registrations
SET college = 'Other'
WHERE college IS NULL;

-- Now enforce NOT NULL.
ALTER TABLE registrations
    ALTER COLUMN college SET NOT NULL;

COMMENT ON COLUMN registrations.college IS
    'College the participant attends. One of: SJCET, ACP, DMC, STC, SJC, SGC, Other.';


-- ────────────────────────────────────────────────────────────
-- STEP 2: Add CHECK constraint for `college`
-- ────────────────────────────────────────────────────────────

ALTER TABLE registrations
    DROP CONSTRAINT IF EXISTS chk_registrations_college;

ALTER TABLE registrations
    ADD CONSTRAINT chk_registrations_college
    CHECK (college IN ('SJCET', 'ACP', 'DMC', 'STC', 'SJC', 'SGC', 'Other'));


-- ────────────────────────────────────────────────────────────
-- STEP 3: Add CHECK constraint for `year_of_study`
-- Enforce the new enum values at the DB level.
-- ────────────────────────────────────────────────────────────

ALTER TABLE registrations
    DROP CONSTRAINT IF EXISTS chk_registrations_year_of_study;

ALTER TABLE registrations
    ADD CONSTRAINT chk_registrations_year_of_study
    CHECK (year_of_study IN (
        'UG - 1st Year',
        'UG - 2nd Year',
        'UG - 3rd Year',
        'UG - 4th Year',
        'PG - 1st Year',
        'PG - 2nd Year',
        'Other'
    ));


-- ============================================================
-- END OF MIGRATION
-- ============================================================
