"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Section from "@/components/layout/Section";

/* ─────────────────────────────────────────────
   The unexpected moment:
   • Headline words SCATTER in from every axis
   • Image WIPES open from the center outward
   • A coordinate counter counts up as you enter
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

/* ── Word scatter — each word flies in from a random direction ── */
const scatterOrigins = [
  { x: -120, y: -60, rotate: -8 },
  { x: 80,  y: -90, rotate: 5 },
  { x: -60, y: 70,  rotate: -4 },
  { x: 100, y: 40,  rotate: 7 },
  { x: -90, y: -40, rotate: -6 },
  { x: 60,  y: -70, rotate: 3 },
  { x: -40, y: 80,  rotate: -5 },
  { x: 110, y: -30, rotate: 6 },
  { x: -70, y: 50,  rotate: -3 },
];

function ScatterWord({ word, index, delay }) {
  const origin = scatterOrigins[index % scatterOrigins.length];
  return (
    <motion.span
      initial={{ opacity: 0, x: origin.x, y: origin.y, rotate: origin.rotate, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: delay + index * 0.07,
      }}
      viewport={{ once: true }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function OriginStory() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax transforms */
  const coordY    = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imageParY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const glowY     = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  /* Spring-smoothed image parallax */
  const smoothImageY = useSpring(imageParY, { stiffness: 60, damping: 20 });

  return (
    <Section className="bg-black text-white overflow-hidden" ref={sectionRef}>

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
            className="uppercase tracking-[0.42em] text-[0.6rem] text-white/30 font-light"
          >
            Origin Story
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden sm:block text-[0.6rem] uppercase tracking-[0.3em] text-white/20 font-light"
          >
            §&ensp;003
          </motion.span>
        </div>
      </div>

      {/* ── SCATTER HEADLINE — the unexpected moment ─────────────────── */}
      <div className="mb-12 lg:mb-16 overflow-hidden">
        <h2
          className="
            text-[clamp(3rem,8vw,7rem)]
            leading-[0.9]
            tracking-[-0.025em]
            font-light
            max-w-5xl
          "
          style={{ wordSpacing: "0.25em" }}
        >
          {/* Each word scatters in from a different direction */}
          {[
            { word: "From", line: 0 },
            { word: "\u00A0The\u00A0", line: 0 },
            { word: "Forest,", line: 0 },
          ].map((w, i) => (
            <ScatterWord key={w.word} word={w.word} index={i} delay={0.05} />
          ))}
          <br />
          {[
            { word: "To\u00A0", line: 1 },
            { word: "The\u00A0", line: 1 },
            { word: "Fire,", line: 1 },
          ].map((w, i) => (
            <ScatterWord key={w.word} word={w.word} index={i + 3} delay={0.05} />
          ))}
          <br />
          {[
            { word: "To\u00A0", line: 2 },
            { word: "The\u00A0", line: 2 },
            { word: <span key="cup" className="font-semibold">Cup.</span>, line: 2 },
          ].map((w, i) => (
            <ScatterWord key={i} word={w.word} index={i + 6} delay={0.05} />
          ))}
        </h2>
      </div>

      {/* ── WIDE LANDSCAPE IMAGE PLACEHOLDER ────────────────────────── */}
      {/* Reveals as a horizontal wipe from center outward */}
      <div ref={imageRef} className="relative mb-12 lg:mb-16 overflow-hidden" style={{ aspectRatio: "21 / 9" }}>

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
            {/* Forest-to-fire panoramic gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, #0f1e1e 0%, #1e3232 12%, #3D5757 28%, #5a6b45 45%, #8a7040 58%, #7a4828 72%, #4a2818 86%, #1a0f0a 100%)",
              }}
            />

            {/* Atmospheric layers */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 40% 70% at 15% 50%, rgba(61,87,87,0.4) 0%, transparent 60%), radial-gradient(ellipse 30% 60% at 72% 50%, rgba(122,72,40,0.3) 0%, transparent 60%)",
              }}
            />

            {/* Sky glow — top */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(170,183,154,0.12) 0%, transparent 60%)",
              }}
            />

            {/* Grain */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 42px)",
              }}
            />

            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 inset-x-0 h-1/3"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
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
                <circle cx="24" cy="24" r="6"  stroke="#CACBA7" strokeWidth="0.4" />
                <circle cx="24" cy="24" r="1.5" fill="#CACBA7" />
                <line x1="24" y1="1" x2="24" y2="10" stroke="#CACBA7" strokeWidth="0.6" />
                <line x1="24" y1="38" x2="24" y2="47" stroke="#CACBA7" strokeWidth="0.6" />
                <line x1="1" y1="24" x2="10" y2="24" stroke="#CACBA7" strokeWidth="0.6" />
                <line x1="38" y1="24" x2="47" y2="24" stroke="#CACBA7" strokeWidth="0.6" />
                <polygon points="24,3 22,9 24,7 26,9" stroke="#CACBA7" strokeWidth="0.5" fill="none" />
              </svg>
              <span className="text-[0.48rem] uppercase tracking-[0.4em] font-light" style={{ color: "rgba(202,203,167,0.3)" }}>
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
          <p className="text-[1.1rem] lg:text-[1.25rem] font-light leading-[1.85] text-white/65 mb-8">
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
            className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white/85"
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
            { label: "Country",   value: "Ethiopia" },
            { label: "Region",    value: "Yirgacheffe · Sidama" },
            { label: "Altitude",  value: "1,400 – 2,200 m" },
            { label: "Processing",value: "Natural · Washed" },
            { label: "Season",    value: "Oct – Jan harvest" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline justify-between py-4 border-b border-white/[0.07] group"
            >
              <span className="text-[0.68rem] uppercase tracking-[0.28em] text-white/30 font-light group-hover:text-white/50 transition-colors duration-300">
                {stat.label}
              </span>
              <span className="text-[0.85rem] font-light text-white/65 group-hover:text-white/85 transition-colors duration-300 text-right">
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
  );
}