/**
 * generateTicketPdf.ts
 * ─────────────────────────────────────────────────────────────
 * Generates a physical ticket-sized PDF (85 mm × 50 mm landscape)
 * and triggers a browser download.
 *
 * Redesigned layout — premium minimal, dark theme:
 *
 *  ┌──────────────────────────────────────────┬───┬──────────┐
 *  │ gold accent bar                           ┊   ┊          │
 *  │ ORAH 2026 · JY PALA MISSIONARIES          ┊   ┊  ⟦ QR ⟧  │
 *  │ Name (large)                              ┊   ┊  #TICKET │
 *  │ ─────────────────────                     ┊   ┊          │
 *  │ COLLEGE          PARISH                   ┊   ┊          │
 *  │ St. Xavier's     Sacred Heart             ┊   ┊          │
 *  │                                           ┊   ┊          │
 *  │ #ORAH-0042           Registered 12 Aug··· ┊   ┊          │
 *  └──────────────────────────────────────────┴───┴──────────┘
 *    main zone (stub-style card)         perforation   QR stub
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
    affiliation?: string;
    college?: string;
    institute?: string;
    yearOfStudy?: string;
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

type RGB = [number, number, number];

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

/**
 * Draws text with manual letter-spacing (jsPDF has no reliable
 * cross-version `charSpace` support), used for the small-caps
 * eyebrow / label text that needs an editorial, premium feel.
 */
function drawTracked(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  trackingMm: number
): void {
  let cursor = x;
  for (const char of text) {
    doc.text(char, cursor, y);
    cursor += doc.getTextWidth(char) + trackingMm;
  }
}

/** Truncates a string to fit a max width, appending "…" if cut */
function fitText(doc: jsPDF, text: string, maxWidth: number): string {
  if (doc.getTextWidth(text) <= maxWidth) return text;
  let out = text;
  while (out.length > 1 && doc.getTextWidth(out + "…") > maxWidth) {
    out = out.slice(0, -1);
  }
  return out + "…";
}

/** Loads a public asset URL and returns it as a base64 PNG data URL */
async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateTicketPdf(payload: TicketPayload): Promise<void> {
  const { ticket, participant, event } = payload;

  // ── 1. Pre-load assets (QR + JY logo) in parallel ──────────
  const [qrDataUrl, logoDataUrl] = await Promise.all([
    QRCode.toDataURL(ticket.tokenHash, {
      width: 240,
      margin: 0,
      color: { dark: "#141008", light: "#ffffff" },
      errorCorrectionLevel: "M",
    }),
    loadImageAsDataUrl("/jyLogo.png"),
  ]);

  // ── 2. Create jsPDF document ───────────────────────────────
  const W = 85; // mm
  const H = 50; // mm

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [H, W],
  });

  // ── 3. Palette — warm near-black + soft gold, off-white ink ─
  const BG: RGB = [16, 12, 7]; // main zone background
  const STUB_BG: RGB = [24, 18, 10]; // QR stub background, one shade up
  const GOLD: RGB = [201, 158, 92];
  const GOLD_MUTED: RGB = [124, 104, 72];
  const INK: RGB = [242, 236, 224]; // off-white, not pure white
  const INK_MUTED: RGB = [150, 140, 122];

  // ── 4. Layout constants ─────────────────────────────────────
  const STUB_W = 22; // width of the QR stub, right-aligned
  const DIV_X = W - STUB_W; // 63mm — perforation line
  const MARGIN = 4;
  const contentRight = DIV_X - 3; // right edge of usable text area
  const contentW = contentRight - MARGIN;

  // ── 5. Backgrounds ───────────────────────────────────────────
  doc.setFillColor(...BG);
  doc.rect(0, 0, DIV_X, H, "F");
  doc.setFillColor(...STUB_BG);
  doc.rect(DIV_X, 0, STUB_W, H, "F");

  // Thin gold accent bar along the very top — a quiet brand mark
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, W, 0.8, "F");

  // ── 6. Perforation between main card and QR stub ────────────
  doc.setDrawColor(...GOLD_MUTED);
  doc.setLineWidth(0.15);
  doc.setLineDashPattern([0.8, 0.8], 0);
  doc.line(DIV_X, 3, DIV_X, H - 3);
  doc.setLineDashPattern([], 0);

  // Punch-hole notches at top/bottom edge of the perforation
  doc.setFillColor(255, 255, 255);
  doc.circle(DIV_X, 0, 1.6, "F");
  doc.circle(DIV_X, H, 1.6, "F");

  // ── 7. Eyebrow — event name, tracked small caps ──────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.2);
  doc.setTextColor(...GOLD);
  drawTracked(doc, event.name.toUpperCase(), MARGIN, 8, 0.35);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(4.3);
  doc.setTextColor(...INK_MUTED);
  drawTracked(
    doc,
    ("Jesus Youth Pala").toUpperCase(),
    MARGIN,
    11.3,
    0.15
  );

  // ── 8. Name — the focal point ─────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...INK);
  const nameY = 20.5;
  doc.text(fitText(doc, participant.name, contentW), MARGIN, nameY);

  // Thin gold rule beneath the name
  doc.setDrawColor(...GOLD_MUTED);
  doc.setLineWidth(0.15);
  doc.line(MARGIN, nameY + 2.4, contentRight, nameY + 2.4);

  // ── 9. Meta grid — College / Parish, label-over-value ─────────
  const colGap = contentW / 2;
  const fieldLabelY = nameY + 8;
  const fieldValueY = fieldLabelY + 3.6;

  const drawField = (label: string, value: string, x: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(4.2);
    doc.setTextColor(...GOLD_MUTED);
    drawTracked(doc, label.toUpperCase(), x, fieldLabelY, 0.25);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.2);
    doc.setTextColor(...INK);
    doc.text(fitText(doc, value, colGap - 3), x, fieldValueY);
  };

  const collegeAbbreviations: Record<string, string> = {
    "St Joseph's College of Engineering and Technology, Choondacherry": "SJCET",
    "St Joseph's Institute of Hotel Management and Catering Technology, Choondacherry": "SJIHMCT",
    "Alphonsa College, Pala": "ACP",
    "Devamatha College, Kuravilangad": "DCK",
    "St Thomas College, Pala": "STC",
    "St Joseph's College, Moolamattom": "SJCM",
    "St George's College, Aruvithura": "SGC",
    "St Stephen's College, Uzhavoor": "SSC",
    "Bishop Vayalil Memorial Holy Cross College, Cherpunkal": "BVM",
    "Mar Augusthinose College, Ramapuram": "MAC",
    "+2 Passout": "+2 Passout"
  };

  let firstFieldLabel = "Affiliation";
  let firstFieldValue = participant.affiliation || "-";

  if (participant.college) {
    firstFieldLabel = "College";
    firstFieldValue = collegeAbbreviations[participant.college] || participant.college;
  } else if (participant.institute) {
    firstFieldLabel = "Institute";
    firstFieldValue = participant.institute;
  }

  drawField(firstFieldLabel, firstFieldValue, MARGIN);
  drawField("Parish", participant.parish, MARGIN + colGap);

  // ── 10. Footer — ticket number + registration timestamp ───────
  const footerY = H - 4.5;
  // doc.setDrawColor(...GOLD_MUTED);
  // doc.setLineWidth(0.1);
  // doc.line(MARGIN, footerY - 3, contentRight, footerY - 3);

  // JY Logo — left of footer line, vertically centred in the footer strip
  if (logoDataUrl) {
    // Keep the logo at a tasteful small size: 5 mm wide, proportional height
    const logoW = 7;
    const logoH = 7; // approximate; jsPDF will not stretch, it clips
    doc.addImage(logoDataUrl, "PNG", MARGIN, footerY - logoH + 1, logoW, logoH);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(4);
  doc.setTextColor(...INK_MUTED);
  doc.text(formatTimestamp(ticket.issuedAt), contentRight, footerY, {
    align: "right",
  });

  // ── 11. QR stub — centred card + label ─────────────────────────
  const stubCenterX = DIV_X + STUB_W / 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(4);
  doc.setTextColor(...GOLD_MUTED);
  // drawTracked has no built-in centering, so measure total width first
  {
    const label = "SCAN AT EVENT";
    const tracking = 0.15;
    let totalW = 0;
    for (const c of label) totalW += doc.getTextWidth(c) + tracking;
    totalW -= tracking;
    drawTracked(doc, label, stubCenterX - totalW / 2, 7, tracking);
  }

  const cardSize = 17;
  const cardX = stubCenterX - cardSize / 2;
  const cardY = (H - cardSize) / 2 - 1;
  const cardRadius = 1.6;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(cardX, cardY, cardSize, cardSize, cardRadius, cardRadius, "F");

  const qrPad = 1.4;
  doc.addImage(
    qrDataUrl,
    "PNG",
    cardX + qrPad,
    cardY + qrPad,
    cardSize - qrPad * 2,
    cardSize - qrPad * 2
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(4.6);
  doc.setTextColor(...GOLD);
  doc.text(ticket.ticketNumber, stubCenterX, cardY + cardSize + 4, {
    align: "center",
  });

  // ── 12. Save / download ─────────────────────────────────────
  const safeName = participant.name.trim().replace(/\s+/g, "_").replace(/[^A-Za-z0-9_]/g, "");
  const filename = `ORAH-2026_${safeName}_${ticket.ticketNumber}.pdf`;
  doc.save(filename);
}