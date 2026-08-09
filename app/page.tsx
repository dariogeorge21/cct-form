import Header from "@/components/Header";
import HeroPlaceholder from "@/components/HeroPlaceholder";
import AboutSection from "@/components/AboutSection";
import RegistrationForm from "@/components/RegistrationForm";
import EventInfoStrip from "@/components/EventInfoStrip";
import Footer from "@/components/Footer";

// ─── VERITAS 2025 — Main Page ─────────────────────────────────────────────────
// Component hierarchy:
//   Header                 (sleek sticky Awwwards glassmorphic navigation header)
//   HeroPlaceholder        (full-viewport hero wallpaper with countdown timer)
//   AboutSection           (2-col: editorial copy + 3 feature cards)
//   RegistrationForm       (centered dark bordered registration form panel)
//   EventInfoStrip         (4-item horizontal info bar)
//   Footer                 (brand | links | social | copyright)
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--bg)" }}>
      {/* 0. Header Navigation */}
      <Header />

      {/* 1. Hero — full-viewport image wallpaper & timer */}
      <HeroPlaceholder />

      {/* 2. About VERITAS */}
      <AboutSection />

      {/* Thin divider */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }} />

      {/* 3. Registration Form Section */}
      <section
        id="register"
        aria-label="Registration"
        style={{ backgroundColor: "var(--bg)", padding: "5rem 0" }}
      >
        <div className="container-veritas">
          <div
            style={{
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* 4. Event Info Strip */}
      <EventInfoStrip />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}