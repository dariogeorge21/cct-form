/**
 * generateTicketPdf.ts
 * ─────────────────────────────────────────────────────────────
 * Generates a physical ticket-sized PDF (85 mm × 50 mm landscape)
 * and triggers a browser download.
 *
 * Layout:
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  ORAH 2026  ·  JY Pala Missionaries          [ticket #] │  ← header band (dark)
 *  ├───────────────────────────────────┬─────────────────────┤
 *  │  Name                            │                     │
 *  │  College                         │   QR Code           │
 *  │  Parish                          │                     │
 *  │                                  │                     │
 *  ├───────────────────────────────────┴─────────────────────┤
 *  │  Registered at: <timestamp>                             │  ← footer (dimmed)
 *  └─────────────────────────────────────────────────────────┘
 */

"use client";

import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export type TicketPayload = {
  ticket: {
    tokenHash: string;
    ticketNumber: string;
    issuedAt: string;
  };
  participant: {
    name: string;
    parish: string;
    diocese: string;
    college: string;
    yearOfStudy: string;
    gender: string;
    phone: string;
    email: string;
    dob: string;
  };
  event: {
    name: string;
    location: string;
  };
};

/** Formats an ISO timestamp into a human-readable string (IST) */
function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

export async function generateTicketPdf(payload: TicketPayload): Promise<void> {
  const { ticket, participant, event } = payload;

  // ── 1. Generate QR code as PNG data URL ───────────────────
  // The QR encodes the raw token_hash — used for check-in scanning.
  const qrDataUrl = await QRCode.toDataURL(ticket.tokenHash, {
    width: 200,
    margin: 1,
    color: {
      dark: "#1a1209",   // near-black ink
      light: "#ffffff",  // white background
    },
    errorCorrectionLevel: "M",
  });

  // ── 2. Create jsPDF document ───────────────────────────────
  // 85 mm × 50 mm  — standard event wristband / ticket size
  const W = 85;  // mm (width)
  const H = 50;  // mm (height)

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [H, W],  // jsPDF landscape: [height, width]
  });

  // ── 3. Colour palette ──────────────────────────────────────
  const DARK   = [13, 10, 5]   as [number, number, number];  // #0d0a05
  const GOLD   = [201, 154, 81] as [number, number, number]; // #c99a51
  const WHITE  = [255, 255, 255] as [number, number, number];
  const MUTED  = [160, 140, 110] as [number, number, number];
  const LIGHT  = [245, 240, 232] as [number, number, number];

  // ── 4. Background ─────────────────────────────────────────
  doc.setFillColor(...LIGHT);
  doc.rect(0, 0, W, H, "F");

  // ── 5. Header band (dark, full width) ─────────────────────
  const headerH = 10;
  doc.setFillColor(...DARK);
  doc.rect(0, 0, W, headerH, "F");

  // Event name (left)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...GOLD);
  doc.text(event.name.toUpperCase(), 3, 6.5);

  // Subtitle (centre-left)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5);
  doc.setTextColor(...MUTED);
  doc.text("JY Pala Missionaries  ·  " + event.location, 3, 9);

  // Ticket number (right)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(...GOLD);
  doc.text(ticket.ticketNumber, W - 3, 6.5, { align: "right" });

  // ── 6. Dividing line (vertical) between text and QR zone ──
  const divX = W - 22;   // QR zone occupies rightmost 22 mm
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.2);
  doc.line(divX, headerH + 2, divX, H - 7);

  // ── 7. Participant text (left zone) ───────────────────────
  const textX = 3;
  let textY = headerH + 6;
  const lineGap = 4.5;

  // Name (prominent)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  // Truncate if very long to stay within left zone
  const maxNameW = divX - textX - 2;
  const nameStr = doc.splitTextToSize(participant.name, maxNameW)[0] as string;
  doc.text(nameStr, textX, textY);
  textY += lineGap;

  // Thin gold rule under name
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.15);
  doc.line(textX, textY - 1.5, divX - 2, textY - 1.5);

  // College
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(...MUTED);
  doc.text("College", textX, textY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...DARK);
  const collegeStr = doc.splitTextToSize(participant.college, maxNameW)[0] as string;
  doc.text(collegeStr, textX + 12, textY);
  textY += lineGap;

  // Parish
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(...MUTED);
  doc.text("Parish", textX, textY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...DARK);
  const parishStr = doc.splitTextToSize(participant.parish, maxNameW)[0] as string;
  doc.text(parishStr, textX + 12, textY);

  // ── 8. QR code (right zone, vertically centred) ───────────
  const qrSize = 18;
  const qrX = divX + 2;
  const qrY = headerH + (H - headerH - 7 - qrSize) / 2 + headerH - headerH / 2 + 1;
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

  // ── 9. Footer band ────────────────────────────────────────
  const footerY = H - 7;
  doc.setFillColor(230, 220, 200, 0.4);  // semi-transparent warm wash
  doc.setFillColor(220, 210, 190);
  doc.rect(0, footerY, W, 7, "F");

  // "Registered at" — dimmed/subtle
  const registeredAt = formatTimestamp(ticket.issuedAt);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(4.5);
  doc.setTextColor(140, 120, 90);  // partially washed-out warm brown
  doc.text(
    `Registered at: ${registeredAt}`,
    W / 2,
    footerY + 4,
    { align: "center" }
  );

  // ── 10. Save / download ───────────────────────────────────
  // Filename: ORAH-2026_<Name>_<TicketNumber>.pdf
  const safeName = participant.name.trim().replace(/\s+/g, "_").replace(/[^A-Za-z0-9_]/g, "");
  const filename = `ORAH-2026_${safeName}_${ticket.ticketNumber}.pdf`;
  doc.save(filename);
}
