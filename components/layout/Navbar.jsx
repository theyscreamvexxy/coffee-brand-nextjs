"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const navRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-[100]"
            style={{
                backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
                WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
                backgroundColor: scrolled
                    ? "rgba(10, 20, 16, 0.72)"
                    : "transparent",
                borderBottom: scrolled
                    ? "1px solid rgba(202,203,167,0.08)"
                    : "1px solid transparent",
                transition:
                    "background-color 700ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 700ms cubic-bezier(0.22,1,0.36,1), border-color 700ms ease",
            }}
        >
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
                <div className="h-20 flex items-center justify-between">

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
                                    width={58}
                                    height={58}
                                    priority
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {[
                            { href: "/journal", label: "Journal" },
                            { href: "/gallery", label: "Gallery" },
                            { href: "/visit",   label: "Visit"   },
                        ].map(({ href, label }) => (
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

                </div>
            </div>
        </nav>
    );
}