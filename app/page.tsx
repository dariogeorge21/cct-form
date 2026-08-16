import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import HeroPlaceholder from "@/components/HeroPlaceholder";
import CountdownTimer from "@/components/CountdownTimer";
import AboutSection from "@/components/AboutSection";
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

      {/* 4. Registration CTA Section */}
      <section
        id="register"
        aria-label="Registration"
        style={{
          backgroundColor: "var(--bg-secondary)",
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient radial gold glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "650px",
            height: "350px",
            background:
              "radial-gradient(ellipse at center, rgba(200, 168, 107, 0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container-orah" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
              padding: "3.5rem 2rem",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-card)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
              Join The Encounter
            </p>
            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "1rem",
                letterSpacing: "0.02em",
              }}
            >
              Ready to Experience ORAH 2026?
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                maxWidth: "520px",
                margin: "0 auto 2.25rem",
                lineHeight: 1.6,
              }}
            >
              September 19–21, 2026 at St. Thomas College, Pala. Secure your spot now to be a part of this transformative 3-day youth conference.
            </p>
            <Link
              href="/register"
              className="btn-fill-gold"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "1rem 2.25rem",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textDecoration: "none",
                borderRadius: "4px",
                boxShadow: "0 0 24px rgba(200, 168, 107, 0.25)",
              }}
            >
              <span>Click Here to Register</span>
              <ArrowRight style={{ width: "1.1rem", height: "1.1rem" }} />
            </Link>

            {/* Support / Info Contact */}
            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "1.75rem",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                For more information contact:
              </p>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <span>Sebin Jo Saji</span>
                <span style={{ color: "var(--border-subtle)" }}>|</span>
                <a
                  href="tel:+919400389831"
                  style={{
                    color: "var(--gold-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  className="hover:text-[var(--gold)]"
                >
                  +91 94003 89831
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Venue & Map Section */}
      <VenueSection />

      {/* 6. Event Info Strip */}
      <EventInfoStrip />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}