"use client";

import React from "react";

// ─── Footer ───────────────────────────────────────────────────────────────────
// Minimalist, editorial, Awwwards-level closing section
// Features:
// - Generous whitespace and deliberate grid alignment
// - Crisp brand statement & Barlow Condensed identity treatment
// - Micro-numbered navigation items with subtle gold hover animations
// - Restrained social links with clean SVG icons
// - Clean legal bottom bar (zero emojis)
// ─────────────────────────────────────────────────────────────────────────────

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
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
    width="16"
    height="16"
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
    width="16"
    height="16"
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
      width: "32px",
      height: "32px",
      border: "1px solid var(--border)",
      borderRadius: "4px",
      backgroundColor: "rgba(10, 18, 25, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontFamily:
          "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
        fontSize: "0.8rem",
        fontWeight: 800,
        color: "var(--gold-bright)",
        letterSpacing: "0.06em",
        lineHeight: 1,
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
    label: "INSTAGRAM",
    href: "#",
    icon: <InstagramIcon />,
  },
  {
    id: "youtube",
    label: "YOUTUBE",
    href: "#",
    icon: <YoutubeIcon />,
  },
  {
    id: "whatsapp",
    label: "WHATSAPP",
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
        position: "relative",
      }}
    >
      {/* ── Main Footer Body ── */}
      <div
        className="container-veritas"
        style={{ padding: "5rem 2rem 3.5rem" }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* ── Column 1: Brand & Philosophy ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
              }}
            >
              <JYLogoMark />
              <div>
                <span
                  style={{
                    fontFamily:
                      "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  VERITAS 2025
                </span>
                <span
                  style={{
                    fontSize: "0.52rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                    display: "block",
                  }}
                >
                  JESUS YOUTH PALA
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.72rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
                maxWidth: "340px",
                fontWeight: 400,
              }}
            >
              VERITAS is an initiative of Jesus Youth Pala to bring young
              hearts closer to Christ through worship, the Word, community,
              and mission.
            </p>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <span
              style={{
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold-muted)",
                display: "block",
                marginBottom: "1.4rem",
              }}
            >
              01 // NAVIGATION
            </span>
            <nav aria-label="Footer quick links">
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                }}
              >
                {quickLinks.map((link, idx) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                      className="footer-nav-link"
                    >
                      <span
                        style={{
                          fontSize: "0.6rem",
                          color: "var(--text-dim)",
                          fontFamily: "monospace",
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3: Connect ── */}
          <div>
            <span
              style={{
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold-muted)",
                display: "block",
                marginBottom: "1.4rem",
              }}
            >
              02 // CONNECT
            </span>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.25s ease",
                    }}
                    className="footer-social-link"
                  >
                    <span
                      style={{
                        color: "var(--gold-muted)",
                        transition: "color 0.25s ease",
                      }}
                      className="social-icon-wrapper"
                    >
                      {social.icon}
                    </span>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Legal Bar ── */}
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "1.25rem 0",
        }}
      >
        <div
          className="container-veritas"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              color: "var(--text-dim)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            © 2025 JESUS YOUTH PALA. ALL RIGHTS RESERVED.
          </p>
          <p
            style={{
              fontSize: "0.6rem",
              color: "var(--text-dim)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            ST. THOMAS COLLEGE, PALA • DESIGNED FOR HIS GLORY
          </p>
        </div>
      </div>

      {/* ── Component Micro-Styles ── */}
      <style jsx>{`
        .footer-nav-link:hover {
          color: var(--gold-bright) !important;
          transform: translateX(4px);
        }
        .footer-social-link:hover {
          color: var(--gold-bright) !important;
        }
        .footer-social-link:hover .social-icon-wrapper {
          color: var(--gold) !important;
        }

        @media (max-width: 880px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

