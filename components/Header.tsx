"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Calendar, MapPin } from "lucide-react";

// ─── Header Component ────────────────────────────────────────────────────────
// Awwwards-level minimal, editorial, and ultra-polished sticky navigation bar
// Features:
// - Scroll-aware sticky navigation with refined blur & height scaling
// - Editorial brand mark & Jesus Youth Pala identity treatment
// - Micro-interaction desktop navigation with hairline animated indicators
// - Minimalist live date indicator & high-contrast CTA button
// - Full-screen editorial mobile drawer with index numbers & staggered entrance
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "register", label: "REGISTER", href: "#register" },
  { id: "info", label: "EVENT INFO", href: "#event-info" },
  { id: "venue", label: "VENUE", href: "#event-info" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Handle scroll events for backdrop transition and section tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section detection
      const sections = ["about", "register", "event-info"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* ── Main Navigation Bar ── */}
        <nav
          aria-label="Main navigation"
          style={{
            backgroundColor: isScrolled
              ? "rgba(3, 9, 13, 0.88)"
              : "rgba(3, 9, 13, 0.35)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(8px)",
            WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(8px)",
            borderBottom: isScrolled
              ? "1px solid var(--border-subtle)"
              : "1px solid rgba(200, 168, 107, 0.06)",
            padding: isScrolled ? "0.85rem 0" : "1.25rem 0",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="container-veritas">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* ── Brand Logo & Identity ── */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  textDecoration: "none",
                }}
                className="brand-logo-container"
              >
                {/* Minimalist Emblem */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    backgroundColor: "rgba(10, 18, 25, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                  }}
                  className="brand-emblem"
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      letterSpacing: "0.08em",
                      color: "var(--gold-bright)",
                      lineHeight: 1,
                    }}
                  >
                    JY
                  </span>
                </div>

                {/* Editorial Typography Name */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                        fontSize: "1.35rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        color: "var(--text)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                      }}
                    >
                      VERITAS
                    </span>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "var(--gold)",
                      }}
                    >
                      2025
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.52rem",
                      fontWeight: 600,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginTop: "3px",
                    }}
                  >
                    JESUS YOUTH PALA
                  </span>
                </div>
              </a>

              {/* ── Desktop Navigation Links ── */}
              <div
                className="desktop-nav-links"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2.5rem",
                }}
              >
                {navItems.map((item) => {
                  const isActive =
                    (item.href === "#about" && activeSection === "about") ||
                    (item.href === "#register" &&
                      activeSection === "register") ||
                    (item.href === "#event-info" &&
                      activeSection === "event-info");

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      style={{
                        position: "relative",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        color: isActive
                          ? "var(--gold-bright)"
                          : "var(--text-muted)",
                        textDecoration: "none",
                        padding: "0.35rem 0",
                        transition: "color 0.3s ease",
                      }}
                      className="nav-link-item"
                    >
                      <span>{item.label}</span>

                      {/* Hairline Indicator */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          width: isActive ? "100%" : "0%",
                          height: "1px",
                          backgroundColor: "var(--gold)",
                          transform: "translateX(-50%)",
                          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          opacity: isActive ? 1 : 0,
                        }}
                        className="nav-link-indicator"
                      />
                    </a>
                  );
                })}
              </div>

              {/* ── Header Actions ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                {/* Minimalist Live Date Tag */}
                <div
                  className="status-pill-badge"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: "var(--gold)",
                      boxShadow: "0 0 6px var(--gold)",
                    }}
                  />
                  <span>SEP 18–21</span>
                </div>

                {/* Primary CTA Button */}
                <a
                  href="#register"
                  className="cta-header-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 1.15rem",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    backgroundColor: "transparent",
                    color: "var(--gold)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span>REGISTER</span>
                  <ChevronRight
                    size={12}
                    className="cta-arrow"
                    style={{
                      strokeWidth: 2,
                      transition: "transform 0.3s ease",
                    }}
                  />
                </a>

                {/* Mobile Drawer Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                  className="mobile-menu-toggle"
                  style={{
                    display: "none",
                    background: "none",
                    border: "none",
                    color: "var(--text)",
                    padding: "0.4rem",
                    cursor: "pointer",
                  }}
                >
                  {mobileMenuOpen ? (
                    <X size={22} style={{ color: "var(--gold)" }} />
                  ) : (
                    <Menu size={22} style={{ color: "var(--text)" }} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Full-Screen Mobile Drawer ── */}
      <div
        aria-hidden={!mobileMenuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          backgroundColor: "rgba(3, 9, 13, 0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "6.5rem 2rem 3rem",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transform: mobileMenuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="mobile-drawer"
      >
        {/* Navigation Items with Editorial Numbering */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold-muted)",
              marginBottom: "0.5rem",
            }}
          >
            INDEX
          </span>

          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "0.85rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(15px)",
                transitionDelay: `${0.08 + index * 0.04}s`,
              }}
              className="mobile-nav-item"
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--gold-muted)",
                    fontFamily: "monospace",
                  }}
                >
                  0{index + 1}
                </span>
                <span
                  style={{
                    fontFamily:
                      "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
              </div>
              <ChevronRight
                size={18}
                style={{ color: "var(--gold-muted)", opacity: 0.5 }}
              />
            </a>
          ))}
        </div>

        {/* Event Quick Details & Registration CTA */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.75rem",
                color: "var(--text)",
              }}
            >
              <Calendar size={14} style={{ color: "var(--gold)" }} />
              <span>September 18 – 21, 2025</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              <MapPin size={14} style={{ color: "var(--gold)" }} />
              <span>St. Thomas College, Pala</span>
            </div>
          </div>

          <a
            href="#register"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-fill-gold"
            style={{
              textAlign: "center",
              fontSize: "0.68rem",
              padding: "0.85rem 1.5rem",
              letterSpacing: "0.2em",
            }}
          >
            REGISTER FOR VERITAS
          </a>

          <p
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              textAlign: "center",
              marginTop: "0.5rem",
            }}
          >
            JESUS YOUTH PALA • VERITAS 2025
          </p>
        </div>
      </div>

      {/* ── Component Hover & Breakpoint Styles ── */}
      <style>{`
        .nav-link-item:hover {
          color: var(--gold-bright) !important;
        }
        .nav-link-item:hover .nav-link-indicator {
          width: 100% !important;
          opacity: 1 !important;
        }
        .brand-logo-container:hover .brand-emblem {
          border-color: var(--gold) !important;
          transform: translateY(-1px);
        }
        .cta-header-btn:hover {
          background-color: rgba(200, 168, 107, 0.08) !important;
          border-color: var(--gold) !important;
          color: var(--gold-bright) !important;
        }
        .cta-header-btn:hover .cta-arrow {
          transform: translateX(3px);
        }
        .mobile-nav-item:hover span {
          color: var(--gold-bright) !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 880px) {
          .desktop-nav-links {
            display: none !important;
          }
          .status-pill-badge {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .cta-header-btn {
            padding: 0.4rem 0.85rem !important;
            font-size: 0.6rem !important;
          }
        }

        @media (max-width: 480px) {
          .cta-header-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

