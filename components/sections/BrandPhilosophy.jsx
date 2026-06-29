"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/layout/Section";
import LineReveal from "@/components/animations/LineReveal";
import ImageReveal from "@/components/animations/ImageReveal";

/* ── Animation presets ── */
const fadeUp = (delay = 0, y = 24) => ({
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

function Rule({ delay = 0 }) {
    return (
        <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left center", background: "var(--rule-strong)" }}
            className="h-px"
        />
    );
}

export default function BrandPhilosophy() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const circleY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

    return (
        <div ref={sectionRef}>
            <Section
                className="overflow-hidden relative"
                style={{ background: "#111a14", color: "#CACBA7" }}
            >
                {/* ── Ambient parallax glow ── */}
                <motion.div
                    aria-hidden
                    style={{ y: circleY }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden"
                >
                    <div
                        className="w-[700px] h-[700px] rounded-full opacity-[0.045]"
                        style={{
                            background: "radial-gradient(circle, #CACBA7 0%, #6D8575 50%, transparent 75%)",
                            transform: "translateX(30%)",
                        }}
                    />
                </motion.div>

                {/* ── Top rule + label ── */}
                <div className="mb-8 lg:mb-20">
                    <Rule delay={0} />
                    <div className="flex items-center justify-between mt-7">
                        <motion.p
                            {...fadeIn(0.1)}
                            className="uppercase tracking-[0.42em] text-[0.6rem] font-light"
                            style={{ color: "var(--text-label)" }}
                        >
                            Our Philosophy
                        </motion.p>
                        <motion.span
                            {...fadeIn(0.2)}
                            className="hidden sm:block text-[0.6rem] uppercase tracking-[0.3em] font-light"
                            style={{ color: "rgba(202,203,167,0.22)" }}
                        >
                            §&ensp;001
                        </motion.span>
                    </div>
                </div>

                {/* ── Manifesto headline + right image ── */}
                <div className="mb-14 lg:mb-28 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">

                    {/* LEFT — staggered word-by-word reveal */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2
                                className="text-[clamp(2.6rem,7.5vw,8.5rem)] leading-[0.87] tracking-[-0.025em] font-light"
                                style={{ color: "#CACBA7" }}
                            >
                                {["THE", "FOREST", "DOESN'T", "GROW", "COFFEE."].map((word, i) => (
                                    <LineReveal key={word} delay={0.05 + i * 0.08} blur={18}>
                                        {word}
                                    </LineReveal>
                                ))}
                            </h2>
                        </div>

                        {/* Accent rule */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "4rem", opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                            viewport={{ once: true }}
                            className="my-6 lg:my-8 h-px"
                            style={{ background: "#6D8575" }}
                        />

                        <div>
                            <h2
                                className="text-[clamp(2.6rem,7.5vw,8.5rem)] leading-[0.87] tracking-[-0.025em] font-semibold text-white"
                            >
                                {["PEOPLE", "DO."].map((word, i) => (
                                    <LineReveal key={word} delay={0.52 + i * 0.1} blur={18}>
                                        {word}
                                    </LineReveal>
                                ))}
                            </h2>
                        </div>
                    </div>

                    {/* RIGHT — clip-path image wipe */}
                    <ImageReveal
                        src="/images/coffee/roasting.png"
                        alt="Coffee Roasting"
                        direction="left"
                        delay={0.2}
                        duration={1.5}
                        scale={1.07}
                        aspectRatio="auto"
                        style={{ minHeight: "260px" }}
                    />
                </div>

                {/* ── Rule break ── */}
                <Rule delay={0.1} />

                {/* ── Body copy — asymmetric grid ── */}
                <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-start">

                    {/* Left image — center wipe */}
                    <ImageReveal
                        src="/images/coffee/beans-macro.png"
                        alt="Roasting Process"
                        direction="center"
                        delay={0.14}
                        duration={1.6}
                        scale={1.06}
                        aspectRatio="4/5"
                    />

                    {/* Right — paragraphs with staggered reveal */}
                    <div className="flex flex-col h-full">
                        <div className="space-y-0">
                            {[
                                "Every bean carries the story of a farmer, a landscape, and a season.",
                                "At Forest Farmer Coffee Roasters, we honour those stories through thoughtful sourcing, precision roasting, and an unwavering respect for origin.",
                                "We believe exceptional coffee begins long before the roast — in the forests, farms, and hands that nurture it.",
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp(0.1 + i * 0.12)}
                                    className={`${i < 2 ? "border-b" : ""} ${i === 0 ? "pb-8" : i === 1 ? "py-8" : "pt-8 pb-8"}`}
                                    style={{ borderColor: "var(--rule-subtle)" }}
                                >
                                    <p
                                        className="text-[1.05rem] lg:text-[1.15rem] font-light leading-[1.85]"
                                        style={{ color: "rgba(170,183,154,0.80)" }}
                                    >
                                        {text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bold pull statement */}
                        <motion.div {...fadeUp(0.44, 30)} className="mt-10 lg:mt-auto lg:pt-12">
                            <p className="uppercase tracking-[0.38em] text-[0.58rem] font-light mb-5" style={{ color: "var(--text-label)" }}>
                                Our Commitment
                            </p>
                            <h3 className="text-[clamp(1.8rem,4.2vw,4.2rem)] leading-[0.88] tracking-[-0.025em] font-bold text-white">
                                ROOTED<br />IN RESPECT.
                            </h3>
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

                {/* ── Bottom close ── */}
                <div className="mt-10 lg:mt-24 flex items-center gap-4">
                    <Rule delay={0.2} />
                    <motion.span
                        {...fadeIn(0.4)}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#6D8575" }}
                    />
                </div>
            </Section>
        </div>
    );
}