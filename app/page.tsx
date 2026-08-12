import Header from "@/components/Header";
import HeroPlaceholder from "@/components/HeroPlaceholder";
import CountdownTimer from "@/components/CountdownTimer";
import AboutSection from "@/components/AboutSection";
import RegistrationForm from "@/components/RegistrationForm";
import EventInfoStrip from "@/components/EventInfoStrip";
import Footer from "@/components/Footer";

// ─── ORAH 2026 — Main Page ─────────────────────────────────────────────────
// Component hierarchy:
//   Header                 (sleek sticky Awwwards glassmorphic navigation header)
//   HeroPlaceholder        (full-viewport framed hero wallpaper)
//   CountdownTimer         (standalone minimal Awwwards countdown timer strip)
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

      {/* 1. Hero — full-viewport framed image wallpaper */}
      <HeroPlaceholder />

      {/* 2. Countdown Timer Section */}
      <section
        aria-label="Event Countdown"
        style={{
          backgroundColor: "var(--bg)",
          padding: "3.5rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container-orah">
          <CountdownTimer />
        </div>
      </section>

      {/* 3. About ORAH */}
      <AboutSection />

      {/* Thin divider */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }} />

      {/* 4. Registration Form Section */}
      <section
        id="register"
        aria-label="Registration"
        style={{ backgroundColor: "var(--bg)", padding: "5rem 0" }}
      >
        <div className="container-orah">
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

      {/* 5. Event Info Strip */}
      <EventInfoStrip />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}