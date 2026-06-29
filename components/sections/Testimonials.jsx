"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import LineReveal from "@/components/animations/LineReveal";

const testimonials = [
    {
        quote: "Coffee should tell the story of where it came from. Forest Farmer does exactly that.",
        author: "Specialty Coffee Enthusiast",
    },
    {
        quote: "Every cup feels intentional. Clean, balanced and beautifully roasted.",
        author: "Independent Roaster",
    },
    {
        quote: "One of the most thoughtful coffees I've experienced in recent years.",
        author: "Coffee Journal",
    },
];

export default function Testimonials() {
    return (
        <Section className="text-white overflow-hidden" style={{ background: "#0a1410" }}>

            {/* ── Header ── */}
            <div className="mb-20">
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left center" }}
                    className="h-px bg-white/10 mb-8"
                />
                <p className="uppercase tracking-[0.4em] text-[0.65rem] text-white/35 mb-8">
                    Testimonials
                </p>
                <h2 className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-light">
                    <LineReveal delay={0.05} blur={16}>What People</LineReveal>
                    <LineReveal delay={0.18} blur={16}>
                        Are <span className="font-semibold">Saying.</span>
                    </LineReveal>
                </h2>
            </div>

            {/* ── Testimonials — 3-col desktop, 2-col tablet, stacked mobile ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.1 + index * 0.14,
                        }}
                        viewport={{ once: true }}
                        className="group relative"
                        style={{
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            /* On tablet+ the col border re-creates the vertical rule;
                               on mobile remove it — cards stack so left border looks wrong */
                            borderLeft: index > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                            padding: "clamp(24px, 5vw, 40px) clamp(20px, 4vw, 36px)",
                        }}
                    >
                        {/* Left accent — grows on hover */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-px origin-top"
                            style={{
                                background: "#6D8575",
                                transform: "scaleY(0)",
                                transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
                            }}
                            onMouseEnter={undefined}
                        />
                        <motion.div
                            className="absolute left-0 top-0 bottom-0 w-px"
                            style={{ background: "#6D8575", transformOrigin: "top" }}
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 0 }}
                            viewport={{ once: false }}
                        />

                        {/* Decorative quote mark */}
                        <div
                            className="mb-6 select-none leading-none"
                            style={{
                                fontFamily: "var(--font-cormorant)",
                                fontSize: "4rem",
                                color: "#6D8575",
                                opacity: 0.5,
                                lineHeight: 1,
                            }}
                        >
                            "
                        </div>

                        <blockquote
                            className="text-[clamp(1rem,4vw,1.5rem)] leading-[1.4] max-w-sm font-light mb-8"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                            {item.quote}
                        </blockquote>

                        {/* Author line — draws in */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "1.5rem", opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="h-px mb-4"
                            style={{ background: "#6D8575" }}
                        />

                        <p
                            className="uppercase tracking-[0.25em] text-[0.62rem] font-light"
                            style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                            {item.author}
                        </p>

                        {/* Hover left border using CSS group */}
                        <style>{`
                            .testimonial-card:hover .testimonial-accent {
                                transform: scaleY(1);
                            }
                        `}</style>
                    </motion.div>
                ))}
            </div>

            {/* Bottom close */}
            <div className="mt-12 lg:mt-16 flex items-center gap-4">
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.0 }} viewport={{ once: true }}
                    style={{ transformOrigin: "left center" }}
                    className="flex-1 h-px bg-white/[0.06]"
                />
                <motion.span
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#6D8575" }}
                />
            </div>

        </Section>
    );
}