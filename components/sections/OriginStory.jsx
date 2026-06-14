"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";

/* ─────────────────────────────────────────────
   Premium unexpected moments:
   • Headline lines emerge through masked floors
     with kinetic blur — clean, cinematic, luxury
   • Image WIPES open from the center outward
   • GPS coordinates count up live as you enter
   • Floating coordinate text drifts with parallax
───────────────────────────────────────────── */

/* ── Animated coordinate counter ─────────────── */
function CoordCounter({ target, label, duration = 2 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [display, setDisplay] = useState("0.0000");

    useEffect(() => {
        if (!inView) return;
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay((target * eased).toFixed(4));
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(target.toFixed(4));
        };
        requestAnimationFrame(step);
    }, [inView, target, duration]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-1">
            <span
                className="font-light tabular-nums"
                style={{
                    fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
                    color: "rgba(202,203,167,0.7)",
                    fontFamily: "monospace",
                    letterSpacing: "0.06em",
                }}
            >
                {display}°
            </span>
            <span
                className="uppercase tracking-[0.35em] font-light"
                style={{ fontSize: "0.52rem", color: "rgba(202,203,167,0.35)" }}
            >
                {label}
            </span>
        </div>
    );
}

/* ── Premium line reveal — masked curtain with kinetic blur ── */
/*
    FIX: whileInView on the inner hidden element is unreliable because
    IntersectionObserver sees its transformed (off-screen) position.
    Solution: useInView on the OUTER div (always at y:0, always detectable),
    then drive inner motion.div with animate= so it fires correctly.
*/
function LineReveal({ children, delay = 0 }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "0px 0px -40px 0px" });

    return (
        <div ref={containerRef} style={{ overflow: "hidden", lineHeight: "1.12" }}>
            <motion.div
                initial={{ y: "105%", filter: "blur(14px)", opacity: 0 }}
                animate={
                    isInView
                        ? { y: "0%", filter: "blur(0px)", opacity: 1 }
                        : { y: "105%", filter: "blur(14px)", opacity: 0 }
                }
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
                style={{ display: "block" }}
            >
                {children}
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function OriginStory() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
        layoutEffect: false,          // prevents hydration mismatch warning
    });

    /* Parallax transforms */
    const coordY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
    const imageParY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    const glowY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

    /* Spring-smoothed image parallax */
    const smoothImageY = useSpring(imageParY, { stiffness: 60, damping: 20 });

    return (
        <div ref={sectionRef}>
            <Section className="overflow-hidden" style={{ background: '#141f1a', color: '#ffffff' }}>

                {/* ── AMBIENT DEEP FOREST GLOW ─────────────────────────────────── */}
                <motion.div
                    aria-hidden
                    style={{ y: glowY }}
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    <div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04]"
                        style={{ background: "radial-gradient(circle, #AAB79A 0%, #3D5757 55%, transparent 75%)" }}
                    />
                </motion.div>

                {/* ── SECTION LABEL + COORDINATES ──────────────────────────────── */}
                <div className="mb-10 lg:mb-14">
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "left center" }}
                        className="h-px bg-white/[0.12] mb-7"
                    />
                    <div className="flex items-center justify-between">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.0, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="uppercase tracking-[0.42em] text-[0.6rem] font-light"
                            style={{ color: 'rgba(255,255,255,0.55)' }}
                        >
                            Origin Story
                        </motion.p>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.0, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="hidden sm:block text-[0.6rem] uppercase tracking-[0.3em] font-light"
                            style={{ color: 'rgba(255,255,255,0.30)' }}
                        >
                            §&ensp;003
                        </motion.span>
                    </div>
                </div>

                {/* ── PREMIUM HEADLINE — masked line reveal ─────────────────────── */}
                {/*
          Each line slides up from behind an invisible overflow mask
          while a blur sharpens simultaneously — kinetic focus effect.
          Premium, cinematic, works perfectly on every screen size.
      */}
                <div className="mb-14 lg:mb-18">
                    <h2
                        className="
            text-[clamp(2.8rem,7.5vw,7rem)]
            tracking-[-0.025em]
            font-light
          "
                    >
                        <LineReveal delay={0.05}>From The Forest,</LineReveal>
                        <LineReveal delay={0.20}>To The Fire,</LineReveal>
                        <LineReveal delay={0.35}>
                            To The{" "}<span className="font-semibold">Cup.</span>
                        </LineReveal>
                    </h2>
                </div>

                {/* ── WIDE LANDSCAPE IMAGE PLACEHOLDER ──────────────────── */}
                {/* Reveals as a horizontal wipe from center outward */}
                <div className="relative mb-12 lg:mb-16 overflow-hidden" style={{ aspectRatio: "21 / 9" }}>

                    {/* The wipe reveal wrapper */}
                    <motion.div
                        initial={{ clipPath: "inset(0 50% 0 50%)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        viewport={{ once: true }}
                        className="absolute inset-0"
                    >

                        {/* Parallax inner layer */}
                        <motion.div
                            style={{ y: smoothImageY }}
                            className="absolute inset-[-6%] w-[112%] h-[112%]"
                        >
                            <Image
                                src="/images/origin/last-image.png"
                                alt="Forest Origin"
                                fill
                                className="object-cover"
                            />

                            {/* Keep subtle vignette for readability */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 40%, transparent 100%)",
                                }}
                            />
                        </motion.div>

                    </motion.div>

                    {/* ── DRIFTING COORDINATE OVERLAY ── the second unexpected thing ── */}
                    <motion.div
                        style={{ y: coordY }}
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    >
                        <div className="flex items-center gap-12 lg:gap-20">
                            <CoordCounter target={6.8756} label="Latitude N" duration={2.2} />
                            <div className="flex flex-col items-center gap-2">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-30">
                                    <circle cx="24" cy="24" r="23" stroke="#CACBA7" strokeWidth="0.6" />
                                    <circle cx="24" cy="24" r="14" stroke="#CACBA7" strokeWidth="0.4" />
                                    <circle cx="24" cy="24" r="6" stroke="#CACBA7" strokeWidth="0.4" />
                                    <circle cx="24" cy="24" r="1.5" fill="#CACBA7" />
                                    <line x1="24" y1="1" x2="24" y2="10" stroke="#CACBA7" strokeWidth="0.6" />
                                    <line x1="24" y1="38" x2="24" y2="47" stroke="#CACBA7" strokeWidth="0.6" />
                                    <line x1="1" y1="24" x2="10" y2="24" stroke="#CACBA7" strokeWidth="0.6" />
                                    <line x1="38" y1="24" x2="47" y2="24" stroke="#CACBA7" strokeWidth="0.6" />
                                    <polygon points="24,3 22,9 24,7 26,9" stroke="#CACBA7" strokeWidth="0.5" fill="none" />
                                </svg>
                                <span className="font-light text-[0.48rem] uppercase tracking-[0.4em]"
                                    style={{ color: 'rgba(255,255,255,0.50)' }}>
                                    Forest Farms
                                </span>
                            </div>
                            <CoordCounter target={39.6014} label="Longitude E" duration={2.2} />
                        </div>
                    </motion.div>

                    {/* Image metadata — bottom strip */}
                    <div className="absolute bottom-0 inset-x-0 px-6 py-4 z-20 flex items-end justify-between">
                        <span
                            className="text-[0.5rem] uppercase tracking-[0.38em] font-light"
                            style={{ color: "rgba(202,203,167,0.45)" }}
                        >
                            Image Placeholder
                        </span>
                        <span
                            className="text-[0.48rem] font-light"
                            style={{ color: "rgba(202,203,167,0.35)", fontFamily: "monospace", letterSpacing: "0.04em" }}
                        >
                            /images/origin/landscape.jpg &nbsp;·&nbsp; 3840 × 1646 px &nbsp;·&nbsp; 21 : 9
                        </span>
                    </div>

                    {/* Wipe edge hairlines — left + right appear as wipe completes */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.6 }}
                        viewport={{ once: true }}
                        className="absolute inset-y-0 left-0 w-px"
                        style={{ background: "rgba(202,203,167,0.15)" }}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.6 }}
                        viewport={{ once: true }}
                        className="absolute inset-y-0 right-0 w-px"
                        style={{ background: "rgba(202,203,167,0.15)" }}
                    />

                </div>

                {/* ── BOTTOM LAYOUT: body copy + stats ─────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-start">

                    {/* Body paragraph */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[1.1rem] lg:text-[1.25rem] font-light leading-[1.85] mb-8" style={{ color: 'rgba(255,255,255,0.72)' }}>
                            Coffee is more than a beverage.
                            It is the story of land, craftsmanship,
                            patience, and the countless hands that
                            guide every bean from origin to cup.
                        </p>

                        {/* Bold pull-quote */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                            viewport={{ once: true }}
                            className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
                            style={{ color: '#ffffff' }}
                        >
                            Every altitude,<br />every season,<br />every farmer.
                        </motion.p>

                        {/* Sage rule */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "3rem", opacity: 1 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-7 h-px"
                            style={{ background: "#6D8575" }}
                        />
                    </motion.div>

                    {/* Origin stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-0"
                    >
                        {[
                            { label: "Country", value: "Ethiopia" },
                            { label: "Region", value: "Yirgacheffe · Sidama" },
                            { label: "Altitude", value: "1,400 – 2,200 m" },
                            { label: "Processing", value: "Natural · Washed" },
                            { label: "Season", value: "Oct – Jan harvest" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-baseline justify-between py-4 border-b border-white/[0.07] group"
                            >
                                <span className="text-[0.68rem] uppercase tracking-[0.28em] font-light group-hover:opacity-70 transition-opacity duration-300"
                                    style={{ color: 'rgba(255,255,255,0.52)' }}>
                                    {stat.label}
                                </span>
                                <span className="text-[0.85rem] font-light group-hover:opacity-90 transition-opacity duration-300 text-right"
                                    style={{ color: 'rgba(255,255,255,0.80)' }}>
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                </div>

                {/* Bottom close */}
                <div className="mt-14 lg:mt-20 flex items-center gap-4">
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "left center" }}
                        className="flex-1 h-px bg-white/[0.08]"
                    />
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#6D8575" }}
                    />
                </div>

            </Section>
        </div>
    );
}