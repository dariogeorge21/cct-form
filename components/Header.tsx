"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";

// ─── Header Component ────────────────────────────────────────────────────────
// Awwwards-inspired modern, sleek, and responsive header navigation bar
// Features:
// - Floating glassmorphic sticky header with scroll-aware backdrop blur & height
// - Sleek brand logo & Jesus Youth Pala identity emblem
// - Desktop nav links with animated gold indicators
// - Live event status badge with pulsing indicator
// - Sleek gold CTA button with hover micro-interactions
// - Full-screen mobile drawer menu with staggered entrance & accessibility
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "speakers", label: "SPEAKERS", href: "#speakers-register" },
  { id: "info", label: "EVENT INFO", href: "#event-info" },
  { id: "venue", label: "VENUE", href: "#event-info" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Handle scroll events for dynamic glass effect and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ["about", "speakers-register", "event-info"];
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

  // Lock body scroll when mobile drawer is open
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

  // Close menu on ESC key press
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
              : "rgba(3, 9, 13, 0.45)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: isScrolled
              ? "1px solid var(--border)"
              : "1px solid rgba(200, 168, 107, 0.08)",
            padding: isScrolled ? "0.75rem 0" : "1.1rem 0",
            boxShadow: isScrolled
              ? "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
              : "none",
            transition: "all 0.35s ease",
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
              {/* Brand Logo & Emblem */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  textDecoration: "none",
                }}
              >
                {/* JY Gold Badge Icon */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "6px",
                    border: "1px solid var(--gold-muted)",
                    background:
                      "linear-gradient(135deg, rgba(200,168,107,0.12) 0%, rgba(3,9,13,0.8) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 15px rgba(200, 168, 107, 0.1)",
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                  }}
                  className="brand-emblem"
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      letterSpacing: "0.05em",
                      color: "var(--gold-bright)",
                      lineHeight: 1,
                    }}
                  >
                    JY
                  </span>
                </div>

                {/* Typography Brand Name */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.35rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                        fontSize: "1.45rem",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        color: "var(--text)",
                        textTransform: "uppercase",
                        lineHeight: 1,
                      }}
                    >
                      VERITAS
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
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
                      fontSize: "0.55rem",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    Jesus Youth Pala
                  </span>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <div
                className="desktop-nav-links"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2.2rem",
                }}
              >
                {navItems.map((item) => {
                  const isActive =
                    (item.href === "#about" && activeSection === "about") ||
                    (item.href === "#speakers-register" &&
                      activeSection === "speakers-register") ||
                    (item.href === "#event-info" &&
                      activeSection === "event-info");

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      style={{
                        position: "relative",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        color: isActive
                          ? "var(--gold-bright)"
                          : "var(--text-muted)",
                        textDecoration: "none",
                        padding: "0.4rem 0",
                        transition: "color 0.25s ease",
                      }}
                      className="nav-link-item"
                    >
                      {item.label}

                      {/* Active / Hover Line Indicator */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "1px",
                          backgroundColor: "var(--gold)",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "center",
                          transition: "transform 0.3s ease",
                          boxShadow: "0 0 8px var(--gold)",
                        }}
                        className="nav-link-indicator"
                      />
                    </a>
                  );
                })}
              </div>

              {/* Action Buttons & Badges */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                }}
              >
                {/* Status Pill Badge (Desktop) */}
                <div
                  className="status-pill-badge"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "20px",
                    backgroundColor: "rgba(200, 168, 107, 0.06)",
                    border: "1px solid rgba(200, 168, 107, 0.15)",
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#34d399",
                      boxShadow: "0 0 8px #34d399",
                    }}
                    className="animate-pulse"
                  />
                  <span>SEP 18–21</span>
                </div>

                {/* Primary CTA Button */}
                <a
                  href="#speakers-register"
                  className="btn-outline-gold cta-header-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 1.25rem",
                    fontSize: "0.68rem",
                  }}
                >
                  <span>REGISTER</span>
                  <ChevronRight size={13} style={{ strokeWidth: 2.5 }} />
                </a>

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                  className="mobile-menu-toggle"
                  style={{
                    display: "none",
                    background: "rgba(10, 18, 25, 0.8)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {mobileMenuOpen ? (
                    <X size={20} style={{ color: "var(--gold)" }} />
                  ) : (
                    <Menu size={20} style={{ color: "var(--text)" }} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Full-Screen Mobile Navigation Drawer ── */}
      <div
        aria-hidden={!mobileMenuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          backgroundColor: "rgba(3, 9, 13, 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "6.5rem 2rem 2.5rem",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transform: mobileMenuOpen ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="mobile-drawer"
      >
        {/* Background ambient lighting */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200, 168, 107, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Mobile Navigation Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold-muted)",
              marginBottom: "0.5rem",
            }}
          >
            NAVIGATION
          </p>

          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily:
                  "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                fontSize: "1.85rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "var(--text)",
                textDecoration: "none",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "0.75rem",
                transition: "all 0.25s ease",
                transform: mobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(15px)",
                transitionDelay: `${0.1 + index * 0.05}s`,
              }}
              className="mobile-nav-item"
            >
              <span>{item.label}</span>
              <ChevronRight
                size={18}
                style={{ color: "var(--gold-muted)", opacity: 0.6 }}
              />
            </a>
          ))}
        </div>

        {/* Event Quick Info Card in Mobile Drawer */}
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "1.25rem",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
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
            <Calendar size={16} style={{ color: "var(--gold)" }} />
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
            <MapPin size={16} style={{ color: "var(--gold)" }} />
            <span>St. Thomas College, Pala</span>
          </div>

          <a
            href="#speakers-register"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-fill-gold"
            style={{
              marginTop: "0.5rem",
              textAlign: "center",
              fontSize: "0.72rem",
            }}
          >
            REGISTER NOW FOR VERITAS
          </a>
        </div>

        {/* Mobile Footer Credit */}
        <div style={{ textAlign: "center", paddingTop: "1rem" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
            }}
          >
            JESUS YOUTH PALA • VERITAS 2025
          </p>
        </div>
      </div>

      {/* Global & Responsive Component Styles */}
      <style>{`
        /* Hover line animations for nav links */
        .nav-link-item:hover {
          color: var(--gold-bright) !important;
        }
        .nav-link-item:hover .nav-link-indicator {
          transform: scaleX(1) !important;
        }
        .brand-emblem:hover {
          transform: scale(1.04);
          border-color: var(--gold) !important;
        }
        .mobile-nav-item:hover {
          color: var(--gold) !important;
          padding-left: 0.5rem;
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
            padding: 0.45rem 0.9rem !important;
            font-size: 0.62rem !important;
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
