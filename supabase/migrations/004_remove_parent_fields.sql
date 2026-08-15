-- Migration: 004_remove_parent_fields.sql
-- Description: Drop parent_name and parent_phone columns from registrations table.

ALTER TABLE registrations
DROP COLUMN IF EXISTS parent_name,
DROP COLUMN IF EXISTS parent_phone;
