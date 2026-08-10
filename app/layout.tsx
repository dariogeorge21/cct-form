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
  title: "VERITAS 2026 — Jesus Youth Pala | A Call to Truth. A Life Transformed.",
  description:
    "VERITAS is a divine encounter for youth and young adults by Jesus Youth Pala. September 18–21, 2026 at St Thomas College, Pala. Four days of worship, the Word, community, and mission.",
  keywords: ["VERITAS", "Jesus Youth Pala", "Christian youth event", "Catholic youth", "Pala", "Kerala"],
  openGraph: {
    title: "VERITAS 2026 — Jesus Youth Pala",
    description: "A Call to Truth. A Life Transformed. Sep 18–21, 2026.",
    type: "website",
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
