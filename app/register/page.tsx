import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Register — ORAH 2026 | Jesus Youth Pala",
    description:
        "Secure your spot for ORAH 2026. September 19–21, 2026 at St Thomas College, Pala.",
};

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg)]">
            {/* ── Top Navigation Bar (Home Nav) ── */}
            <header className="sticky top-0 z-50 h-16 w-full border-b border-[var(--border-subtle)] bg-[rgba(3,9,13,0.88)] backdrop-blur-md">
                <div className="container-orah py-4">
                    <div className="flex items-center justify-between">
                        {/* Brand Logo & Title */}
                        <Link
                            href="/"
                            className="flex items-center gap-3.5 pt-4 no-underline group"
                            aria-label="ORAH 2026 Home"
                        >
                            <div className="w-9 h-9 rounded-[4px] flex items-center justify-center transition-all duration-300 group-hover:border-[var(--gold)]">
                                <Image
                                    src="/jyLogo.png"
                                    alt="Jesus Youth Logo"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1.5">
                                    <span className="font-['Barlow_Condensed',sans-serif] text-[1.35rem] font-extrabold tracking-[0.1em] text-[var(--text)] uppercase leading-none">
                                        ORAH
                                    </span>
                                    <span className="text-[0.6rem] font-bold tracking-[0.15em] text-[var(--gold)]">
                                        2026
                                    </span>
                                </div>
                                <span className="text-[0.52rem] font-semibold tracking-[0.24em] text-[var(--text-dim)] uppercase">
                                    Jesus Youth Pala
                                </span>
                            </div>
                        </Link>

                        {/* Home Navigation Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 hover:bg-[var(--bg-secondary)] hover:border-[var(--gold-muted)] text-[var(--text-muted)] hover:text-[var(--text)] text-xs font-semibold tracking-wider uppercase transition-all duration-300 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 text-[var(--gold)] group-hover:-translate-x-1 transition-transform" />
                            <span>Home</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* ── Registration Form Section ── */}
            <main className="flex-1 py-10 md:py-16">
                <div className="container-orah">
                    <div className="max-w-[2048px] mx-auto">
                        <RegistrationForm />
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
}