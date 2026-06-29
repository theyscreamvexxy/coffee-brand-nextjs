"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import ImageReveal from "@/components/animations/ImageReveal";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

/* ─── Step data (unchanged) ────────────────────────────────────────── */
const steps = [
    {
        number: "01", title: "Origin", subheading: "Where every cup is born.",
        text: "Coffee begins with people, not machines. Every harvest carries the character of its land, climate and caretakers.",
        details: [
            { label: "Altitude",  value: "1,400 – 2,200 m" },
            { label: "Harvest",   value: "Hand-picked, selective" },
            { label: "Region",    value: "Forest Farms, Ethiopia" },
        ],
        image: "/images/coffee/farmer.png",
        label: "ORIGIN · FARM",
    },
    {
        number: "02", title: "Selection", subheading: "Only the finest make it through.",
        text: "Only exceptional cherries become exceptional coffee. Quality starts long before roasting ever begins.",
        details: [
            { label: "Grade",          value: "Specialty, SCA 85+" },
            { label: "Method",         value: "Visual + density sort" },
            { label: "Rejection rate", value: "Up to 60% discarded" },
        ],
        image: "/images/coffee/beans-macro.png",
        label: "SELECTION · CHERRY",
    },
    {
        number: "03", title: "Roasting", subheading: "Heat into character.",
        text: "Precision transforms potential into character. Every second influences flavour, aroma and balance.",
        details: [
            { label: "Temperature", value: "185 – 220 °C" },
            { label: "Duration",    value: "10 – 14 minutes" },
            { label: "Profile",     value: "Artisan drum roast" },
        ],
        image: "/images/coffee/brewing.png",
        label: "ROASTING · HEAT",
    },
    {
        number: "04", title: "Brewing", subheading: "The quiet ritual of taste.",
        text: "The final expression of every decision before it. A quiet ritual that brings the journey full circle.",
        details: [
            { label: "Ratio",       value: "1 : 15  coffee to water" },
            { label: "Temperature", value: "91 – 94 °C" },
            { label: "Method",      value: "Pour-over · Immersion" },
        ],
        image: "/images/coffee/cup.png",
        label: "BREWING · CUP",
    },
];

/* ─── Desktop step content panel (cross-fades between steps) ───────── */
function StepContent({ step }) {
    return (
        <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col justify-between py-4"
        >
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-6 h-px" style={{ background: "#6D8575" }} />
                    <span className="text-[0.6rem] uppercase tracking-[0.38em] font-light" style={{ color: "#6D8575" }}>
                        Step {step.number}
                    </span>
                </div>
                <div
                    className="text-[clamp(5rem,11vw,9rem)] font-bold leading-none select-none mb-[-0.8rem]"
                    style={{ color: "rgba(202,203,167,0.04)" }}
                >
                    {step.number}
                </div>
                <h3
                    className="text-[clamp(2.6rem,5vw,4.8rem)] font-light leading-[0.88] tracking-[-0.025em] mb-5"
                    style={{ color: "#CACBA7" }}
                >
                    {step.title}
                </h3>
                <p
                    className="text-[clamp(1rem,1.8vw,1.35rem)] font-semibold leading-[1.2] tracking-[-0.01em] mb-6"
                    style={{ color: "#ffffff" }}
                >
                    {step.subheading}
                </p>
                <p
                    className="text-[0.95rem] font-light leading-[1.85] max-w-sm mb-10"
                    style={{ color: "rgba(170,183,154,0.82)" }}
                >
                    {step.text}
                </p>
            </div>
            <div className="max-w-sm">
                {step.details.map((d) => (
                    <div
                        key={d.label}
                        className="flex items-baseline justify-between py-3"
                        style={{ borderBottom: "1px solid rgba(202,203,167,0.09)" }}
                    >
                        <span className="text-[0.68rem] uppercase tracking-[0.28em] font-light" style={{ color: "rgba(202,203,167,0.45)" }}>
                            {d.label}
                        </span>
                        <span className="text-[0.82rem] font-light" style={{ color: "rgba(170,183,154,0.82)" }}>
                            {d.value}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

/* ─── Mobile step card ──────────────────────────────────────────────── */
function MobileStepCard({ step }) {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px 0px" });

    return (
        <div ref={ref}>
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left center", height: "1px", background: "rgba(202,203,167,0.10)", marginBottom: "48px" }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-10"
            >
                <ImageReveal
                    src={step.image}
                    alt={step.title}
                    direction="left"
                    delay={0.15}
                    duration={1.4}
                    scale={1.06}
                    aspectRatio="3/4"
                />
            </motion.div>
            <div className="px-1">
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <span className="w-6 h-px" style={{ background: "#6D8575" }} />
                    <span className="text-[0.6rem] uppercase tracking-[0.38em] font-light" style={{ color: "#6D8575" }}>
                        Step {step.number}
                    </span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-[clamp(4rem,18vw,7rem)] font-bold leading-none select-none mb-[-0.5rem]"
                    style={{ color: "rgba(202,203,167,0.04)" }}
                >
                    {step.number}
                </motion.div>
                <div className="text-[clamp(2.4rem,8vw,4rem)] leading-[0.88] tracking-[-0.025em] font-light mb-4" style={{ color: "#CACBA7" }}>
                    <LineReveal delay={0.25} blur={14}>{step.title}</LineReveal>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                    className="text-[clamp(1rem,4vw,1.2rem)] font-semibold leading-[1.2] mb-5"
                    style={{ color: "#ffffff" }}
                >
                    {step.subheading}
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
                    className="font-light leading-[1.85] mb-8"
                    style={{ color: "rgba(170,183,154,0.80)", fontSize: "0.95rem" }}
                >
                    {step.text}
                </motion.p>
                {step.details.map((d, di) => (
                    <motion.div
                        key={d.label}
                        initial={{ opacity: 0, x: 12 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.48 + di * 0.07 }}
                        className="flex justify-between py-3"
                        style={{ borderBottom: "1px solid rgba(202,203,167,0.09)" }}
                    >
                        <span className="text-[0.68rem] uppercase tracking-[0.28em] font-light" style={{ color: "rgba(202,203,167,0.45)" }}>{d.label}</span>
                        <span className="text-[0.82rem] font-light" style={{ color: "rgba(170,183,154,0.82)" }}>{d.value}</span>
                    </motion.div>
                ))}
            </div>
            <div className="mt-14 mb-2" />
        </div>
    );
}

/* ─── Main component ────────────────────────────────────────────────── */
export default function JourneySection() {
    const outerRef      = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const activeStepRef = useRef(0);
    const lockRef       = useRef(false);
    const inSectionRef  = useRef(false);   // tracks whether Lenis was stopped by us

    /*
     * useLenis returns the ref object { current: LenisInstance }
     * from SmoothScrollProvider context.
     * We use this to stop/start Lenis when the section is active,
     * preventing momentum bleed-through that bypasses e.preventDefault().
     */
    const lenisCtx = useLenis();

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.innerWidth < 1024) return;

        const outer = outerRef.current;
        if (!outer) return;

        /*
         * SCROLL ARCHITECTURE
         * ─────────────────────────────────────────────────────────────────────
         * 1. isSectionPinned()  — true while the sticky panel fills the viewport
         * 2. freezeLenis()      — stops Lenis + records entryScrollY
         * 3. thawLenisDown()    — lenis.scrollTo(exitY, immediate) → lenis.start()
         * 4. thawLenisUp()      — lenis.scrollTo(sectionTop - 2, immediate) → start()
         * 5. handleWheel        — lock → MIN_DELTA filter → boundaries → step advance
         *
         * KEY DECISIONS
         * • LOCK_DURATION 1200 ms  — outlasts trackpad inertia (typically 500-1000 ms)
         * • MIN_DELTA     20 px    — ignores residual momentum after lock clears
         * • Lock BEFORE boundaries — prevents boundary exit during animation
         * • lenis.scrollTo(immediate) — syncs BOTH DOM scroll AND Lenis internals
         *   (window.scrollTo alone leaves Lenis targetScroll stale → jitter on resume)
         */
        const LOCK_DURATION = 1200; // ms
        const MIN_DELTA     = 20;   // normalized px

        let entryScrollY = null;

        /* Returns true while the sticky panel fully covers the viewport */
        const isSectionPinned = () => {
            const rect = outer.getBoundingClientRect();
            return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
        };

        /* Normalise wheel deltaY across deltaMode types → pixels */
        const normaliseDelta = (e) =>
            e.deltaMode === 1 ? Math.abs(e.deltaY) * 40  :  // lines → px
            e.deltaMode === 2 ? Math.abs(e.deltaY) * 800 :  // pages → px
            Math.abs(e.deltaY);                               // already px

        /* ── Enter section: freeze Lenis, record scroll position ── */
        const freezeLenis = () => {
            if (inSectionRef.current) return;
            inSectionRef.current = true;
            entryScrollY = window.scrollY;
            lenisCtx?.current?.stop();
        };

        /* ── Exit downward: jump to exit position (releases sticky panel) ── */
        const thawLenisDown = () => {
            if (!inSectionRef.current) return;
            inSectionRef.current = false;

            const exitY = (entryScrollY ?? 0) + outer.clientHeight - window.innerHeight + 2;
            entryScrollY = null;

            /*
             * ORDER IS CRITICAL:
             *
             * lenis.scrollTo() has an early-return guard:
             *   if ((this.isStopped || this.isLocked) && !force) return;
             *
             * If we call scrollTo() BEFORE start(), Lenis is still stopped,
             * scrollTo() returns immediately (no-op), then start() resumes
             * at the old entryScrollY — sticky panel stays, causing the 3↔4 loop.
             *
             * Correct sequence:
             *   1. start()  → isStopped = false (scrollTo will now work)
             *   2. scrollTo(exitY, immediate) → sets animatedScroll = targetScroll = exitY
             *      → Lenis applies exitY to DOM on next RAF tick
             */
            lenisCtx?.current?.start();
            lenisCtx?.current?.scrollTo(exitY, { immediate: true });

            /*
             * EXIT-GUARD LOCK (400 ms)
             * There is a 1 RAF-frame (~16 ms) delay between calling scrollTo(immediate)
             * and when Lenis actually writes exitY to the DOM via raf().
             * During that window, isSectionPinned() still returns true (DOM not updated).
             * Any wheel event arriving in that window would re-engage section logic:
             *   - at step 3 (last) + down → thawLenisDown() no-op (inSectionRef = false)
             *   - at step 3 (last) + up (trackpad inertia reversal) → step 3→2 (BACKWARD!)
             * The 400ms lock swallows all events during this transition window.
             */
            lockRef.current = true;
            setTimeout(() => { lockRef.current = false; }, 400);
        };

        /* ── Exit upward: jump to just above section top (releases sticky panel) ── */
        const thawLenisUp = () => {
            if (!inSectionRef.current) return;
            inSectionRef.current = false;

            const sectionTop = window.scrollY + outer.getBoundingClientRect().top;
            const exitUpY    = Math.max(0, sectionTop - 2);
            entryScrollY = null;

            /*
             * Same order requirement as thawLenisDown:
             * start() first so scrollTo() is not stopped and actually applies.
             */
            lenisCtx?.current?.start();
            lenisCtx?.current?.scrollTo(exitUpY, { immediate: true });

            /* Exit-guard lock — same reasoning as thawLenisDown */
            lockRef.current = true;
            setTimeout(() => { lockRef.current = false; }, 400);
        };

        /* ── Main wheel handler ── */
        const handleWheel = (e) => {
            const pinned = isSectionPinned();

            /* Not in section → ensure Lenis is restored */
            if (!pinned) {
                if (inSectionRef.current) {
                    inSectionRef.current = false;
                    lenisCtx?.current?.start();
                    entryScrollY = null;
                }
                return;
            }

            const dir      = e.deltaY > 0 ? 1 : -1;
            const cur      = activeStepRef.current;
            const absDelta = normaliseDelta(e);

            /*
             * ─ 1. LOCK CHECK (MUST come before boundary checks) ─────────────
             * Swallows ALL events during the 1200ms animation window.
             * If this came AFTER the boundary checks, a fast event arriving
             * immediately after step advances to index 3 (last) would see
             * cur === steps.length-1, trigger thawLenisDown(), and exit
             * prematurely — the exact bug this ordering prevents.
             */
            if (lockRef.current) {
                e.preventDefault();
                return;
            }

            /*
             * ─ 2. LOW-VELOCITY FILTER ────────────────────────────────────────
             * After lock clears, residual trackpad momentum sends small-deltaY
             * events. Filter them out so one hard flick doesn't cascade through
             * all steps. Only applies while we have frozen Lenis (in-section).
             */
            if (inSectionRef.current && absDelta < MIN_DELTA) {
                e.preventDefault();
                return;
            }

            /* ─ 3. START BOUNDARY: step 0 + scrolling UP → exit upward ── */
            if (dir < 0 && cur === 0) {
                thawLenisUp();
                return; // don't preventDefault → Lenis + browser scroll up naturally
            }

            /* ─ 4. END BOUNDARY: last step + scrolling DOWN → exit downward ── */
            if (dir > 0 && cur === steps.length - 1) {
                e.preventDefault();
                thawLenisDown();
                return;
            }

            /*
             * ─ 5. INSIDE SECTION: capture scroll + advance exactly one step ──
             */
            freezeLenis();      // lenis.stop() + record entryScrollY
            e.preventDefault(); // prevent browser native scroll

            lockRef.current = true;
            const next = Math.max(0, Math.min(steps.length - 1, cur + dir));
            activeStepRef.current = next;
            setActiveStep(next);

            setTimeout(() => { lockRef.current = false; }, LOCK_DURATION);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (inSectionRef.current) {
                inSectionRef.current = false;
                lenisCtx?.current?.start();
                entryScrollY = null;
            }
        };
    }, [lenisCtx]);

    return (
        <>
            {/* ═══════════ DESKTOP — CSS sticky split-screen ═══════════ */}
            <div
                ref={outerRef}
                className="hidden lg:block"
                style={{
                    /* Tall wrapper: creates 4 viewport-heights of scroll space */
                    height: `${steps.length * 100}vh`,
                    background: "#0d1a12",
                    position: "relative",
                }}
            >
                {/* Sticky panel: stays on screen while outer wrapper scrolls past */}
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        width: "100%",
                        overflow: "hidden",
                        display: "flex",
                    }}
                >
                    {/* Section label */}
                    <div className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-14 xl:px-20">
                        <p className="uppercase tracking-[0.42em] text-[0.6rem] font-light" style={{ color: "rgba(202,203,167,0.38)" }}>
                            Our Process
                        </p>
                        <span className="text-[0.6rem] uppercase tracking-[0.3em] font-light" style={{ color: "rgba(202,203,167,0.18)" }}>
                            §&ensp;002
                        </span>
                    </div>

                    {/* ── LEFT PANEL ── */}
                    <div className="w-1/2 h-full flex flex-col justify-center px-14 xl:px-20 pt-24 pb-16 relative">
                        <div className="mb-6">
                            <h2
                                className="text-[clamp(2.4rem,5vw,5rem)] leading-[0.88] font-light tracking-[-0.025em]"
                                style={{ color: "#CACBA7" }}
                            >
                                From Forest<br />
                                <span className="font-semibold" style={{ color: "#ffffff" }}>To Cup.</span>
                            </h2>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "3rem" }}
                                transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-5 h-px"
                                style={{ background: "#6D8575" }}
                            />
                        </div>

                        {/* AnimatePresence — swaps step content with blur/slide */}
                        <div className="relative" style={{ flex: 1, maxHeight: "520px" }}>
                            <AnimatePresence mode="wait">
                                <StepContent key={activeStep} step={steps[activeStep]} />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ── RIGHT PANEL — image transitions ── */}
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.06 }}
                                animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
                                exit={{ clipPath: "inset(100% 0 0 0)", scale: 1.04 }}
                                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={steps[activeStep].image}
                                    alt={steps[activeStep].title}
                                    fill
                                    className="object-cover"
                                    priority={activeStep === 0}
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(to right, rgba(13,26,18,0.60) 0%, transparent 45%), linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
                                    }}
                                />
                                <div className="absolute bottom-8 right-8">
                                    <span className="uppercase tracking-[0.28em] font-light" style={{ fontSize: "0.55rem", color: "rgba(202,203,167,0.38)" }}>
                                        {steps[activeStep].label}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Step indicator dots — right edge ── */}
                    <div
                        className="absolute right-5 z-30 flex flex-col items-center gap-3"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "4px",
                                    height: activeStep === i ? "24px" : "4px",
                                    borderRadius: activeStep === i ? "2px" : "50%",
                                    background: activeStep === i ? "#6D8575" : "rgba(202,203,167,0.20)",
                                    transition: "height 500ms cubic-bezier(0.22,1,0.36,1), border-radius 500ms ease, background 500ms ease",
                                    flexShrink: 0,
                                }}
                            />
                        ))}
                    </div>

                    {/* Scroll hint at bottom */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <AnimatePresence>
                            {activeStep < steps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center gap-1"
                                >
                                    <span style={{ fontSize: "0.46rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(202,203,167,0.28)" }}>
                                        scroll for next
                                    </span>
                                    <svg className="scroll-indicator-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 1v10M2 7l4 4 4-4" stroke="rgba(202,203,167,0.28)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ═══════════ MOBILE & TABLET — premium stacked ═══════════ */}
            <div
                className="lg:hidden"
                style={{ background: "#0d1a12", color: "#CACBA7", paddingTop: "80px", paddingBottom: "80px" }}
            >
                <div className="max-w-content mx-auto px-6 md:px-10">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="uppercase tracking-[0.42em] text-[0.6rem] font-light mb-10"
                        style={{ color: "rgba(202,203,167,0.40)" }}
                    >
                        Our Process
                    </motion.p>
                    <h2 className="text-[clamp(2.8rem,9vw,5rem)] leading-[0.88] font-light tracking-[-0.025em] mb-16">
                        <LineReveal delay={0.05} blur={14}>From Forest</LineReveal>
                        <LineReveal delay={0.18} blur={14}>
                            <span className="font-semibold" style={{ color: "#ffffff" }}>To Cup.</span>
                        </LineReveal>
                    </h2>
                    {steps.map((step) => (
                        <MobileStepCard key={step.number} step={step} />
                    ))}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "left center", height: "1px", background: "rgba(202,203,167,0.10)" }}
                    />
                </div>
            </div>
        </>
    );
}