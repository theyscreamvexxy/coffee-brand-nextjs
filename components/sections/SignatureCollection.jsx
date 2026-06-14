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
    <div className="flex items-baseline justify-between border-b border-white/[0.08] py-4 group">
      <span className="text-sm uppercase tracking-[0.22em] text-white/40 font-light group-hover:text-white/60 transition-colors duration-300">
        {label}
      </span>
      <span className="text-sm text-white/70 font-light group-hover:text-white/90 transition-colors duration-300">
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
    <Section className="bg-black text-white overflow-hidden">

      {/* ── EDITORIAL FRAME ─────────────────────────────────────────── */}
      <motion.div
        {...fadeIn(0)}
        className="
          relative
          border border-white/[0.10]
          grid grid-cols-1 lg:grid-cols-[1fr_1.55fr]
          min-h-[540px] lg:min-h-[680px]
          mb-0
        "
      >

        {/* Hairline corner accents — pure decoration */}
        <span className="pointer-events-none absolute top-0 left-0 w-10 h-10 border-t border-l border-white/30" />
        <span className="pointer-events-none absolute top-0 right-0 w-10 h-10 border-t border-r border-white/30" />
        <span className="pointer-events-none absolute bottom-0 left-0 w-10 h-10 border-b border-l border-white/30" />
        <span className="pointer-events-none absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/30" />

        {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
        <div className="
          flex flex-col justify-between
          px-8 py-10
          lg:px-14 lg:py-14
          border-b border-white/[0.08] lg:border-b-0 lg:border-r lg:border-white/[0.08]
        ">

          {/* Label */}
          <motion.p
            {...fadeUp(0.1)}
            className="
              uppercase tracking-[0.38em] text-[0.65rem]
              text-white/35 font-light
              mb-auto
            "
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
          >
            Crafted for
            <br />
            <em className="not-italic text-white/50">slow mornings.</em>
          </motion.h2>

          {/* Micro year tag — editorial detail */}
          <motion.span
            {...fadeIn(0.45)}
            className="
              hidden lg:block
              mt-12
              text-[0.6rem] uppercase tracking-[0.32em] text-white/20 font-light
            "
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

          {/* Deep forest / sage gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #3D5757 0%, #4a6560 30%, #6D8575 65%, #AAB79A 100%)",
            }}
          />

          {/* Layered texture overlays for depth */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 72% 40%, rgba(202,203,167,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 20% 80%, rgba(61,87,87,0.6) 0%, transparent 60%)",
            }}
          />

          {/* Subtle diagonal grain lines */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 60px)",
            }}
          />

          {/* Centered placeholder label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">

            {/* Thin oval ring */}
            <div
              className="w-28 h-28 rounded-full"
              style={{
                border: "1px solid rgba(202,203,167,0.35)",
                boxShadow: "0 0 40px rgba(202,203,167,0.08)",
              }}
            />

            <div className="text-center -mt-20 select-none">
              <p
                className="uppercase tracking-[0.42em] text-[0.6rem] font-light"
                style={{ color: "rgba(202,203,167,0.55)" }}
              >
                Image Placeholder
              </p>
            </div>

          </div>

          {/* Bottom edge fade — blends into section below */}
          <div
            className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
            }}
          />

        </motion.div>

      </motion.div>
      {/* ── END EDITORIAL FRAME ─────────────────────────────────────── */}

      {/* ── PRODUCT DETAILS BELOW FRAME ─────────────────────────────── */}
      <div className="
        grid grid-cols-1 lg:grid-cols-[1fr_1.55fr]
        border-l border-r border-b border-white/[0.10]
        mb-0
      ">

        {/* Logo column — mirrors left panel width, visible on all sizes */}
        <motion.div
          {...fadeIn(0.1)}
          className="
            flex items-center justify-center
            border-b border-white/[0.08] lg:border-b-0 lg:border-r lg:border-white/[0.08]
            py-10 lg:py-0
            min-h-[120px] lg:min-h-0
          "
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
          >
            Estate Blend
          </motion.h3>

          {/* Description */}
          <motion.p
            {...fadeUp(0.16)}
            className="
              text-white/55 font-light leading-[1.75]
              text-[0.95rem]
              max-w-lg
              mb-10
            "
          >
            A balanced expression of origin, craftsmanship and patience.
            Designed for those who appreciate depth, sweetness and clarity
            in every cup.
          </motion.p>

          {/* Detail rows */}
          <motion.div {...fadeUp(0.24)} className="max-w-lg">
            <DetailRow label="Tasting Notes" value="Chocolate · Caramel · Citrus" />
            <DetailRow label="Roast"         value="Medium" />
            <DetailRow label="Origin"        value="Forest Farms" />
          </motion.div>

        </div>

      </div>

    </Section>
  );
}