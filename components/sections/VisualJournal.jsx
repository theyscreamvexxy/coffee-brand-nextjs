"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/layout/Section";
import LineReveal from "@/components/animations/LineReveal";

gsap.registerPlugin(ScrollTrigger);

const items = [
    { src: "/images/gallery/gallery-1.png", link: "#", caption: "Roastery" },
    { src: "/images/gallery/gallery-2.png", link: "#", caption: "Origin" },
    { src: "/images/gallery/gallery-3.png", link: "#", caption: "Craft" },
];

/* Individual gallery card */
function GalleryCard({ item, index }) {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "0px 0px -80px 0px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
            className="relative flex-shrink-0 overflow-hidden group"
            style={{
                width: "clamp(280px, 36vw, 520px)",
                aspectRatio: "3/4",
            }}
            data-cursor="view"
        >
            {/* Clip-path reveal */}
            <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.12 }}
                className="absolute inset-0"
            >
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.12 }}
                    className="absolute inset-0"
                    style={{ transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)" }}
                >
                    <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        className="object-cover"
                        style={{
                            transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), filter 700ms ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.04)";
                            e.currentTarget.style.filter = "brightness(1.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.filter = "brightness(1)";
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Bottom caption */}
            <div
                className="absolute bottom-0 left-0 right-0 p-6 z-10"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                    transform: "translateY(4px)",
                    opacity: 0,
                    transition: "opacity 400ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                    e.currentTarget.style.transform = "translateY(4px)";
                }}
            >
                <span
                    className="uppercase tracking-[0.28em] font-light"
                    style={{ fontSize: "0.58rem", color: "rgba(202,203,167,0.7)" }}
                >
                    {item.caption}
                </span>
            </div>

            {/* Index number — corner watermark */}
            <div
                className="absolute top-4 right-4 z-10"
                style={{
                    fontFamily: "monospace",
                    fontSize: "0.5rem",
                    color: "rgba(202,203,167,0.3)",
                    letterSpacing: "0.2em",
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </div>
        </motion.div>
    );
}

export default function VisualJournal() {
    const outerRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const outer = outerRef.current;
        const track = trackRef.current;
        if (!outer || !track || window.innerWidth < 1024) return;

        // Calculate horizontal travel distance
        const getScrollAmount = () =>
            -(track.scrollWidth - window.innerWidth + 96); // 96 = padding

        let st;

        const init = () => {
            if (st) st.kill();
            st = gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: outer,
                    start: "top top",
                    end: () => `+=${track.scrollWidth}`,
                    scrub: 1.2,
                    pin: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });
        };

        init();

        const onResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            if (st) { st.scrollTrigger?.kill(); st.kill(); }
        };
    }, []);

    return (
        <>
            {/* ── DESKTOP — HORIZONTAL GALLERY ── */}
            <div
                ref={outerRef}
                className="hidden lg:block overflow-hidden"
                style={{ background: "#080f0a" }}
            >
                <div
                    ref={trackRef}
                    className="flex items-center gap-8 h-screen will-change-transform"
                    style={{ paddingLeft: "96px", paddingRight: "96px" }}
                >
                    {/* Section title card — first item */}
                    <div
                        className="flex-shrink-0 flex flex-col justify-end pb-12"
                        style={{ width: "clamp(260px, 28vw, 400px)", height: "70vh" }}
                    >
                        <p className="uppercase tracking-[0.38em] text-[0.62rem] mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Visual Journal
                        </p>
                        <h2
                            className="text-[clamp(2.8rem,5vw,5rem)] leading-[0.9] font-light text-white"
                            style={{ letterSpacing: "-0.025em" }}
                        >
                            <LineReveal delay={0.05} blur={14}>Moments</LineReveal>
                            <LineReveal delay={0.18} blur={14}>From The</LineReveal>
                            <LineReveal delay={0.30} blur={14}>
                                <span className="font-semibold">Roastery.</span>
                            </LineReveal>
                        </h2>
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "3rem", opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="mt-8 h-px"
                            style={{ background: "#6D8575" }}
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="mt-8 uppercase tracking-[0.22em] text-[0.55rem] font-light"
                            style={{ color: "rgba(202,203,167,0.35)" }}
                        >
                            Scroll to explore →
                        </motion.p>
                    </div>

                    {/* Gallery cards */}
                    {items.map((item, index) => (
                        <GalleryCard key={index} item={item} index={index} />
                    ))}

                    {/* End card — "View More" */}
                    <div
                        className="flex-shrink-0 flex items-center justify-center"
                        style={{ width: "clamp(180px, 22vw, 300px)", height: "70vh" }}
                    >
                        <a
                            href="/gallery"
                            className="btn-underline flex flex-col items-center gap-4 group"
                            style={{
                                color: "rgba(202,203,167,0.55)",
                                textDecoration: "none",
                                transition: "color 400ms ease",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "#CACBA7"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(202,203,167,0.55)"; }}
                        >
                            <span
                                className="uppercase tracking-[0.28em] font-light"
                                style={{ fontSize: "0.62rem" }}
                            >
                                View Gallery
                            </span>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{
                                transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
                            }}>
                                <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="0.8" />
                                <path d="M11 16h10M17 12l4 4-4 4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* Trailing spacer */}
                    <div className="flex-shrink-0 w-24" aria-hidden />
                </div>
            </div>

            {/* ── MOBILE/TABLET — Premium snap-scroll carousel ── */}
            <div
                className="lg:hidden"
                style={{ background: "#080f0a" }}
            >
                {/* Section header */}
                <div className="px-6 md:px-8 pt-16 md:pt-24 pb-8">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="uppercase tracking-[0.38em] text-[0.62rem] mb-5"
                        style={{ color: "rgba(255,255,255,0.32)" }}
                    >
                        Visual Journal
                    </motion.p>
                    <h2 className="text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.9] font-light text-white">
                        <LineReveal delay={0.05} blur={14}>Moments From</LineReveal>
                        <LineReveal delay={0.18} blur={14}>
                            <span className="font-semibold">The Roastery.</span>
                        </LineReveal>
                    </h2>
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "2.5rem", opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="mt-6 h-px"
                        style={{ background: "#6D8575" }}
                    />
                </div>

                {/* ── SNAP SCROLL CAROUSEL ── */}
                <MobileCarousel items={items} />

                {/* View Gallery CTA */}
                <div className="px-6 md:px-8 pb-16 md:pb-24 pt-8">
                    <a
                        href="/gallery"
                        className="flex items-center justify-between w-full py-5 px-6 rounded-none active:scale-[0.98] transition-transform duration-150"
                        style={{
                            border: "1px solid rgba(202,203,167,0.12)",
                            color: "rgba(202,203,167,0.65)",
                        }}
                    >
                        <span className="uppercase tracking-[0.28em] text-[0.62rem] font-light">
                            View Gallery
                        </span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}

/* ── Mobile snap-scroll carousel (client-side state for dot indicator) ── */
function MobileCarousel({ items }) {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onScroll = () => {
            const cardWidth = el.clientWidth * (window.innerWidth >= 768 ? 0.46 : 0.88);
            const gap = 16;
            const index = Math.round(el.scrollLeft / (cardWidth + gap));
            setActiveIndex(Math.min(index, items.length - 1));
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [items.length]);

    return (
        <div>
            {/* Scroll track */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    cursor: "grab",
                }}
            >
                {items.map((item, index) => (
                    <MobileCarouselCard key={index} item={item} index={index} />
                ))}
                {/* Trailing invisible spacer keeps last card snapping cleanly */}
                <div className="flex-shrink-0 w-1" aria-hidden />
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-5">
                {items.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => {
                            const el = scrollRef.current;
                            if (!el) return;
                            const cardWidth = el.clientWidth * (window.innerWidth >= 768 ? 0.46 : 0.88);
                            el.scrollTo({ left: i * (cardWidth + 16), behavior: "smooth" });
                        }}
                        className="transition-all duration-400"
                        style={{
                            width:        i === activeIndex ? "24px" : "6px",
                            height:       "6px",
                            borderRadius: i === activeIndex ? "3px" : "50%",
                            background:   i === activeIndex ? "#6D8575" : "rgba(202,203,167,0.22)",
                            border:       "none",
                            padding:      0,
                            cursor:       "pointer",
                            transition:   "width 400ms cubic-bezier(0.22,1,0.36,1), background 300ms ease, border-radius 400ms ease",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

/* ── Individual carousel card ── */
function MobileCarouselCard({ item, index }) {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "0px 0px -60px 0px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 * index }}
            className="relative flex-shrink-0 overflow-hidden"
            style={{
                /* 88vw on mobile, 46vw on tablet (2 cards visible + peek) */
                width: "clamp(260px, 88vw, 380px)",
                aspectRatio: "3/4",
                scrollSnapAlign: "start",
                borderRadius: "2px",
            }}
        >
            {/* Image with clip-path reveal */}
            <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 + 0.05 * index }}
                className="absolute inset-0"
            >
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + 0.05 * index }}
                    className="absolute inset-0"
                >
                    <Image src={item.src} alt={item.caption} fill className="object-cover" />
                </motion.div>
            </motion.div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Caption — always visible (touch-first) */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                    className="uppercase tracking-[0.28em] font-light block"
                    style={{ fontSize: "0.58rem", color: "rgba(202,203,167,0.8)" }}
                >
                    {item.caption}
                </span>
            </div>

            {/* Index watermark */}
            <div
                className="absolute top-4 right-4"
                style={{
                    fontFamily: "monospace",
                    fontSize: "0.5rem",
                    color: "rgba(202,203,167,0.3)",
                    letterSpacing: "0.2em",
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </div>
        </motion.div>
    );
}