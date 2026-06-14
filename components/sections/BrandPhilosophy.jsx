"use client";

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
    <Section className="bg-black text-white overflow-hidden" ref={sectionRef}>

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
        <Rule className="bg-white/[0.12] mb-7" />
        <div className="flex items-center justify-between">
          <motion.p
            {...fadeIn(0.1)}
            className="uppercase tracking-[0.42em] text-[0.6rem] text-white/30 font-light"
          >
            Our Philosophy
          </motion.p>
          {/* Right-side index notation — editorial detail */}
          <motion.span
            {...fadeIn(0.2)}
            className="hidden sm:block text-[0.6rem] uppercase tracking-[0.3em] text-white/20 font-light"
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
                text-white/85
              "
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

        {/* RIGHT — forest canopy image placeholder */}
        <motion.div
          {...fadeIn(0.2)}
          className="relative w-full overflow-hidden min-h-[320px] lg:min-h-0"
        >

          {/* Forest canopy gradient — light filters from top (sky/sun) through to deep forest floor */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(175deg, #CACBA7 0%, #AAB79A 18%, #6D8575 48%, #3D5757 80%, #1e3232 100%)",
            }}
          />

          {/* Dappled-light radial — mimics sunlight through leaves */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 35% at 60% 8%, rgba(255,255,245,0.18) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 20% 5%, rgba(202,203,167,0.12) 0%, transparent 60%)",
            }}
          />

          {/* Horizontal vignette — darkness closes in from sides */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* Fine vertical grain — bark / fibre texture feel */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 38px)",
            }}
          />

          {/* Center mark — circular aperture feel */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <svg
                width="40" height="40" viewBox="0 0 40 40"
                fill="none"
                className="opacity-35"
              >
                <circle cx="20" cy="20" r="19" stroke="#CACBA7" strokeWidth="0.8" />
                <line x1="20" y1="8" x2="20" y2="32" stroke="#CACBA7" strokeWidth="0.8" />
                <line x1="8" y1="20" x2="32" y2="20" stroke="#CACBA7" strokeWidth="0.8" />
                <circle cx="20" cy="20" r="2.5" stroke="#CACBA7" strokeWidth="0.8" />
              </svg>
            </div>
          </div>

          {/* Top caption — like a photo credit */}
          <div className="absolute top-0 inset-x-0 px-5 pt-4 z-20 flex items-start justify-between">
            <span
              className="text-[0.5rem] uppercase tracking-[0.4em] font-light"
              style={{ color: "rgba(61,87,87,0.7)" }}
            >
              Image Placeholder
            </span>
            <span
              className="text-[0.5rem] uppercase tracking-[0.32em] font-light"
              style={{ color: "rgba(61,87,87,0.5)" }}
            >
              Origin &ensp;/&ensp; Forest
            </span>
          </div>

          {/* Bottom fade to black — flows into the section below */}
          <div
            className="absolute bottom-0 inset-x-0 h-1/4 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
            }}
          />

        </motion.div>

      </div>

      {/* ── RULE BREAK ───────────────────────────────────────────────── */}
      <Rule className="bg-white/[0.08] mb-16 lg:mb-20" />

      {/* ── BODY COPY — THREE BREATHING PARAGRAPHS ───────────────────── */}
      {/*
          Grid: left column is intentionally empty on desktop —
          the body copy is right-offset, creating asymmetric negative space
          that echoes the headline's left dominance.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

        {/* ── IMAGE PLACEHOLDER — portrait, evoking a farmer/landscape photograph ── */}
        <motion.div
          {...fadeIn(0.14)}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4 / 5" }}
        >

          {/* Background — deepForest → forestSage gradient, portrait orientation */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(200deg, #3D5757 0%, #4f6e65 35%, #6D8575 70%, #8fa68a 100%)",
            }}
          />

          {/* Radial highlight — simulates a light source from upper-left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 25% 20%, rgba(202,203,167,0.14) 0%, transparent 65%)",
            }}
          />

          {/* Fine diagonal grain — tactile texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(125deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 52px)",
            }}
          />

          {/* Bottom-to-top fade */}
          <div
            className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
            }}
          />

          {/* Center icon — crosshair placeholder mark */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              className="relative w-14 h-14 opacity-40"
              style={{ border: "1px solid #CACBA7", borderRadius: "50%" }}
            >
              {/* Horizontal tick */}
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block"
                style={{ width: "20px", height: "1px", background: "#CACBA7" }}
              />
              {/* Vertical tick */}
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block"
                style={{ width: "1px", height: "20px", background: "#CACBA7" }}
              />
            </div>
          </div>

          {/* Bottom caption strip */}
          <div className="absolute bottom-0 inset-x-0 px-5 py-4 z-20 flex items-end justify-between">
            <span
              className="text-[0.55rem] uppercase tracking-[0.38em] font-light"
              style={{ color: "rgba(202,203,167,0.5)" }}
            >
              Image Placeholder
            </span>
            {/* Vertical brand caption */}
            <span
              className="text-[0.5rem] uppercase tracking-[0.42em] font-light whitespace-nowrap"
              style={{
                color: "rgba(202,203,167,0.25)",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                lineHeight: 1,
              }}
            >
              Forest Farmer Coffee Roasters
            </span>
          </div>

        </motion.div>

        {/* Body paragraphs + bold statement */}
        <div className="flex flex-col h-full">

          <div className="space-y-0">

            <motion.div {...reveal(0.12)} className="pb-8 border-b border-white/[0.07]">
              <p
                className="
                  text-[1.05rem] lg:text-[1.15rem]
                  font-light leading-[1.85]
                  text-white/65
                "
              >
                Every bean carries the story of a farmer,
                a landscape, and a season.
              </p>
            </motion.div>

            <motion.div {...reveal(0.22)} className="py-8 border-b border-white/[0.07]">
              <p
                className="
                  text-[1.05rem] lg:text-[1.15rem]
                  font-light leading-[1.85]
                  text-white/65
                "
              >
                At Forest Farmer Coffee Roasters, we honour those
                stories through thoughtful sourcing, precision
                roasting, and an unwavering respect for origin.
              </p>
            </motion.div>

            <motion.div {...reveal(0.32)} className="pt-8 pb-8 border-b border-white/[0.07]">
              <p
                className="
                  text-[1.05rem] lg:text-[1.15rem]
                  font-light leading-[1.85]
                  text-white/65
                "
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
              text-white/25 font-light mb-5
            ">
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
        <Rule className="flex-1 bg-white/[0.08]" />
        <motion.span
          {...fadeIn(0.4)}
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "#6D8575" }}
        />
      </div>

    </Section>
  );
}