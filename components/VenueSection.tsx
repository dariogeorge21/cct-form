"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Train,
  Plane,
  Bus,
  Compass,
} from "lucide-react";

export default function VenueSection() {
  const [copied, setCopied] = useState(false);

  const fullAddress =
    "St. Thomas College Palai (Autonomous), Arunapuram P.O., Pala, Kottayam, Kerala 686574";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const navLinks = [
    {
      name: "Google Maps",
      url: "https://www.google.com/maps/search/?api=1&query=St.+Thomas+College+Palai+(Autonomous)",
      desc: "Open in Google Maps App",
      primary: true,
    },
    {
      name: "Apple Maps",
      url: "https://maps.apple.com/?q=St.+Thomas+College+Palai&ll=9.7005879,76.663571",
      desc: "Directions on Apple Devices",
      primary: false,
    }
  ];

  const transitInfo = [
    {
      icon: <Bus className="w-5 h-5 text-[#c8a86b]" />,
      title: "Bus Stand",
      detail: "Pala KSRTC Bus Stand",
      distance: "2 km (5 mins away)",
    }
  ];

  return (
    <section
      id="venue"
      aria-label="Event Venue and Map"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Background Subtle Accent Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 168, 107, 0.25) 0%, transparent 70%)",
        }}
      />

      <div className="container-orah relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(200,168,107,0.2)] bg-[rgba(10,18,25,0.6)] mb-4">
            <Compass className="w-3.5 h-3.5 text-[var(--gold-bright)] animate-spin-slow" />
            <span className="eyebrow tracking-widest text-[var(--gold-muted)]">
              LOCATION & DIRECTIONS
            </span>
          </div>

          <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-[var(--text)] mb-4">
            VENUE & MAP
          </h2>

          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            ORAH 2026 will be hosted at the historic campus of St. Thomas
            College, Pala. Explore interactive navigation options below to plan
            your journey.
          </p>
        </div>

        {/* Top Info & Navigation Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Venue Details & Navigation Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] relative group transition-all duration-300 hover:border-[rgba(200,168,107,0.4)]">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[rgba(200,168,107,0.1)] border border-[rgba(200,168,107,0.2)] text-[var(--gold-bright)] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[var(--gold-muted)] font-semibold block mb-1">
                    OFFICIAL VENUE
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-[var(--text)] tracking-wide">
                    St. Thomas College Palai
                  </h3>
                  <p className="text-xs text-[var(--gold-muted)] uppercase tracking-wider">
                    (Autonomous)
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                Arunapuram P.O., Pala, Kottayam District, Kerala, India —
                686574
              </p>

              <button
                onClick={handleCopyAddress}
                className="w-full py-2.5 px-4 rounded-lg border border-[rgba(200,168,107,0.25)] bg-[rgba(7,15,21,0.8)] text-xs text-[var(--text)] hover:text-[var(--gold-bright)] hover:border-[var(--gold)] flex items-center justify-center gap-2 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">
                      Address Copied to Clipboard!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[var(--gold-muted)]" />
                    <span>Copy Full Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Navigation Apps Launcher Card */}
            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                <Navigation className="w-4 h-4 text-[var(--gold-bright)]" />
                <h4 className="text-xs tracking-wider uppercase font-semibold text-[var(--text)]">
                  Launch Navigation App
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-300 text-xs font-semibold tracking-wide ${link.primary
                      ? "bg-[var(--gold-muted)] text-[#0d0a05] border-[var(--gold-muted)] hover:bg-[var(--gold)] hover:border-[var(--gold)] shadow-lg shadow-[rgba(200,168,107,0.15)]"
                      : "bg-[rgba(7,15,21,0.6)] text-[var(--text)] border-[rgba(200,168,107,0.2)] hover:border-[var(--gold)] hover:bg-[rgba(200,168,107,0.1)] hover:text-[var(--gold-bright)]"
                      }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Transit Points List */}
            <div className="gap-3">
              {transitInfo.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[rgba(10,18,25,0.4)] flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {item.icon}
                    <span className="text-[11px] font-semibold text-[var(--text)]">
                      {item.title}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-[var(--text-muted)] truncate">
                      {item.detail}
                    </p>
                    <p className="text-[10px] text-[var(--gold-muted)] font-mono mt-0.5">
                      {item.distance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden flex flex-col shadow-2xl relative group">
              {/* Map Header Status Bar */}
              <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[rgba(7,15,21,0.9)] backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold-bright)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--gold)]"></span>
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider uppercase">
                    Interactive Map • Pala, Kottayam
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/place/St.+Thomas+College+Palai+(Autonomous)/@9.7005879,76.663571,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[var(--gold-muted)] hover:text-[var(--gold-bright)] flex items-center gap-1 transition-colors"
                >
                  <span>Full Screen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Container */}
              <div className="relative w-full flex-1 min-h-[380px] md:min-h-[440px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.7708615676543!2d76.66357097502718!3d9.700587890390038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07cdbe6ffc82cf%3A0xb84a5f15951ef74a!2sSt.%20Thomas%20College%20Palai%20(Autonomous)!5e0!3m2!1sen!2sin!4v1786647016126!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    minHeight: "380px",
                    filter: "contrast(1.05) brightness(0.95)",
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="St. Thomas College Palai Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
