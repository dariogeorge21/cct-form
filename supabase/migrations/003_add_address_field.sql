-- ============================================================
-- Migration: 003_add_address_field.sql
-- ============================================================

ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS address text NOT NULL DEFAULT '';
