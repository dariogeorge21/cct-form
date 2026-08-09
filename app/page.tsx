import Header from "@/components/Header";
import HeroPlaceholder from "@/components/HeroPlaceholder";
import AboutSection from "@/components/AboutSection";
import SpeakersSection from "@/components/SpeakersSection";
import RegistrationForm from "@/components/RegistrationForm";
import EventInfoStrip from "@/components/EventInfoStrip";
import Footer from "@/components/Footer";

// ─── VERITAS 2025 — Main Page ─────────────────────────────────────────────────
// Component hierarchy:
//   Header                 (sleek sticky Awwwards glassmorphic navigation header)
//   HeroPlaceholder        (full-viewport hero image slot)
//   AboutSection           (2-col: editorial copy + 3 feature cards)
//   SpeakersSection        (heading + 3 speaker cards)  ──┐ side by side on desktop
//   RegistrationForm       (dark bordered form panel)   ──┘
//   EventInfoStrip         (4-item horizontal info bar)
//   Footer                 (brand | links | social | copyright)
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--bg)" }}>
      {/* 0. Header Navigation */}
      <Header />

      {/* 1. Hero — full-viewport image placeholder */}
      <HeroPlaceholder />

      {/* 2. About VERITAS */}
      <AboutSection />

      {/* Thin divider between About and the Speakers+Register row */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }} />

      {/* 3. Speakers + Registration — side-by-side on desktop */}
      <section
        id="speakers-register"
        aria-label="Speakers and Registration"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          className="container-veritas"
          style={{ padding: "4rem 2rem" }}
        >
          <div
            className="speakers-register-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Left: Speakers */}
            <SpeakersSection />

            {/* Right: Registration */}
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* 4. Event Info Strip */}
      <EventInfoStrip />

      {/* 5. Footer */}
      <Footer />

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 960px) {
          .speakers-register-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </main>
  );
}