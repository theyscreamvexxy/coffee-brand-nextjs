"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Section from "@/components/layout/Section";
import LineReveal from "@/components/animations/LineReveal";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
    viewport: { once: true },
});
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 1.1, ease: "easeOut", delay },
    viewport: { once: true },
});

/* Animated border frame that draws itself */
function AnimatedFrame({ children }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <div
            ref={ref}
            className="relative"
            style={{ border: "1px solid rgba(202,203,167,0.10)" }}
        >
            {/* Corner accents — each corner staggered */}
            {[
                ["top-0 left-0", "border-t border-l"],
                ["top-0 right-0", "border-t border-r"],
                ["bottom-0 left-0", "border-b border-l"],
                ["bottom-0 right-0", "border-b border-r"],
            ].map(([pos, borders], i) => (
                <motion.span
                    key={pos}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`pointer-events-none absolute ${pos} w-10 h-10 ${borders}`}
                    style={{ borderColor: "rgba(255,255,255,0.22)" }}
                />
            ))}
            {children}
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div
            className="flex items-baseline justify-between py-4 group"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
        >
            <span
                className="text-sm uppercase tracking-[0.22em] font-light group-hover:opacity-80 transition-opacity duration-300"
                style={{ color: "rgba(255,255,255,0.55)" }}
            >
                {label}
            </span>
            <span
                className="text-sm font-light group-hover:opacity-90 transition-opacity duration-300"
                style={{ color: "rgba(255,255,255,0.85)" }}
            >
                {value}
            </span>
        </div>
    );
}

export default function SignatureCollection() {
    return (
        <Section className="overflow-hidden" style={{ background: "#0d1710", color: "#ffffff" }}>

            {/* ── Editorial animated frame ── */}
            <AnimatedFrame>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr] min-h-[540px] lg:min-h-[680px]">

                    {/* Left panel */}
                    <div
                        className="flex flex-col justify-between px-8 py-10 lg:px-14 lg:py-14 border-b lg:border-b-0 lg:border-r"
                        style={{ borderColor: "rgba(202,203,167,0.09)" }}
                    >
                        <motion.p
                            {...fadeIn(0.12)}
                            className="uppercase tracking-[0.38em] text-[0.65rem] font-light mb-auto"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                            Signature Collection
                        </motion.p>

                        <div className="mt-12 lg:mt-0">
                            <h2 className="text-[clamp(2.6rem,6.5vw,5.4rem)] leading-[0.92] font-light tracking-[-0.02em]">
                                <LineReveal delay={0.18} blur={14}>Crafted for</LineReveal>
                                <LineReveal delay={0.30} blur={14}>
                                    <em className="not-italic" style={{ color: "rgba(255,255,255,0.38)" }}>
                                        slow mornings.
                                    </em>
                                </LineReveal>
                            </h2>
                        </div>

                        <motion.span
                            {...fadeIn(0.55)}
                            className="hidden lg:block mt-12 text-[0.6rem] uppercase tracking-[0.32em] font-light"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                            Est.&ensp;MMXXIV
                        </motion.span>
                    </div>

                    {/* Right panel — product image with scale reveal */}
                    <motion.div
                        initial={{ clipPath: "inset(0 0% 0 100%)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden"
                        style={{ minHeight: "380px" }}
                    >
                        <motion.div
                            initial={{ scale: 1.08 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                            viewport={{ once: true }}
                            className="absolute inset-0"
                            data-cursor="view"
                        >
                            <Image
                                src="/images/coffee/signature-bag.png"
                                alt="Estate Blend"
                                fill
                                className="object-cover transition-transform duration-700 ease-out"
                                style={{ transformOrigin: "center center" }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                            />
                            {/* Subtle overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(to right, rgba(10,20,16,0.35) 0%, transparent 40%)",
                                }}
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </AnimatedFrame>

            {/* ── Product details below frame ── */}
            <div
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr]"
                style={{ border: "1px solid rgba(202,203,167,0.10)", borderTop: "none" }}
            >
                {/* Logo column */}
                <motion.div
                    {...fadeIn(0.1)}
                    className="flex items-center justify-center border-b lg:border-b-0 lg:border-r py-10 lg:py-0 min-h-[120px] lg:min-h-0"
                    style={{ borderColor: "rgba(202,203,167,0.09)" }}
                >
                    <div
                        className="relative w-[80px] sm:w-[100px] lg:w-[120px] xl:w-[140px] opacity-50"
                        style={{ transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.04)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.50"; e.currentTarget.style.transform = "scale(1)"; }}
                    >
                        <Image
                            src="/images/brand/logo.png"
                            alt="Forest Farmer Coffee Roasters"
                            width={280}
                            height={280}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </motion.div>

                {/* Product info */}
                <div className="px-8 py-10 lg:px-14 lg:py-12">
                    <motion.h3
                        {...fadeUp(0.08)}
                        className="text-[clamp(1.8rem,4vw,3rem)] font-light tracking-[-0.01em] mb-5"
                        style={{ color: "#CACBA7" }}
                    >
                        Estate Blend
                    </motion.h3>
                    <motion.p
                        {...fadeUp(0.16)}
                        className="font-light leading-[1.75] text-[0.95rem] max-w-lg mb-10"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                        A balanced expression of origin, craftsmanship and patience.
                        Designed for those who appreciate depth, sweetness and clarity in every cup.
                    </motion.p>
                    <motion.div {...fadeUp(0.24)} className="max-w-lg">
                        <DetailRow label="Tasting Notes" value="Chocolate · Caramel · Citrus" />
                        <DetailRow label="Roast" value="Medium" />
                        <DetailRow label="Origin" value="Forest Farms" />
                    </motion.div>
                </div>
            </div>

        </Section>
    );
}