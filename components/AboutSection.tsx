"use client";

// ─── AboutSection ─────────────────────────────────────────────────────────────
// Two-column layout: editorial copy on the left, 3 feature cards on the right.
// Matches the "ABOUT VERITAS" section from the reference image.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";

type FeatureCard = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

const featureCards: FeatureCard[] = [
  {
    id: "encounter",
    // Worship crowd hands raised — warm, cinematic
    imageSrc:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80",
    imageAlt: "Worship crowd with hands raised",
    title: "ENCOUNTER",
    description: "Experience God\nin a new way",
  },
  {
    id: "equip",
    // Open Bible — warm candlelight tones
    imageSrc:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80",
    imageAlt: "Open Bible with warm light",
    title: "EQUIP",
    description: "Be strengthened through\nthe Word",
  },
  {
    id: "engage",
    // People praying together / community
    imageSrc:
      "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?w=600&q=80",
    imageAlt: "Community praying together",
    title: "ENGAGE",
    description: "Build a community\nthat lasts",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About VERITAS"
      style={{
        backgroundColor: "var(--bg)",
        padding: "5rem 0 4.5rem",
      }}
    >
      <div className="container-veritas">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.35fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* ── Left Column: Editorial Copy ── */}
          <div className="about-copy">
            <p className="eyebrow" style={{ marginBottom: "1.1rem" }}>
              About Veritas
            </p>

            <h2
              className="heading-display"
              style={{
                fontSize: "clamp(2.6rem, 4.5vw, 3.6rem)",
                lineHeight: 0.9,
                marginBottom: "1.5rem",
                fontFamily:
                  "var(--font-barlow-condensed), 'Barlow Condensed', Impact, 'Arial Narrow', sans-serif",
              }}
            >
              A Call to Truth.
              <br />
              A Life Transformed.
            </h2>

            <p
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.85,
                color: "var(--text-muted)",
                maxWidth: "340px",
                marginBottom: "2rem",
              }}
            >
              VERITAS is more than an event—it&apos;s a divine encounter. Four
              days to seek the truth, be renewed in His presence, and rise as
              witnesses of His love in the world.
            </p>

            <a href="#register" className="btn-outline-gold">
              Learn More
            </a>
          </div>

          {/* ── Right Column: Feature Cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.65rem",
              height: "320px",
            }}
            className="feature-cards-grid"
          >
            {featureCards.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .feature-cards-grid {
            height: 280px !important;
          }
        }
        @media (max-width: 600px) {
          .feature-cards-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .feature-cards-grid .feature-card {
            height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureCard({ card }: { card: FeatureCard }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "5px",
        border: "1px solid var(--border-subtle)",
        cursor: "default",
        height: "100%",
      }}
      className="feature-card"
    >
      {/* Background image with hover scale */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "transform 0.65s ease",
        }}
        className="feature-card-img"
      >
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.5) saturate(0.65)",
          }}
          unoptimized
        />
      </div>

      {/* Dark gradient overlay bottom-to-top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(3,9,13,0.93) 0%, rgba(3,9,13,0.25) 55%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Content anchored to bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "0.9rem",
          right: "0.9rem",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.25rem",
            fontFamily:
              "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
          }}
        >
          {card.title}
        </p>
        <p
          style={{
            fontSize: "0.68rem",
            color: "rgba(232,224,212,0.6)",
            lineHeight: 1.45,
            whiteSpace: "pre-line",
          }}
        >
          {card.description}
        </p>
      </div>

      {/* Hover scale via global style */}
      <style>{`
        .feature-card:hover .feature-card-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
