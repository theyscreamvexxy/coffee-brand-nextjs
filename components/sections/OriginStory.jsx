"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import LineReveal from "@/components/animations/LineReveal";

/* ── Animated coordinate counter ─── */
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
                    fontSize: "clamp(0.85rem, 2.5vw, 1.8rem)",
                    color: "rgba(202,203,167,0.7)",
                    fontFamily: "monospace",
                    letterSpacing: "0.06em",
                }}
            >
                {display}°
            </span>
            <span
                className="uppercase tracking-[0.35em] font-light"
                style={{ fontSize: "0.48rem", color: "rgba(202,203,167,0.35)" }}
            >
                {label}
            </span>
        </div>
    );
}

export default function OriginStory() {
    const sectionRef = useRef(null);
    const imgRef     = useRef(null);  // dedicated ref for the image reveal

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
        layoutEffect: false,
    });

    const coordY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
    const imageParY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
    const glowY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
    const smoothImageY = useSpring(imageParY, { stiffness: 60, damping: 20 });
    const imgInView    = useInView(imgRef, {
        once:   true,
        /*
         * margin: fire the reveal even when the image is slightly below the fold.
         * Prevents the race condition where an instant scroll jump (JourneySection
         * exit) causes the IntersectionObserver to check the old viewport position
         * and never re-trigger due to once:true.
         */
        margin: "0px 0px -40px 0px",
    });

    return (
        <div ref={sectionRef}>
            <Section className="overflow-hidden" style={{ background: "#0a1410", color: "#ffffff" }}>

                {/* Ambient glow */}
                <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04]"
                        style={{ background: "radial-gradient(circle, #AAB79A 0%, #3D5757 55%, transparent 75%)" }}
                    />
                </motion.div>

                {/* ── Section label ── */}
                <div className="mb-10 lg:mb-14">
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "left center" }}
                        className="h-px bg-white/[0.10] mb-7"
                    />
                    <div className="flex items-center justify-between">
                        <motion.p
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.0, delay: 0.1 }} viewport={{ once: true }}
                            className="uppercase tracking-[0.42em] text-[0.6rem] font-light"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                            Origin Story
                        </motion.p>
                        <motion.span
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.0, delay: 0.2 }} viewport={{ once: true }}
                            className="hidden sm:block text-[0.6rem] uppercase tracking-[0.3em] font-light"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                            §&ensp;003
                        </motion.span>
                    </div>
                </div>

                {/* ── Headline — masked line reveal ── */}
                <div className="mb-14 lg:mb-18">
                    <h2
                        className="text-[clamp(2.8rem,7.5vw,7rem)] tracking-[-0.025em] font-light"
                    >
                        <LineReveal delay={0.05} blur={20}>From The Forest,</LineReveal>
                        <LineReveal delay={0.20} blur={20}>To The Fire,</LineReveal>
                        <LineReveal delay={0.35} blur={20}>
                            To The <span className="font-semibold">Cup.</span>
                        </LineReveal>
                    </h2>
                </div>

                {/* ── Wide landscape image — horizontal wipe + parallax ── */}
                <div
                    ref={imgRef}
                    className="relative mb-10 lg:mb-16 overflow-hidden aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]"
                >

                    {/*
                     * Wipe + slight rotation correction.
                     * Uses animate + useInView instead of whileInView because
                     * whileInView has a race condition with instant scroll jumps:
                     * the IntersectionObserver fires before the DOM scroll position
                     * updates, sees the element as "not in view", and with once:true
                     * never re-checks. useInView fires after DOM paint — reliable.
                     */}
                    <motion.div
                        animate={imgInView
                            ? { clipPath: "inset(0 0% 0 0%)", rotate: 0 }
                            : { clipPath: "inset(0 50% 0 50%)", rotate: 0.6 }
                        }
                        transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="absolute inset-0"
                    >
                        {/* Parallax inner layer */}
                        <motion.div
                            style={{ y: smoothImageY }}
                            className="absolute inset-[-7%] w-[114%] h-[114%]"
                        >
                            <Image
                                src="/images/origin/last-image.png"
                                alt="Forest Origin"
                                fill
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.10) 40%, transparent 100%)" }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Coordinate overlay — parallax drift */}
                    <motion.div
                        style={{ y: coordY }}
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    >
                        <div className="flex items-center gap-6 md:gap-12 lg:gap-20">
                            <CoordCounter target={6.8756} label="Latitude N" duration={1.8} />
                            <div className="flex flex-col items-center gap-2">
                                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="opacity-25 md:w-12 md:h-12">
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
                                <span className="font-light text-[0.48rem] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                                    Forest Farms
                                </span>
                            </div>
                            <CoordCounter target={39.6014} label="Longitude E" duration={1.8} />
                        </div>
                    </motion.div>

                    {/* Edge hairlines appear after wipe */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.8 }} viewport={{ once: true }}
                        className="absolute inset-y-0 left-0 w-px" style={{ background: "rgba(202,203,167,0.15)" }} />
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.8 }} viewport={{ once: true }}
                        className="absolute inset-y-0 right-0 w-px" style={{ background: "rgba(202,203,167,0.15)" }} />
                </div>

                {/* ── Body copy + stats ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-start">

                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} viewport={{ once: true }}
                    >
                        <p className="text-[0.95rem] lg:text-[1.25rem] font-light leading-[1.85] mb-8" style={{ color: "rgba(255,255,255,0.68)" }}>
                            Coffee is more than a beverage. It is the story of land, craftsmanship, patience,
                            and the countless hands that guide every bean from origin to cup.
                        </p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.22 }} viewport={{ once: true }}
                            className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.015em]"
                            style={{ color: "#ffffff" }}
                        >
                            Every altitude,<br />every season,<br />every farmer.
                        </motion.p>
                        <motion.div
                            initial={{ width: 0, opacity: 0 }} whileInView={{ width: "3rem", opacity: 1 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} viewport={{ once: true }}
                            className="mt-7 h-px" style={{ background: "#6D8575" }}
                        />
                    </motion.div>

                    {/* Stats — each row draws its border on enter */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} viewport={{ once: true }}
                        className="space-y-0"
                    >
                        {[
                            { label: "Country", value: "Ethiopia" },
                            { label: "Region", value: "Yirgacheffe · Sidama" },
                            { label: "Altitude", value: "1,400 – 2,200 m" },
                            { label: "Processing", value: "Natural · Washed" },
                            { label: "Season", value: "Oct – Jan harvest" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: 16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.08 }}
                                viewport={{ once: true }}
                                className="flex items-baseline justify-between py-4 group"
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                <span className="text-[0.68rem] uppercase tracking-[0.28em] font-light group-hover:opacity-70 transition-opacity duration-300" style={{ color: "rgba(255,255,255,0.48)" }}>
                                    {stat.label}
                                </span>
                                <span className="text-[0.85rem] font-light group-hover:opacity-90 transition-opacity duration-300 text-right" style={{ color: "rgba(255,255,255,0.78)" }}>
                                    {stat.value}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom close */}
                <div className="mt-14 lg:mt-20 flex items-center gap-4">
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.0 }} viewport={{ once: true }}
                        style={{ transformOrigin: "left center" }}
                        className="flex-1 h-px bg-white/[0.07]"
                    />
                    <motion.span
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#6D8575" }}
                    />
                </div>

            </Section>
        </div>
    );
}