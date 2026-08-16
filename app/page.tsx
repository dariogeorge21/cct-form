import Header from "@/components/Header";
import HeroPlaceholder from "@/components/HeroPlaceholder";
import CountdownTimer from "@/components/CountdownTimer";
import AboutSection from "@/components/AboutSection";
import RegistrationForm from "@/components/RegistrationForm";
import VenueSection from "@/components/VenueSection";
import EventInfoStrip from "@/components/EventInfoStrip";
import Footer from "@/components/Footer";

// ─── ORAH 2026 — Main Page ─────────────────────────────────────────────────
// Component hierarchy:
//   Header                 (sleek sticky Awwwards glassmorphic navigation header)
//   HeroPlaceholder        (full-viewport framed hero wallpaper)
//   CountdownTimer         (standalone minimal Awwwards countdown timer strip)
//   AboutSection           (2-col: editorial copy + 3 feature cards)
//   RegistrationForm       (centered dark bordered registration form panel)
//   VenueSection           (location details, navigation app links & embedded map)
//   EventInfoStrip         (4-item horizontal info bar)
//   Footer                 (brand | links | social | copyright)
// ─────────────────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "ORAH 2026 — Jesus Youth Pala",
  "startDate": "2026-09-19T17:00:00+05:30",
  "endDate": "2026-09-21T14:00:00+05:30",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "St Thomas College",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pala",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    }
  },
  "description": "ORAH is a divine encounter for youth and young adults by Jesus Youth Pala. September 19–21, 2026 at St Thomas College, Pala. Three days of worship, the Word, community, and mission.",
  "organizer": {
    "@type": "Organization",
    "name": "Jesus Youth Pala",
    "url": "https://www.instagram.com/jesus_youth_pala/" // replace with actual URL if known
  }
};

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--bg)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 0. Header Navigation */}
      <Header />

      {/* 1. Hero — full-viewport framed image wallpaper */}
      <HeroPlaceholder />

      {/* 2. Countdown Timer Section */}
      <section
        aria-label="Event Countdown"
        style={{
          backgroundColor: "var(--bg)",
          padding: "2rem 0",
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

      {/* Thin divider */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }} />

      {/* 5. Venue & Map Section */}
      <VenueSection />

      {/* 6. Event Info Strip */}
      <EventInfoStrip />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}