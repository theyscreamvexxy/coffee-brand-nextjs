// components/hero/HeroFrameSequence.jsx
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroFrameSequence() {

    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [minTimePassed, setMinTimePassed] = useState(false);
    const [loaderPhase, setLoaderPhase] = useState("loading");
    const [logoScale, setLogoScale] = useState(1);
    const [portalWidth, setPortalWidth] = useState(0);
    const [portalHeight, setPortalHeight] = useState(8);
    const [heroReveal, setHeroReveal] = useState(false);
    const [portalGreen, setPortalGreen] = useState(false);
    const [loaderOpacity, setLoaderOpacity] = useState(1);
    const [showScrollHint, setShowScrollHint] = useState(false);
    const [scrollHintVisible, setScrollHintVisible] = useState(true);

    const framesReady = loadingProgress === 100;

    useEffect(() => {
        if (!framesReady || !minTimePassed) return;
        setLoaderPhase("filled");
    }, [framesReady, minTimePassed]);

    useEffect(() => {
        if (loaderPhase !== "filled") return;
        const timer = setTimeout(() => { setLoaderPhase("expanding"); }, 500);
        return () => clearTimeout(timer);
    }, [loaderPhase]);

    useEffect(() => {
        if (loaderPhase !== "expanding") return;
        requestAnimationFrame(() => { setLogoScale(150); });
        const timer = setTimeout(() => { setLoaderPhase("portal"); }, 10);
        return () => clearTimeout(timer);
    }, [loaderPhase]);

    useEffect(() => {
        if (loaderPhase !== "portal") return;
        requestAnimationFrame(() => { setPortalWidth(100); });
        const openTimer = setTimeout(() => {
            setPortalGreen(true);
            setPortalHeight(window.innerHeight);
        }, 1200);
        const revealTimer = setTimeout(() => {
            setHeroReveal(true);
            setLoaderOpacity(0);
            setTimeout(() => {
                setShowLoader(false);
                // Show scroll hint after loader exits
                setTimeout(() => setShowScrollHint(true), 400);
            }, 600);
        }, 4200);
        return () => { clearTimeout(openTimer); clearTimeout(revealTimer); };
    }, [loaderPhase]);

    // Hide scroll hint on first scroll
    useEffect(() => {
        if (!showScrollHint) return;
        const onScroll = () => {
            setScrollHintVisible(false);
            window.removeEventListener("scroll", onScroll);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [showScrollHint]);

    const canvasRef  = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => { setMinTimePassed(true); }, 3000);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const frameCount = 240;
        let imagesLoaded = 0;
        const totalFrames = frameCount;
        const images = [];

        const frames = Array.from(
            { length: frameCount },
            (_, i) => `/frames/hero/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
        );
        const sequence = { frame: 0 };
        let currentFrame = 0;

        const renderFrame = (index) => {
            const image = images[index];
            if (!image || !image.naturalWidth) return;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            const imageAspect  = image.naturalWidth / image.naturalHeight;
            const viewportWidth  = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const canvasAspect   = viewportWidth / viewportHeight;
            let drawWidth, drawHeight, offsetX, offsetY;
            if (imageAspect > canvasAspect) {
                drawHeight = viewportHeight;
                drawWidth  = drawHeight * imageAspect;
                offsetX    = (viewportWidth - drawWidth) / 2;
                offsetY    = 0;
            } else {
                drawWidth  = viewportWidth;
                drawHeight = drawWidth / imageAspect;
                offsetX    = 0;
                offsetY    = (viewportHeight - drawHeight) / 2;
            }
            ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        };

        const applyDPR = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width  = window.innerWidth  * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width  = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        const resizeCanvas = () => { applyDPR(); };

        const frame0 = new Image();
        images[0] = frame0;
        frame0.onload = () => renderFrame(0);
        frame0.src = frames[0];
        if (frame0.complete && frame0.naturalWidth > 0) renderFrame(0);

        applyDPR();
        renderFrame(0);
        window.addEventListener("resize", resizeCanvas);

        const preloadImage = (index) => {
            const img = new Image();
            img.onload = () => {
                imagesLoaded++;
                setLoadingProgress(Math.round((imagesLoaded / totalFrames) * 100));
            };
            img.src = frames[index];
            images[index] = img;
        };

        for (let i = 1; i < frameCount; i++) { preloadImage(i); }

        const tween = gsap.to(sequence, {
            frame: frameCount - 1,
            ease: "none",
            onUpdate: () => {
                const frame = Math.round(sequence.frame);
                if (frame === currentFrame) return;
                currentFrame = frame;
                renderFrame(frame);
            },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=700",
                scrub: true,
                pin: true,
                onRefresh: (self) => {
                    const frame = Math.round(self.progress * (frameCount - 1));
                    currentFrame = frame;
                    renderFrame(frame);
                },
            },
        });

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", resizeCanvas);
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <>
            {/* ── LOADER ────────────────────────────────────────────────────── */}
            {showLoader && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#7A8B78]"
                    style={{ opacity: loaderOpacity, transition: "opacity 0.6s ease" }}
                >
                    {/* Logo fill reveal */}
                    <div
                        className="relative w-[180px] h-[260px]"
                        style={{
                            transform: `scale(${logoScale})`,
                            transformOrigin: "center center",
                            transition: "transform 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    >
                        <img
                            src="/images/brand/logo.png"
                            alt="Forest Farmer"
                            className="absolute inset-0 w-full h-full object-contain opacity-20"
                            style={{ transform: "translateY(5px)" }}
                        />
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `inset(${100 - loadingProgress}% 0 0 0)` }}
                        >
                            <img
                                src="/images/brand/logo.png"
                                alt="Forest Farmer"
                                className="absolute inset-0 w-full h-full object-contain"
                                style={{ transform: "translateY(5px)" }}
                            />
                        </div>
                    </div>

                    {/* Loading progress label */}
                    {loaderPhase === "loading" && (
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                            <div
                                className="h-px bg-white/20 relative overflow-hidden"
                                style={{ width: "120px" }}
                            >
                                <div
                                    className="absolute inset-y-0 left-0 bg-white/60"
                                    style={{
                                        width: `${loadingProgress}%`,
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            </div>
                            <span
                                style={{
                                    fontFamily: "var(--font-cormorant)",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.3em",
                                    color: "rgba(255,255,255,0.4)",
                                    textTransform: "uppercase",
                                }}
                            >
                                {loadingProgress}%
                            </span>
                        </div>
                    )}

                    {/* Portal phase */}
                    {loaderPhase === "portal" && (
                        <>
                            <div
                                className="absolute left-1/2 top-1/2"
                                style={{
                                    width: `${portalWidth}vw`,
                                    height: `${portalHeight}px`,
                                    backgroundColor: heroReveal
                                        ? "transparent"
                                        : portalGreen
                                            ? "#4E5B4A"
                                            : "white",
                                    filter: portalGreen ? "blur(120px)" : "blur(80px)",
                                    transform: "translate(-50%, -50%)",
                                    transition: "width 1.2s cubic-bezier(0.22,1,0.36,1), height 1.2s cubic-bezier(0.22,1,0.36,1), background-color 2s ease",
                                }}
                            />
                            {portalGreen && (
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 50%)",
                                        filter: "blur(80px)",
                                        opacity: 0.35,
                                        animation: "fogFloat 6s ease-in-out infinite",
                                    }}
                                />
                            )}
                            {portalGreen && !heroReveal && (
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                                    style={{ transform: "translateY(-50px)" }}
                                >
                                    <h1
                                        className="text-shimmer"
                                        style={{
                                            fontFamily: "var(--font-cormorant)",
                                            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                                            fontWeight: 500,
                                            letterSpacing: "0.22em",
                                            textTransform: "uppercase",
                                            textAlign: "center",
                                        }}
                                    >
                                        FOREST FARMER
                                    </h1>
                                    <p
                                        style={{
                                            color: "rgba(255,255,255,0.75)",
                                            marginTop: "24px",
                                            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                                            letterSpacing: "0.12em",
                                            textAlign: "center",
                                            maxWidth: "700px",
                                        }}
                                    >
                                        COFFEE ROASTER
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* ── HERO SECTION ──────────────────────────────────────────────── */}
            <section
                ref={sectionRef}
                className="relative h-[110vh] w-full overflow-hidden"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-screen h-screen"
                />

                {/* Cinematic vignette overlay */}
                <div className="vignette" />

                {/* Edge-corner coordinates — appear after hero reveal */}
                <AnimatePresence>
                    {heroReveal && (
                        <>
                            {/* Bottom-left coordinate */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.6, ease: [0.22,1,0.36,1] }}
                                className="absolute bottom-10 left-8 z-10 pointer-events-none"
                            >
                                <span style={{
                                    fontFamily: "monospace",
                                    fontSize: "0.52rem",
                                    letterSpacing: "0.18em",
                                    color: "rgba(202,203,167,0.40)",
                                    textTransform: "uppercase",
                                    display: "block",
                                }}>
                                    6.8756° N · 39.6014° E
                                </span>
                                <span style={{
                                    fontSize: "0.48rem",
                                    letterSpacing: "0.3em",
                                    color: "rgba(202,203,167,0.25)",
                                    textTransform: "uppercase",
                                    display: "block",
                                    marginTop: "4px",
                                }}>
                                    Forest Farms · Ethiopia
                                </span>
                            </motion.div>

                            {/* Bottom-right brand line */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.8, ease: [0.22,1,0.36,1] }}
                                className="absolute bottom-10 right-8 z-10 pointer-events-none text-right"
                            >
                                <span style={{
                                    fontFamily: "var(--font-cormorant)",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.28em",
                                    color: "rgba(202,203,167,0.35)",
                                    textTransform: "uppercase",
                                    display: "block",
                                }}>
                                    Specialty Coffee Roasters
                                </span>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Scroll indicator */}
                <AnimatePresence>
                    {showScrollHint && scrollHintVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
                        >
                            <span style={{
                                fontSize: "0.5rem",
                                letterSpacing: "0.32em",
                                textTransform: "uppercase",
                                color: "rgba(202,203,167,0.45)",
                                fontFamily: "var(--font-inter)",
                            }}>
                                Scroll
                            </span>
                            <svg
                                className="scroll-indicator-arrow"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path
                                    d="M7 1v12M1 7l6 6 6-6"
                                    stroke="rgba(202,203,167,0.45)"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
}