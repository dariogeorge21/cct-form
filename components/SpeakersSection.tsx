"use client";

// ─── SpeakersSection ──────────────────────────────────────────────────────────
// "SPEAKERS & MORE / BE INSPIRED" heading + three speaker cards.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";

type Speaker = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  role: string;
};

const speakers: Speaker[] = [
  {
    id: "jinto",
    // Priest / clergy portrait — dark, editorial
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    imageAlt: "Fr. Jinto Muttahukadan — Spiritual Director",
    name: "FR. JINTO\nMUTTAHUKADAN",
    role: "Spiritual Director",
  },
  {
    id: "antony",
    // Speaker / teacher portrait
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    imageAlt: "Bro. Antony Thomas — Bible Teacher",
    name: "BRO. ANTONY\nTHOMAS",
    role: "Bible Teacher",
  },
  {
    id: "worship",
    // Worship crowd / concert atmosphere
    imageSrc:
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&q=80",
    imageAlt: "Worship Collective leading worship",
    name: "WORSHIP\nCOLLECTIVE",
    role: "Leading Worship",
  },
];

export default function SpeakersSection() {
  return (
    <div
      id="speakers"
      aria-label="Speakers"
    >
      {/* Section header */}
      <div style={{ marginBottom: "2rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.55rem" }}>
          Speakers &amp; More
        </p>
        <h2
          className="heading-display"
          style={{
            fontSize: "clamp(2.8rem, 5vw, 4rem)",
            fontFamily:
              "var(--font-barlow-condensed), 'Barlow Condensed', Impact, 'Arial Narrow', sans-serif",
          }}
        >
          BE INSPIRED
        </h2>
      </div>

      {/* Speaker cards row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.7rem",
          marginBottom: "1.75rem",
        }}
        className="speaker-cards-grid"
      >
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>

      {/* View all button */}
      <a href="#" className="btn-outline-gold">
        View All Speakers
      </a>

      <style>{`
        @media (max-width: 600px) {
          .speaker-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "5px",
        border: "1px solid var(--border-subtle)",
        height: "245px",
        cursor: "default",
      }}
      className="speaker-card"
    >
      {/* Image with hover scale */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "transform 0.65s ease",
        }}
        className="speaker-card-img"
      >
        <Image
          src={speaker.imageSrc}
          alt={speaker.imageAlt}
          fill
          sizes="(max-width: 600px) 100vw, 25vw"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.45) saturate(0.55)",
          }}
          unoptimized
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(3,9,13,0.96) 0%, rgba(3,9,13,0.15) 60%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Content at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "0.9rem",
          left: "0.9rem",
          right: "0.9rem",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--gold)",
            lineHeight: 1.2,
            whiteSpace: "pre-line",
            marginBottom: "0.3rem",
            fontFamily:
              "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
          }}
        >
          {speaker.name}
        </p>
        <p
          style={{
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            letterSpacing: "0.07em",
          }}
        >
          {speaker.role}
        </p>
      </div>

      <style>{`
        .speaker-card:hover .speaker-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
