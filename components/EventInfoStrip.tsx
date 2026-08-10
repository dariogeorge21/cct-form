"use client";

// ─── EventInfoStrip ───────────────────────────────────────────────────────────
// Horizontal strip with 4 items separated by vertical dividers.
// ─────────────────────────────────────────────────────────────────────────────

type InfoItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
};

const CalendarIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const infoItems: InfoItem[] = [
  {
    id: "dates",
    icon: <CalendarIcon />,
    label: "Dates",
    value: "Sep 18 – Sep 21, 2026",
  },
  {
    id: "venue",
    icon: <LocationIcon />,
    label: "Venue",
    value: "St Thomas College, Pala",
  },
  {
    id: "who",
    icon: <UsersIcon />,
    label: "Who Can Join?",
    value: "Youth & Young Adults",
  },
  {
    id: "dontmiss",
    icon: <StarIcon />,
    label: "Don't Miss",
    value: "Worship · Word · Community",
  },
];

export default function EventInfoStrip() {
  return (
    <div
      id="event-info"
      aria-label="Event information"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg)",
        padding: "1.75rem 0",
      }}
    >
      <div className="container-veritas">
        <div
          className="info-strip-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {infoItems.map((item, index) => (
            <div key={item.id} style={{ display: "flex" }}>
              {/* Vertical divider before all but first item */}
              {index > 0 && (
                <div
                  style={{
                    width: "1px",
                    backgroundColor: "var(--border-subtle)",
                    margin: "0",
                    flexShrink: 0,
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.9rem",
                  padding: "0 1.5rem",
                  flex: 1,
                }}
              >
                {/* Icon */}
                <span
                  style={{
                    color: "var(--gold-muted)",
                    flexShrink: 0,
                    opacity: 0.85,
                  }}
                >
                  {item.icon}
                </span>

                {/* Text */}
                <div>
                  <p
                    style={{
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      color: "var(--text)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .info-strip-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1px !important;
            background: var(--border-subtle) !important;
          }
          .info-strip-grid > div {
            background: var(--bg);
            padding: 1rem 0;
          }
        }
        @media (max-width: 480px) {
          .info-strip-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
