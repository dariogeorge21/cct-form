"use client";

import { ChevronDown } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Framed hero section.
// Desktop: Generous 4-side padding/margins (top 6.75rem, bottom 2.5rem, sides 4.5rem, max-width 1160px)
//          so the entire desktop hero artwork is properly framed and viewed across the landing view.
// Mobile: Strictly preserved compact 12px framed layout.
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroPlaceholder() {
  return (
    <section
      id="hero"
      aria-label="Hero Banner"
      style={{
        width: "100%",
        height: "99dvh",
        minHeight: "640px",
        backgroundColor: "#03090d",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "2.5rem",
      }}
    >
      {/* ── Framed Desktop & Mobile Background Layer with 4-Side Margins ── */}
      <div className="hero-bg-layer">
        {/* Bottom Gradient Fade inside the hero frame */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "220px",
            background:
              "linear-gradient(to bottom, rgba(3,9,13,0) 0%, rgba(3,9,13,0.85) 55%, #03090d 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>

      {/* ── Minimal Awwwards Countdown Timer Overlay ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginBottom: "1rem",
        }}
      >
        <CountdownTimer />
      </div>

      {/* ── Scroll Down Indicator Cue ── */}
      <a
        href="#about"
        aria-label="Scroll to content"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
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
          size={16}
          className="animate-bounce"
          style={{
            color: "var(--gold-bright)",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
          }}
        />
      </a>

      {/* ── Responsive CSS styling for mobile & desktop framed backgrounds ── */}
      <style jsx>{`
        .hero-bg-layer {
          position: absolute;
          top: 6.75rem;
          bottom: 2.5rem;
          left: 4.5rem;
          right: 4.5rem;
          max-width: 1160px;
          margin: 0 auto;
          background-image: url('/HeroDesktop.png');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 16px;
          border: 1px solid var(--border-subtle);
          overflow: hidden;
          z-index: 1;
        }

        .scroll-indicator:hover {
          opacity: 1 !important;
          transform: translateY(3px);
        }

        @media (max-width: 1100px) {
          .hero-bg-layer {
            top: 6.5rem;
            bottom: 2rem;
            left: 2.5rem;
            right: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          #hero {
            height: 82dvh !important;
            min-height: 480px !important;
            padding-bottom: 1.5rem !important;
          }
          .hero-bg-layer {
            top: 6rem;
            bottom: 1.25rem;
            left: 1.25rem;
            right: 1.25rem;
            background-image: url('/HeroMobile.png');
            background-position: center top;
            background-size: cover;
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
}




