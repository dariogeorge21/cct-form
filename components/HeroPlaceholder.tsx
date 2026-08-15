"use client";


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

      {/* ── Register Now Button ── */}
      <a
        href="#registration"
        aria-label="Register Now"
        className="register-btn"
        style={{
          position: "absolute",
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.8rem 1.8rem",
          backgroundColor: "var(--gold)",
          color: "#000",
          fontWeight: 750,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "45px",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      >
        Register Now
      </a>

      {/* ── Responsive CSS styling for mobile & desktop backgrounds ── */}
      <style jsx>{`
        .hero-section {
          width: 100vw;
          aspect-ratio: 16 / 9;
          min-height: 640px;
          background-color: #03090d;
          position: relative;
          overflow: auto;
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

        .register-btn:hover {
          background-color: var(--gold-bright);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
        }

        @media (max-width: 768px) {
          .hero-section {
            aspect-ratio: auto;
            height: 82dvh !important;
            min-height: 480px !important;
            padding-bottom: 0rem !important;
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
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
}





