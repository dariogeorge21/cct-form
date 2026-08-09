"use client";

// ─── HeroPlaceholder ─────────────────────────────────────────────────────────
// Full-viewport cover for the hero image.
// Currently using /Hero.png from the public directory.
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroPlaceholder() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        width: "100%",
        minHeight: "700px",
        height: "100vh",
        backgroundImage: "url('/Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#03090d",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Gradient fade at the bottom so the hero blends into the dark page */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "160px",
          background: "linear-gradient(to bottom, transparent, #03090d)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
