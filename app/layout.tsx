import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "ORAH 2026 — Jesus Youth Pala | A Call to Truth. A Life Transformed.",
  description:
    "ORAH is a divine encounter for youth and young adults by Jesus Youth Pala. September 18–21, 2026 at St Thomas College, Pala. Four days of worship, the Word, community, and mission.",
  keywords: [
    "ORAH",
    "Jesus Youth Pala",
    "Christian youth event",
    "Catholic youth",
    "Pala",
    "Kerala",
    "Jesus Youth",
    "Youth Conference",
    "St Thomas College Pala"
  ],
  authors: [{ name: "Jesus Youth Pala" }],
  creator: "Jesus Youth Pala",
  publisher: "Jesus Youth Pala",
  openGraph: {
    title: "ORAH 2026 — Jesus Youth Pala",
    description: "A Call to Truth. A Life Transformed. Sep 18–21, 2026 at St Thomas College, Pala.",
    type: "website",
    locale: "en_IN",
    siteName: "ORAH 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORAH 2026 — Jesus Youth Pala",
    description: "A Call to Truth. A Life Transformed. Sep 18–21, 2026 at St Thomas College, Pala.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body
        className="min-h-full"
        style={{
          fontFamily: "var(--font-inter), 'Helvetica Neue', Arial, sans-serif",
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
