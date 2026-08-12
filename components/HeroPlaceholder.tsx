"use client";

import { ChevronDown } from "lucide-react";

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
      className="hero-section"
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

      {/* ── Responsive CSS styling for mobile & desktop backgrounds ── */}
      <style jsx>{`
        .hero-section {
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: 640px;
          background-color: #03090d;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 2.5rem;
        }

        .hero-bg-layer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
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
          .hero-section {
            aspect-ratio: auto;
            height: 82dvh !important;
            min-height: 480px !important;
            padding-bottom: 1.5rem !important;
          }
          .hero-bg-layer {
            top: 6rem;
            bottom: 1.25rem;
            left: 1.25rem;
            right: 1.25rem;
            width: auto;
            height: auto;
            background-image: url('/HeroMobile.png');
            background-position: center top;
            background-size: cover;
            border-radius: 12px;
            border: 1px solid var(--border-subtle);
          }
        }
      `}</style>
    </section>
  );
}





