"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/layout/Section";

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const reveal = (delay = 0, y = 22) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1], delay },
    viewport: { once: true },
});

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 1.2, ease: "easeOut", delay },
    viewport: { once: true },
});

/* ─────────────────────────────────────────────
   Thin sage rule
───────────────────────────────────────────── */
function Rule({ className = "" }) {
    return (
        <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left center" }}
            className={`h-px ${className}`}
        />
    );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function BrandPhilosophy() {
    const sectionRef = useRef(null);

    /* Subtle parallax on the large ambient circle */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const circleY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <div ref={sectionRef}>
            <Section className="overflow-hidden" style={{ background: '#1a2e24', color: '#CACBA7' }}>

                {/* ── AMBIENT BACKGROUND GLOW ──────────────────────────────────── */}
                <motion.div
                    aria-hidden
                    style={{ y: circleY }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden"
                >
                    <div
                        className="w-[700px] h-[700px] rounded-full opacity-[0.045]"
                        style={{
                            background:
                                "radial-gradient(circle, #CACBA7 0%, #6D8575 50%, transparent 75%)",
                            transform: "translateX(30%)",
                        }}
                    />
                </motion.div>

                {/* ── TOP RULE + LABEL ─────────────────────────────────────────── */}
                <div className="mb-14 lg:mb-20">
                    <Rule className="mb-7" style={{ background: 'var(--rule-strong)' }} />
                    <div className="flex items-center justify-between">
                        <motion.p
                            {...fadeIn(0.1)}
                            className="uppercase tracking-[0.42em] text-[0.6rem] font-light"
                            style={{ color: 'var(--text-label)' }}
                        >
                            Our Philosophy
                        </motion.p>
                        {/* Right-side index notation — editorial detail */}
                        <motion.span
                            {...fadeIn(0.2)}
                            className="hidden sm:block text-[0.6rem] uppercase tracking-[0.3em] font-light"
                            style={{ color: 'rgba(202,203,167,0.22)' }}
                        >
                            §&ensp;001
                        </motion.span>
                    </div>
                </div>

                {/* ── MANIFESTO HEADLINE ───────────────────────────────────────── */}
                {/*
          Two-weight tension:
          Light = "THE FOREST DOESN'T GROW COFFEE."  — statement of fact, cool
          Heavy = "PEOPLE DO."                         — the truth, warm, grounded
      */}
                {/* ── MANIFESTO HEADLINE + RIGHT IMAGE ─────────────────────────── */}
                <div className="mb-20 lg:mb-28 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* LEFT — the manifesto text */}
                    <div className="flex flex-col justify-between">

                        <div className="overflow-hidden">
                            <motion.h2
                                {...reveal(0.08, 40)}
                                className="
                text-[clamp(3.2rem,7.5vw,8.5rem)]
                leading-[0.87]
                tracking-[-0.025em]
                font-light
              "
                                style={{ color: '#CACBA7' }}
                            >
                                THE
                                <br />
                                FOREST
                                <br />
                                DOESN&apos;T
                                <br />
                                GROW
                                <br />
                                COFFEE.
                            </motion.h2>
                        </div>

                        {/* Sage accent rule */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "4rem", opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
                            viewport={{ once: true }}
                            className="my-6 lg:my-8 h-px"
                            style={{ background: "#6D8575" }}
                        />

                        <div className="overflow-hidden">
                            <motion.h2
                                {...reveal(0.38, 40)}
                                className="
                text-[clamp(3.2rem,7.5vw,8.5rem)]
                leading-[0.87]
                tracking-[-0.025em]
                font-semibold
                text-white
              "
                            >
                                PEOPLE
                                <br />
                                DO.
                            </motion.h2>
                        </div>

                    </div>

                    <motion.div
                        {...fadeIn(0.2)}
                        className="relative w-full overflow-hidden min-h-[320px] lg:min-h-0"
                    >
                        <Image
                            src="/images/coffee/roasting.png"
                            alt="Coffee Roasting"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* ── RULE BREAK ───────────────────────────────────────────────── */}
                <Rule className="mb-16 lg:mb-20" style={{ background: 'var(--rule-subtle)' }} />

                {/* ── BODY COPY — THREE BREATHING PARAGRAPHS ───────────────────── */}
                {/*
          Grid: left column is intentionally empty on desktop —
          the body copy is right-offset, creating asymmetric negative space
          that echoes the headline's left dominance.
      */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

                    <motion.div
                        {...fadeIn(0.14)}
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "4 / 5" }}
                    >
                        <Image
                            src="/images/coffee/beans-macro.png"
                            alt="Roasting Process"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Body paragraphs + bold statement */}
                    <div className="flex flex-col h-full">

                        <div className="space-y-0">

                            <motion.div {...reveal(0.12)} className="pb-8 border-b" style={{ borderColor: 'var(--rule-subtle)' }}>
                                <p
                                    className="
                  text-[1.05rem] lg:text-[1.15rem]
                  font-light leading-[1.85]
                "
                                    style={{ color: 'rgba(170,183,154,0.80)' }}
                                >
                                    Every bean carries the story of a farmer,
                                    a landscape, and a season.
                                </p>
                            </motion.div>

                            <motion.div {...reveal(0.22)} className="py-8 border-b" style={{ borderColor: 'var(--rule-subtle)' }}>
                                <p
                                    className="
                  text-[1.05rem] lg:text-[1.15rem]
                  font-light leading-[1.85]
                "
                                    style={{ color: 'rgba(170,183,154,0.80)' }}
                                >
                                    At Forest Farmer Coffee Roasters, we honour those
                                    stories through thoughtful sourcing, precision
                                    roasting, and an unwavering respect for origin.
                                </p>
                            </motion.div>

                            <motion.div {...reveal(0.32)} className="pt-8 pb-8 border-b" style={{ borderColor: 'var(--rule-subtle)' }}>
                                <p
                                    className="
                  text-[1.05rem] lg:text-[1.15rem]
                  font-light leading-[1.85]
                "
                                    style={{ color: 'rgba(170,183,154,0.80)' }}
                                >
                                    We believe exceptional coffee begins long before
                                    the roast — in the forests, farms, and hands
                                    that nurture it.
                                </p>
                            </motion.div>

                        </div>

                        {/* ── BOLD PULL STATEMENT — fills empty space below paragraphs ── */}
                        <motion.div
                            {...reveal(0.44, 30)}
                            className="mt-10 lg:mt-auto lg:pt-12"
                        >
                            {/* Micro label above */}
                            <p className="
              uppercase tracking-[0.38em] text-[0.58rem]
              font-light mb-5
            "
                                style={{ color: 'var(--text-label)' }}>
                                Our Commitment
                            </p>

                            <h3
                                className="
                text-[clamp(2rem,4.2vw,4.2rem)]
                leading-[0.88]
                tracking-[-0.025em]
                font-bold
                text-white
              "
                            >
                                ROOTED
                                <br />
                                IN RESPECT.
                            </h3>

                            {/* Sage underline accent */}
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: "3rem", opacity: 1 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                                viewport={{ once: true }}
                                className="mt-5 h-px"
                                style={{ background: "#6D8575" }}
                            />
                        </motion.div>

                    </div>

                </div>

                {/* ── BOTTOM RULE + SAGE ACCENT DOT ────────────────────────────── */}
                <div className="mt-16 lg:mt-24 flex items-center gap-4">
                    <Rule className="flex-1" style={{ background: 'var(--rule-subtle)' }} />
                    <motion.span
                        {...fadeIn(0.4)}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#6D8575" }}
                    />
                </div>

            </Section >
        </div >
    );
}