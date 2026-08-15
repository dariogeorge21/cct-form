"use client";

import React, { useState, useEffect } from "react";

// ─── CountdownTimer Component ────────────────────────────────────────────────
// Target: September 19, 2026 at 5:00 PM (17:00:00)
// Awwwards-styled minimal luxury aesthetic:
// - High-contrast display numbers with Barlow Condensed typography
// - Glassmorphic translucent dark container with gold border accents
// - Responsive grid/flex structure for mobile & desktop
// - SSR-safe hydration handling
// ─────────────────────────────────────────────────────────────────────────────

const TARGET_DATE = new Date("2026-09-19T17:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format numbers with leading zeros (e.g. 05)
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const timerUnits = [
    { label: "DAYS", value: formatNumber(timeLeft.days) },
    { label: "HOURS", value: formatNumber(timeLeft.hours) },
    { label: "MINUTES", value: formatNumber(timeLeft.minutes) },
    { label: "SECONDS", value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        className="timer-container"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(3, 9, 13, 0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(200, 168, 107, 0.2)",
          borderRadius: "8px",
          padding: "0.85rem 1.75rem",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(200, 168, 107, 0.05)",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        {/* Subtle background ambient shine */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle at center, rgba(200, 168, 107, 0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
          className="timer-units-row"
        >
          {timerUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              {index > 0 && (
                <div
                  style={{
                    width: "1px",
                    height: "2.2rem",
                    backgroundColor: "rgba(200, 168, 107, 0.15)",
                    flexShrink: 0,
                  }}
                  className="unit-divider"
                />
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  minWidth: "60px",
                }}
                className="timer-unit"
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-barlow-condensed), 'Barlow Condensed', 'Impact', sans-serif",
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "0.02em",
                    color: "var(--text)",
                    fontVariantNumeric: "tabular-nums",
                    textShadow: "0 0 20px rgba(200, 168, 107, 0.2)",
                    transition: "opacity 0.2s ease",
                    opacity: isMounted ? 1 : 0.5,
                  }}
                  className="timer-digit"
                >
                  {unit.value}
                </span>
                <span
                  style={{
                    fontSize: "0.52rem",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    color: "var(--gold)",
                    marginTop: "0.35rem",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {unit.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Responsive adjustments */}
        <style jsx>{`
          @media (max-width: 640px) {
            .timer-container {
              padding: 0.65rem 1rem !important;
              width: 90% !important;
              max-width: 360px !important;
              margin: 0 auto !important;
            }
            .timer-units-row {
              gap: 0.5rem !important;
              width: 100% !important;
              justify-content: center !important;
            }
            .timer-unit {
              min-width: 45px !important;
              text-align: center !important;
            }
            .unit-divider {
              height: 1.6rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
