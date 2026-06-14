"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/layout/Section";

/* ─────────────────────────────────────────────
   Fade + slide animation presets
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Detail row
───────────────────────────────────────────── */
function DetailRow({ label, value }) {
    return (
        <div
            className="flex items-baseline justify-between py-4 group"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }}
        >
            <span
                className="text-sm uppercase tracking-[0.22em] font-light group-hover:opacity-80 transition-opacity duration-300"
                style={{ color: 'rgba(255,255,255,0.55)' }}
            >
                {label}
            </span>
            <span
                className="text-sm font-light group-hover:opacity-90 transition-opacity duration-300"
                style={{ color: 'rgba(255,255,255,0.82)' }}
            >
                {value}
            </span>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function SignatureCollection() {
    return (
        <Section className="overflow-hidden" style={{ background: '#141f1a', color: '#ffffff' }}>

            {/* ── EDITORIAL FRAME ─────────────────────────────────────────── */}
            <motion.div
                {...fadeIn(0)}
                className="
          relative
          grid grid-cols-1 lg:grid-cols-[1fr_1.55fr]
          min-h-[540px] lg:min-h-[680px]
          mb-0
        "
                style={{ border: '1px solid rgba(202,203,167,0.10)' }}
            >

                {/* Hairline corner accents — pure decoration */}
                <span className="pointer-events-none absolute top-0 left-0 w-10 h-10 border-t border-l" style={{ borderColor: 'rgba(255,255,255,0.22)' }} />
                <span className="pointer-events-none absolute top-0 right-0 w-10 h-10 border-t border-r" style={{ borderColor: 'rgba(255,255,255,0.22)' }} />
                <span className="pointer-events-none absolute bottom-0 left-0 w-10 h-10 border-b border-l" style={{ borderColor: 'rgba(255,255,255,0.22)' }} />
                <span className="pointer-events-none absolute bottom-0 right-0 w-10 h-10 border-b border-r" style={{ borderColor: 'rgba(255,255,255,0.22)' }} />

                {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
                <div className="
          flex flex-col justify-between
          px-8 py-10
          lg:px-14 lg:py-14
          border-b lg:border-b-0 lg:border-r
        "
                    style={{ borderColor: 'rgba(202,203,167,0.09)' }}>

                    {/* Label */}
                    <motion.p
                        {...fadeUp(0.1)}
                        className="
              uppercase tracking-[0.38em] text-[0.65rem]
              font-light
              mb-auto
            "
                        style={{ color: 'rgba(255,255,255,0.55)' }}
                    >
                        Signature Collection
                    </motion.p>

                    {/* Headline — sits at bottom of left panel */}
                    <motion.h2
                        {...fadeUp(0.22)}
                        className="
              text-[clamp(2.6rem,6.5vw,5.4rem)]
              leading-[0.92]
              font-light
              tracking-[-0.02em]
              mt-12 lg:mt-0
            "
                        style={{ color: '#ffffff' }}
                    >
                        Crafted for
                        <br />
                        <em className="not-italic" style={{ color: 'rgba(255,255,255,0.48)' }}>slow mornings.</em>
                    </motion.h2>

                    {/* Micro year tag — editorial detail */}
                    <motion.span
                        {...fadeIn(0.45)}
                        className="
              hidden lg:block
              mt-12
              text-[0.6rem] uppercase tracking-[0.32em] font-light
            "
                        style={{ color: 'rgba(255,255,255,0.30)' }}
                    >
                        Est. &ensp;MMXXIV
                    </motion.span>

                </div>

                {/* ── RIGHT PANEL — IMAGE PLACEHOLDER ─────────────────────────── */}
                <motion.div
                    {...fadeIn(0.18)}
                    className="relative overflow-hidden"
                    style={{ minHeight: "380px" }}
                >

                    <Image
                        src="/images/coffee/signature-bag.png"
                        alt="Estate Blend"
                        fill
                        className="object-cover"
                        priority={false}
                    />

                </motion.div>

            </motion.div>
            {/* ── END EDITORIAL FRAME ─────────────────────────────────────── */}

            {/* ── PRODUCT DETAILS BELOW FRAME ─────────────────────────────── */}
            <div className="
        grid grid-cols-1 lg:grid-cols-[1fr_1.55fr]
        mb-0
      "
                style={{ border: '1px solid rgba(202,203,167,0.10)', borderTop: 'none' }}>

                {/* Logo column — mirrors left panel width, visible on all sizes */}
                <motion.div
                    {...fadeIn(0.1)}
                    className="
            flex items-center justify-center
            border-b lg:border-b-0 lg:border-r
            py-10 lg:py-0
            min-h-[120px] lg:min-h-0
          "
                    style={{ borderColor: 'rgba(202,203,167,0.09)' }}
                >
                    <div className="relative w-[80px] sm:w-[100px] lg:w-[120px] xl:w-[140px] opacity-60 hover:opacity-90 transition-opacity duration-500">
                        <Image
                            src="/images/brand/logo.png"
                            alt="Forest Farmer Coffee Roasters"
                            width={280}
                            height={280}
                            className="w-full h-auto object-contain"
                            priority={false}
                        />
                    </div>
                </motion.div>

                {/* Product info — sits under the image column */}
                <div className="px-8 py-10 lg:px-14 lg:py-12">

                    {/* Product name */}
                    <motion.h3
                        {...fadeUp(0.08)}
                        className="
              text-[clamp(1.8rem,4vw,3rem)]
              font-light tracking-[-0.01em]
              mb-5
            "
                        style={{ color: '#CACBA7' }}
                    >
                        Estate Blend
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        {...fadeUp(0.16)}
                        className="
              font-light leading-[1.75]
              text-[0.95rem]
              max-w-lg
              mb-10
            "
                        style={{ color: 'rgba(255,255,255,0.72)' }}
                    >
                        A balanced expression of origin, craftsmanship and patience.
                        Designed for those who appreciate depth, sweetness and clarity
                        in every cup.
                    </motion.p>

                    {/* Detail rows */}
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