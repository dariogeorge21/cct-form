"use client";

import { ChevronDown } from "lucide-react";

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Responsive full-viewport hero section.
// Uses `HeroDesktop.png` for desktop & tablet devices and `HeroMobile.png` for mobile screens.
// Occupies 100% full screen height (100vh / 100dvh) so wallpaper appears first before scrolling into website content.
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroPlaceholder() {
  return (
    <section
      id="hero"
      aria-label="Hero Banner"
      style={{
        width: "100%",
        minHeight: "100vh",
        height: "100vh",
        // dvh (dynamic viewport height) handles mobile browser toolbar resizing smoothly
        height: "100dvh",
        backgroundColor: "#03090d",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* ── Desktop & Mobile Fullscreen Background ── */}
      <div className="hero-bg-layer" />

      {/* ── Bottom Gradient Fade blending Hero into the dark page ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background:
            "linear-gradient(to bottom, rgba(3,9,13,0) 0%, rgba(3,9,13,0.7) 60%, #03090d 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Scroll Down Indicator Cue ── */}
      <a
        href="#about"
        aria-label="Scroll to content"
        style={{
          position: "absolute",
          bottom: "2.2rem",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.35rem",
          color: "var(--gold-bright)",
          textDecoration: "none",
          opacity: 0.85,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          cursor: "pointer",
        }}
        className="scroll-indicator"
      >
        <span
          style={{
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <ChevronDown
          size={18}
          className="animate-bounce"
          style={{
            color: "var(--gold-bright)",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
          }}
        />
      </a>

      {/* ── Responsive CSS styling for mobile & desktop backgrounds ── */}
      <style jsx>{`
        .hero-bg-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url('/HeroDesktop.png');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .scroll-indicator:hover {
          opacity: 1 !important;
          transform: translateY(3px);
        }

        @media (max-width: 768px) {
          .hero-bg-layer {
            background-image: url('/HeroMobile.png');
            background-position: center top;
            background-size: cover;
          }
        }
      `}</style>
    </section>
  );
}
