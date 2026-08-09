"use client";

// ─── Footer ───────────────────────────────────────────────────────────────────
// Dark footer: logo / description | Quick Links | Connect With Us
// Bottom: copyright line + "Designed with ♥ for His Glory"
// ─────────────────────────────────────────────────────────────────────────────

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22.54 6.42A2.78 2.78 0 0 0 20.59 4.5C18.88 4 12 4 12 4s-6.88 0-8.59.5a2.78 2.78 0 0 0-1.95 1.92C1 8.12 1 12 1 12s0 3.88.46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.5a2.78 2.78 0 0 0 1.95-1.92C23 15.88 23 12 23 12s0-3.88-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const JYLogoMark = () => (
  <div
    style={{
      width: "36px",
      height: "36px",
      border: "1px solid var(--gold-muted)",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        color: "var(--gold)",
        letterSpacing: "0.04em",
      }}
    >
      JY
    </span>
  </div>
);

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: "#",
    icon: <InstagramIcon />,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "#",
    icon: <YoutubeIcon />,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "#",
    icon: <WhatsAppIcon />,
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {/* Main footer content */}
      <div
        className="container-veritas"
        style={{ padding: "3rem 2rem 2rem" }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr",
            gap: "3rem",
          }}
        >
          {/* ── Column 1: Brand ── */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <JYLogoMark />
              <div>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    lineHeight: 1.2,
                  }}
                >
                  Jesus Youth
                  <br />
                  Pala
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.75rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
                maxWidth: "300px",
              }}
            >
              VERITAS is an initiative of Jesus Youth Pala to bring young
              hearts closer to Christ through worship, the Word, community,
              and mission.
            </p>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1.1rem",
              }}
            >
              Quick Links
            </p>
            <nav aria-label="Footer quick links">
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        transition: "color 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--gold)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-muted)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3: Connect ── */}
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1.1rem",
              }}
            >
              Connect With Us
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text-muted)",
                    transition: "color 0.25s ease",
                    display: "flex",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "1rem 0",
        }}
      >
        <div
          className="container-veritas"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--text-dim)",
              letterSpacing: "0.04em",
            }}
          >
            © 2025 Jesus Youth Pala. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--text-dim)",
              letterSpacing: "0.04em",
            }}
          >
            Designed with{" "}
            <span style={{ color: "var(--gold-muted)" }}>♥</span> for His
            Glory
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
