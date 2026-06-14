"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";

/* ─────────────────────────────────────────────
   Steps — all original copy preserved + enriched
───────────────────────────────────────────── */
const steps = [
    {
        number: "01",
        title: "Origin",
        subheading: "Where every\ncup is born.",
        text: "Coffee begins with people, not machines. Every harvest carries the character of its land, climate and caretakers.",
        details: [
            { label: "Altitude", value: "1,400 – 2,200 m" },
            { label: "Harvest", value: "Hand-picked, selective" },
            { label: "Region", value: "Forest Farms, Ethiopia" },
        ],
        image: "/images/coffee/farmer.png",
        imageDims: "1200 × 1500 px",
        gradientFrom: "#4a3728", gradientMid: "#7a5c3e", gradientTo: "#b08a60",
        grainAngle: "145deg",
        label: "ORIGIN · FARM",
        /* Geometric: compass rose — the "where" of origin */
        Shape: CompassShape,
    },
    {
        number: "02",
        title: "Selection",
        subheading: "Only the finest\nmake it through.",
        text: "Only exceptional cherries become exceptional coffee. Quality starts long before roasting ever begins.",
        details: [
            { label: "Grade", value: "Specialty, SCA 85+" },
            { label: "Method", value: "Visual + density sort" },
            { label: "Rejection rate", value: "Up to 60% discarded" },
        ],
        image: "/images/coffee/beans-macro.png",
        imageDims: "1200 × 1500 px",
        gradientFrom: "#3D5757", gradientMid: "#5c4040", gradientTo: "#8a5050",
        grainAngle: "110deg",
        label: "SELECTION · CHERRY",
        /* Geometric: concentric hexagons — cell structure of a cherry */
        Shape: HexagonShape,
    },
    {
        number: "03",
        title: "Roasting",
        subheading: "Heat into\ncharacter.",
        text: "Precision transforms potential into character. Every second influences flavour, aroma and balance.",
        details: [
            { label: "Temperature", value: "185 – 220 °C" },
            { label: "Duration", value: "10 – 14 minutes" },
            { label: "Profile", value: "Artisan drum roast" },
        ],
        image: "/images/origin/philosophy-farmer.png",
        imageDims: "1200 × 1500 px",
        gradientFrom: "#1a1a1a", gradientMid: "#3a2e1e", gradientTo: "#5a4020",
        grainAngle: "160deg",
        label: "ROASTING · HEAT",
        /* Geometric: radiating arcs — heat waves from a point source */
        Shape: HeatShape,
    },
    {
        number: "04",
        title: "Brewing",
        subheading: "The quiet\nritual of taste.",
        text: "The final expression of every decision before it. A quiet ritual that brings the journey full circle.",
        details: [
            { label: "Ratio", value: "1 : 15  coffee to water" },
            { label: "Temperature", value: "91 – 94 °C" },
            { label: "Method", value: "Pour-over · Immersion" },
        ],
        image: "/images/coffee/brewing.png",
        imageDims: "1200 × 1500 px",
        gradientFrom: "#3D5757", gradientMid: "#6D8575", gradientTo: "#AAB79A",
        grainAngle: "125deg",
        label: "BREWING · CUP",
        /* Geometric: concentric rings with drop — ripple in a cup */
        Shape: RippleShape,
    },
];

/* ─────────────────────────────────────────────
   Geometric SVG shapes — hollow, editorial
───────────────────────────────────────────── */

function CompassShape() {
    /* Compass rose — cardinal directions, the "where" of origin */
    return (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="opacity-[0.11]">
            <circle cx="90" cy="90" r="88" stroke="#CACBA7" strokeWidth="0.6" />
            <circle cx="90" cy="90" r="60" stroke="#CACBA7" strokeWidth="0.4" />
            <circle cx="90" cy="90" r="32" stroke="#CACBA7" strokeWidth="0.4" />
            <circle cx="90" cy="90" r="4" stroke="#CACBA7" strokeWidth="0.8" />
            {/* Cardinal spokes */}
            {[0, 45, 90, 135].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 90 90)`}>
                    <line x1="90" y1="2" x2="90" y2="58" stroke="#CACBA7" strokeWidth="0.5" />
                    <line x1="90" y1="122" x2="90" y2="178" stroke="#CACBA7" strokeWidth="0.5" />
                </g>
            ))}
            {/* N pointer */}
            <polygon points="90,10 86,30 90,26 94,30" stroke="#CACBA7" strokeWidth="0.6" fill="none" />
        </svg>
    );
}

function HexagonShape() {
    /* Concentric hexagons — cherry cell structure */
    const hex = (cx, cy, r) => {
        const pts = [];
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 180) * (60 * i - 30);
            pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
        }
        return pts.join(" ");
    };
    return (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="opacity-[0.11]">
            {[85, 64, 44, 26, 10].map((r, i) => (
                <polygon key={r} points={hex(90, 90, r)} stroke="#CACBA7" strokeWidth={i === 0 ? 0.5 : 0.4} />
            ))}
            {/* Cross-section lines */}
            {[0, 60, 120].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 90 90)`}>
                    <line x1="90" y1="5" x2="90" y2="175" stroke="#CACBA7" strokeWidth="0.3" strokeDasharray="2 6" />
                </g>
            ))}
        </svg>
    );
}

function HeatShape() {
    /* Radiating arcs — heat waves */
    return (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="opacity-[0.11]">
            {/* Center point */}
            <circle cx="90" cy="90" r="3" stroke="#CACBA7" strokeWidth="0.8" />
            {/* Expanding arcs — top hemisphere only, like heat rising */}
            {[20, 36, 52, 68, 84].map((r) => (
                <path
                    key={r}
                    d={`M ${90 - r} 90 A ${r} ${r} 0 0 1 ${90 + r} 90`}
                    stroke="#CACBA7"
                    strokeWidth="0.5"
                />
            ))}
            {/* Radiating spines */}
            {[-80, -55, -30, 0, 30, 55, 80].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                    <line
                        key={deg}
                        x1="90"
                        y1="90"
                        x2={90 + 84 * Math.sin(rad)}
                        y2={90 - 84 * Math.cos(rad)}
                        stroke="#CACBA7"
                        strokeWidth="0.4"
                        strokeDasharray="3 5"
                    />
                );
            })}
            {/* Full outer arc */}
            <path d="M 2 90 A 88 88 0 0 1 178 90" stroke="#CACBA7" strokeWidth="0.4" />
        </svg>
    );
}

function RippleShape() {
    /* Concentric rings + drop — ripple in a cup */
    return (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="opacity-[0.11]">
            {[88, 70, 52, 36, 22, 10].map((r) => (
                <ellipse key={r} cx="90" cy="95" rx={r} ry={r * 0.45} stroke="#CACBA7" strokeWidth="0.5" />
            ))}
            {/* Drop */}
            <path d="M90 30 Q96 44 90 54 Q84 44 90 30Z" stroke="#CACBA7" strokeWidth="0.7" />
            {/* Vertical axis */}
            <line x1="90" y1="54" x2="90" y2="95" stroke="#CACBA7" strokeWidth="0.4" strokeDasharray="2 4" />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Animation presets
───────────────────────────────────────────── */
const reveal = (delay = 0, y = 24) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
    viewport: { once: true },
});

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 1.2, ease: "easeOut", delay },
    viewport: { once: true },
});

function Rule({ className = "" }) {
    return (
        <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left center" }}
            className={`h-px ${className}`}
        />
    );
}

/* ─────────────────────────────────────────────
   Image Placeholder
───────────────────────────────────────────── */
function StepPlaceholder({ step }) {
    return (
        <motion.div
            {...fadeIn(0.12)}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "4 / 5" }}
        >
            <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
            />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Content block — enriched with subheading,
   data points, and a unique geometric shape
───────────────────────────────────────────── */
function ContentBlock({ step, delay = 0 }) {
    const { Shape } = step;

    return (
        <div className="flex flex-col justify-between h-full py-2 relative">

            {/* Ghost geometric shape — top-right of content area */}
            <motion.div
                {...fadeIn(delay + 0.3)}
                className="absolute top-0 right-0 pointer-events-none hidden lg:block"
                style={{ transform: "translate(10%, -10%)" }}
            >
                <Shape />
            </motion.div>

            {/* ── TOP: step indicator + number ── */}
            <div>
                <motion.div {...reveal(delay)} className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-px" style={{ background: "#6D8575" }} />
                    <span className="text-[0.6rem] uppercase tracking-[0.38em] font-light" style={{ color: "#6D8575" }}>
                        Step {step.number}
                    </span>
                </motion.div>

                {/* Ghost step number */}
                <motion.div
                    {...fadeIn(delay)}
                    className="text-[clamp(4.5rem,10vw,9rem)] font-bold leading-none select-none mb-[-0.5rem]"
                    style={{ color: 'rgba(202,203,167,0.05)' }}
                >
                    {step.number}
                </motion.div>

                {/* Title */}
                <motion.h3
                    {...reveal(delay + 0.1)}
                    className="text-[clamp(2.6rem,5.5vw,4.5rem)] font-light leading-[0.88] tracking-[-0.025em] mb-6"
                    style={{ color: '#CACBA7' }}
                >
                    {step.title}
                </motion.h3>

                {/* ── BOLD SUBHEADING ── */}
                <motion.p
                    {...reveal(delay + 0.16)}
                    className="text-[clamp(1.1rem,2.2vw,1.6rem)] font-semibold leading-[1.15] tracking-[-0.01em] mb-6 whitespace-pre-line"
                    style={{ color: '#ffffff' }}
                >
                    {step.subheading}
                </motion.p>

                {/* Description */}
                <motion.p
                    {...reveal(delay + 0.22)}
                    className="text-[0.98rem] lg:text-[1.05rem] font-light leading-[1.85] max-w-md mb-10"
                    style={{ color: 'rgba(170,183,154,0.82)' }}
                >
                    {step.text}
                </motion.p>
            </div>

            {/* ── BOTTOM: key data points ── */}
            <motion.div {...reveal(delay + 0.3)} className="space-y-0 max-w-sm">
                {step.details.map((d, i) => (
                    <div
                        key={d.label}
                        className="flex items-baseline justify-between py-3 group"
                        style={{ borderBottom: '1px solid rgba(202,203,167,0.10)' }}
                    >
                        <span className="text-[0.7rem] uppercase tracking-[0.28em] font-light group-hover:opacity-70 transition-opacity duration-300" style={{ color: 'rgba(202,203,167,0.50)' }}>
                            {d.label}
                        </span>
                        <span className="text-[0.82rem] font-light group-hover:opacity-90 transition-opacity duration-300" style={{ color: 'rgba(170,183,154,0.80)' }}>
                            {d.value}
                        </span>
                    </div>
                ))}
            </motion.div>

        </div>
    );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function JourneySection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const glowY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <div ref={sectionRef}>
            <Section className="overflow-hidden" style={{ background: '#1a2e24', color: '#CACBA7' }}>

                {/* Ambient glow */}
                <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
                        style={{ background: "radial-gradient(circle, #CACBA7 0%, #AAB79A 50%, transparent 75%)" }}
                    />
                </motion.div>

                {/* ── HEADER ─────────────────────────────────────── */}
                <div className="mb-6">
                    <Rule className="mb-7" style={{ background: 'rgba(202,203,167,0.18)' }} />
                    <div className="flex items-start justify-between">
                        <div>
                            <motion.p {...fadeIn(0.08)} className="uppercase tracking-[0.42em] text-[0.6rem] font-light mb-10 lg:mb-16" style={{ color: 'rgba(202,203,167,0.55)' }}>
                                Our Process
                            </motion.p>
                            <motion.h2
                                {...reveal(0.14, 32)}
                                className="text-[clamp(3rem,7.5vw,7rem)] leading-[0.88] font-light tracking-[-0.025em]"
                                style={{ color: '#CACBA7' }}
                            >
                                From Forest
                                <br />
                                <span className="font-semibold">To Cup.</span>
                            </motion.h2>
                        </div>
                        <motion.span {...fadeIn(0.2)} className="hidden sm:block text-[0.6rem] uppercase tracking-[0.3em] font-light mt-1" style={{ color: 'rgba(202,203,167,0.25)' }}>
                            §&ensp;002
                        </motion.span>
                    </div>
                </div>

                {/* ── STEPS ──────────────────────────────────────── */}
                <div className="mt-20 lg:mt-28">
                    {steps.map((step, index) => (
                        <div key={step.number}>
                            <Rule className="mb-14 lg:mb-20" style={{ background: 'rgba(202,203,167,0.10)' }} />
                            <motion.div
                                {...reveal(0.06)}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch mb-14 lg:mb-20"
                            >
                                {index % 2 === 0 ? (
                                    <>
                                        <StepPlaceholder step={step} index={index} />
                                        <ContentBlock step={step} delay={0.1} />
                                    </>
                                ) : (
                                    <>
                                        <ContentBlock step={step} delay={0.06} />
                                        <StepPlaceholder step={step} index={index} />
                                    </>
                                )}
                            </motion.div>
                        </div>
                    ))}
                    <Rule className="" style={{ background: 'rgba(202,203,167,0.10)' }} />
                </div>

                {/* Bottom close */}
                <div className="mt-14 lg:mt-20 flex items-center gap-4">
                    <Rule className="flex-1" style={{ background: 'rgba(202,203,167,0.10)' }} />
                    <motion.span {...fadeIn(0.4)} className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#6D8575" }} />
                </div>

            </Section>
        </div>
    );
}