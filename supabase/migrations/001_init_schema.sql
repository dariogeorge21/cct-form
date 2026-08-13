-- ============================================================
-- Migration: 001_init_schema.sql
-- Project:   ORAH 2026 — CCT Event Management
-- Created:   2026-08-13
-- ============================================================
-- Apply via: Supabase Dashboard → SQL Editor → Run
--            OR: supabase db push (if using CLI)
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- SECTION 1: Custom ENUM Types
-- ────────────────────────────────────────────────────────────

-- Controls whether an event is open for registrations
CREATE TYPE event_status AS ENUM ('ACCEPTING', 'CLOSED');

-- Registration channel — only ONLINE is actively used now;
-- OFFLINE reserved for on-spot / admin-created registrations
CREATE TYPE registration_type AS ENUM ('ONLINE', 'OFFLINE');


-- ────────────────────────────────────────────────────────────
-- SECTION 2: Table — events
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS events (
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name             text        NOT NULL,
    slug             text        NOT NULL UNIQUE,        -- URL-safe identifier (e.g. 'orah-2026')
    description      text,
    location         text,
    event_date       timestamptz,
    status           event_status NOT NULL DEFAULT 'ACCEPTING',
    max_capacity     integer,                            -- NULL = unlimited
    created_at       timestamptz  NOT NULL DEFAULT now(),
    updated_at       timestamptz  NOT NULL DEFAULT now()
);

COMMENT ON TABLE  events              IS 'Top-level event records for CCT event management.';
COMMENT ON COLUMN events.slug        IS 'URL-friendly unique identifier used by the API to look up events.';
COMMENT ON COLUMN events.status      IS 'ACCEPTING = open for registrations; CLOSED = no new registrations allowed.';
COMMENT ON COLUMN events.max_capacity IS 'Optional hard cap on registrations. NULL means unlimited.';


-- ────────────────────────────────────────────────────────────
-- SECTION 3: Table — users  (future admin scope)
-- ────────────────────────────────────────────────────────────
-- Stores internal admin / staff accounts.
-- Auth is managed by Supabase Auth; this table extends the
-- auth.users profile with role information.

CREATE TABLE IF NOT EXISTS users (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id    uuid UNIQUE,                              -- References auth.users(id) from Supabase Auth
    email      text NOT NULL UNIQUE,
    full_name  text,
    role       text NOT NULL DEFAULT 'admin',            -- e.g. 'admin', 'staff', 'volunteer'
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE  users           IS 'Internal admin and staff accounts for event management.';
COMMENT ON COLUMN users.auth_id  IS 'Supabase Auth UID. NULL for manually seeded records.';
COMMENT ON COLUMN users.role     IS 'Role string for future RBAC. Expected values: admin, staff, volunteer.';


-- ────────────────────────────────────────────────────────────
-- SECTION 4: Table — registrations
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS registrations (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id            uuid NOT NULL REFERENCES events(id) ON DELETE RESTRICT,

    -- Channel: ONLINE (default) or OFFLINE (on-spot / admin created)
    registration_type   registration_type NOT NULL DEFAULT 'ONLINE',

    -- Participant personal info
    name                text        NOT NULL,
    dob                 date        NOT NULL,
    phone               text        NOT NULL,
    email               text        NOT NULL,
    gender              text        NOT NULL,            -- 'male' | 'female'
    year_of_study       text        NOT NULL,

    -- Church / diocese info
    parish              text        NOT NULL,
    diocese             text        NOT NULL,

    -- Parent / guardian info
    parent_name         text        NOT NULL,
    parent_phone        text        NOT NULL,

    -- Consent
    confirmed           boolean     NOT NULL DEFAULT false,

    -- Metadata
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),

    -- Prevents the same email from registering twice for the same event
    CONSTRAINT registrations_unique_email_per_event UNIQUE (event_id, email)
);

COMMENT ON TABLE  registrations                         IS 'Individual registrations for an event.';
COMMENT ON COLUMN registrations.registration_type      IS 'ONLINE = submitted via web form; OFFLINE = on-spot or admin-created.';
COMMENT ON COLUMN registrations.confirmed              IS 'Participant confirmed their details are accurate at time of submission.';


-- ────────────────────────────────────────────────────────────
-- SECTION 5: Table — tickets
-- ────────────────────────────────────────────────────────────
-- Each successful registration may have one or more tickets.
-- The token_hash is the unique QR / check-in identifier.

CREATE TABLE IF NOT EXISTS tickets (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id uuid NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,

    -- Unique opaque token (e.g. SHA-256 hex of registration_id + secret salt)
    -- Generated server-side and stored here for fast QR code lookups
    token_hash      text NOT NULL UNIQUE,

    issued_at       timestamptz NOT NULL DEFAULT now(),
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE  tickets             IS 'Unique QR/check-in tokens issued per registration.';
COMMENT ON COLUMN tickets.token_hash IS 'Opaque unique token hash used for QR code scanning during check-in.';


-- ────────────────────────────────────────────────────────────
-- SECTION 6: Table — check_ins
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS check_ins (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id       uuid NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,

    checked_in_at   timestamptz NOT NULL DEFAULT now(),

    -- Who performed the check-in (staff name, device id, or admin user_id)
    checked_in_by   text,

    created_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE  check_ins                  IS 'Records each time a ticket was scanned / checked in at an event.';
COMMENT ON COLUMN check_ins.checked_in_by   IS 'Free-text identifier for who/what performed the scan (staff name, device, or admin user id).';


-- ────────────────────────────────────────────────────────────
-- SECTION 7: Indexes (performance)
-- ────────────────────────────────────────────────────────────

-- Fast lookup of registrations by event
CREATE INDEX IF NOT EXISTS idx_registrations_event_id
    ON registrations(event_id);

-- Fast lookup of registrations by email (duplicate checks, admin search)
CREATE INDEX IF NOT EXISTS idx_registrations_email
    ON registrations(email);

-- Fast lookup of tickets by registration
CREATE INDEX IF NOT EXISTS idx_tickets_registration_id
    ON tickets(registration_id);

-- Fast token lookup for QR scanning
CREATE INDEX IF NOT EXISTS idx_tickets_token_hash
    ON tickets(token_hash);

-- Fast check-in lookup by ticket
CREATE INDEX IF NOT EXISTS idx_check_ins_ticket_id
    ON check_ins(ticket_id);


-- ────────────────────────────────────────────────────────────
-- SECTION 8: Auto-update `updated_at` trigger
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach to tables that have an updated_at column
CREATE TRIGGER set_updated_at_events
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_users
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_registrations
    BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_tickets
    BEFORE UPDATE ON tickets
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();


-- ────────────────────────────────────────────────────────────
-- SECTION 9: Row Level Security (RLS)
-- ────────────────────────────────────────────────────────────
-- Enable RLS on all tables (deny-by-default).
-- The service_role key (used in the API route) bypasses RLS.
-- No public SELECT/INSERT policies are added intentionally.

ALTER TABLE events        ENABLE ROW LEVEL SECURITY;
ALTER TABLE users         ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets       ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins     ENABLE ROW LEVEL SECURITY;

-- Optional: Allow read-only access to events for the anon/public role
-- (so the frontend can query event status if needed in the future)
CREATE POLICY "Public can read events"
    ON events
    FOR SELECT
    TO anon, authenticated
    USING (true);


-- ────────────────────────────────────────────────────────────
-- SECTION 10: Seed — Default Event
-- ────────────────────────────────────────────────────────────
-- Insert the ORAH 2026 event record used by the registration form.
-- The API route looks up this event by slug = 'orah-2026'.

INSERT INTO events (name, slug, description, location, status)
VALUES (
    'ORAH 2026',
    'orah-2026',
    'Campus Meet — ORAH 2026',
    'Pala, Kerala',
    'ACCEPTING'
)
ON CONFLICT (slug) DO NOTHING;  -- Safe to re-run migration


-- ============================================================
-- END OF MIGRATION
-- ============================================================
