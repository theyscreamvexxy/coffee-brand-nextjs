// components/layout/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "/journal", label: "Journal" },
    { href: "/gallery", label: "Gallery" },
    { href: "/visit",   label: "Visit"   },
];

export default function Navbar() {
    const navRef  = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen]  = useState(false);

    useEffect(() => {
        const onScroll = () => { setScrolled(window.scrollY > 80); };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when menu open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            {/* ── NAVBAR BAR ─────────────────────────────────────────── */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-[100]"
                style={{
                    backdropFilter:       scrolled || menuOpen ? "blur(16px)" : "blur(0px)",
                    WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px)" : "blur(0px)",
                    backgroundColor: scrolled || menuOpen
                        ? "rgba(10, 20, 16, 0.85)"
                        : "transparent",
                    borderBottom: scrolled || menuOpen
                        ? "1px solid rgba(202,203,167,0.08)"
                        : "1px solid transparent",
                    transition:
                        "background-color 700ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 700ms cubic-bezier(0.22,1,0.36,1), border-color 700ms ease",
                }}
            >
                <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
                    <div className="h-16 md:h-20 flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="block" aria-label="Forest Farmer Home">
                                <div
                                    style={{
                                        transition: "transform 400ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.04)";
                                        e.currentTarget.style.opacity = "0.85";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.opacity = "1";
                                    }}
                                >
                                    <Image
                                        src="/images/brand/logo.png"
                                        alt="Forest Farmer Coffee Roasters"
                                        width={48}
                                        height={48}
                                        priority
                                        className="w-10 h-10 md:w-[58px] md:h-[58px]"
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* ── DESKTOP NAV LINKS (unchanged) ── */}
                        <div className="hidden md:flex items-center gap-10">
                            {NAV_LINKS.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="nav-link"
                                    style={{
                                        fontSize: "0.72rem",
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        color: "rgba(202,203,167,0.75)",
                                        fontWeight: 400,
                                        transition: "color 300ms ease",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = "#CACBA7"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(202,203,167,0.75)"; }}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* ── MOBILE HAMBURGER BUTTON ── */}
                        <button
                            id="mobile-menu-toggle"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px] rounded-full focus:outline-none active:scale-95 transition-transform duration-150"
                            onClick={() => setMenuOpen((v) => !v)}
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="block w-6 h-px origin-center"
                                style={{ background: "#CACBA7" }}
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.25 }}
                                className="block w-4 h-px self-start ml-1"
                                style={{ background: "rgba(202,203,167,0.6)" }}
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="block w-6 h-px origin-center"
                                style={{ background: "#CACBA7" }}
                            />
                        </button>

                    </div>
                </div>
            </nav>

            {/* ── MOBILE FULL-SCREEN MENU DRAWER ─────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[99] md:hidden"
                            style={{ background: "rgba(4, 10, 7, 0.5)" }}
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            key="menu-drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 bottom-0 z-[100] md:hidden flex flex-col"
                            style={{
                                width: "min(340px, 100vw)",
                                background: "rgba(8, 18, 12, 0.97)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                borderLeft: "1px solid rgba(202,203,167,0.08)",
                            }}
                        >
                            {/* Drawer top — close button */}
                            <div className="flex items-center justify-between px-7 h-16">
                                <span
                                    className="uppercase tracking-[0.35em] text-[0.52rem] font-light"
                                    style={{ color: "rgba(202,203,167,0.35)" }}
                                >
                                    Menu
                                </span>
                                <button
                                    aria-label="Close menu"
                                    className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform duration-150"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M1 1l16 16M17 1L1 17" stroke="rgba(202,203,167,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Rule */}
                            <div className="mx-7 h-px" style={{ background: "rgba(202,203,167,0.08)" }} />

                            {/* Nav links */}
                            <nav className="flex flex-col px-7 pt-10 gap-1 flex-1">
                                {NAV_LINKS.map(({ href, label }, i) => (
                                    <motion.div
                                        key={href}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 16 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay: 0.08 + i * 0.07,
                                        }}
                                    >
                                        <Link
                                            href={href}
                                            className="flex items-center justify-between group"
                                            style={{
                                                paddingTop: "20px",
                                                paddingBottom: "20px",
                                                borderBottom: "1px solid rgba(202,203,167,0.06)",
                                            }}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <span
                                                className="text-[clamp(1.8rem,7vw,2.6rem)] font-light tracking-[-0.02em]"
                                                style={{
                                                    color: "#CACBA7",
                                                    transition: "color 300ms ease",
                                                }}
                                                onTouchStart={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                                                onTouchEnd={(e) => { e.currentTarget.style.color = "#CACBA7"; }}
                                            >
                                                {label}
                                            </span>
                                            <svg
                                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                className="opacity-25 group-active:opacity-60 transition-opacity"
                                            >
                                                <path d="M4 10h12M11 5l5 5-5 5" stroke="#CACBA7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Bottom brand mark */}
                            <div className="px-7 pb-10 flex items-center gap-4">
                                <Image
                                    src="/images/brand/logo.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="opacity-20"
                                    style={{ objectFit: "contain" }}
                                />
                                <div>
                                    <p className="text-[0.52rem] uppercase tracking-[0.32em] font-light" style={{ color: "rgba(202,203,167,0.28)" }}>
                                        Forest Farmer
                                    </p>
                                    <p className="text-[0.46rem] uppercase tracking-[0.25em] font-light mt-1" style={{ color: "rgba(202,203,167,0.16)" }}>
                                        Coffee Roasters
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}