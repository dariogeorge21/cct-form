"use client";

import { ArrowDown } from "lucide-react";


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
            height: "280px",
            background: "linear-gradient(to bottom, rgba(3,9,13,0) 0%, rgba(3,9,13,0.85) 95%, #03090d 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>

      {/* ── Register Now Button with Pulse Rings ── */}
      <div className="register-btn-wrapper">
        {/* Sonar ripple rings */}
        <span className="pulse-ring ring-1" />
        <span className="pulse-ring ring-2" />
        <a
          href="#registration"
          aria-label="Register Now"
          className="register-btn"
          style={{
            position: "relative",
            zIndex: 2,
            bottom: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.75rem 2rem 0.75rem 2.2rem",
            background: "linear-gradient(135deg, var(--gold) 0%, #e8c547 50%, var(--gold) 100%)",
            color: "#0a0a0a",
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            borderRadius: "45px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Register Now
          <ArrowDown size={16} strokeWidth={2.5} className="btn-arrow" />
        </a>
      </div>

      {/* ── Responsive CSS styling for mobile & desktop backgrounds ── */}
      <style jsx>{`
        /* ── Keyframes ── */
        @keyframes sonarRing {
          0% {
            transform: scale(1);
            opacity: 0.45;
          }
          80% {
            opacity: 0;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes btnGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(212, 175, 55, 0.25);
          }
          50% {
            box-shadow: 0 0 24px rgba(212, 175, 55, 0.5),
                        0 0 48px rgba(212, 175, 55, 0.15);
          }
        }

        @keyframes arrowBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(3px);
          }
        }

        /* ── Hero layout ── */
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

        /* ── Button wrapper ── */
        .register-btn-wrapper {
          position: absolute;
          z-index: 10;
          display: flex;
          margin-top: 20px;
          align-items: center;
          justify-content: center;
        }

        /* ── Button glow & hover ── */
        .register-btn {
          animation: btnGlow 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .register-btn :global(.btn-arrow) {
          animation: arrowBounce 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }

        .register-btn:hover {
          background: linear-gradient(135deg, var(--gold-bright) 0%, #f0d44a 50%, var(--gold-bright) 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6) !important;
          animation: none;
        }

        .register-btn:hover :global(.btn-arrow) {
          animation: none;
          transform: translateY(1px);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-section {
            width: 100% !important;
            max-width: 100% !important;
            aspect-ratio: auto;
            height: 82svh !important;
            min-height: 480px !important;
            padding-bottom: 0rem !important;
          }
          .register-btn-wrapper {
            // bottom: 1.5rem;
          }
          .hero-bg-layer {
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-image: url('/HeroMobile.jpeg');
            background-position: center top;
            background-size: cover;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}





