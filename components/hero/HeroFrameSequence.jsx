// components/hero/HeroFrameSequence.jsx
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

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
    const [loaderOpacity, setLoaderOpacity] = useState(1);


    const framesReady = loadingProgress === 100;

    useEffect(() => {

        if (!framesReady || !minTimePassed) return;

        setLoaderPhase("filled");

    }, [framesReady, minTimePassed]);

    useEffect(() => {

        if (loaderPhase !== "filled") return;

        const timer = setTimeout(() => {
            setLoaderPhase("expanding");
        }, 500);

        return () => clearTimeout(timer);

    }, [loaderPhase]);

    useEffect(() => {

        if (loaderPhase !== "expanding") return;

        requestAnimationFrame(() => {
            setLogoScale(150);
        });

        const timer = setTimeout(() => {
            setLoaderPhase("portal");
        }, 10);

        return () => clearTimeout(timer);

    }, [loaderPhase]);

    useEffect(() => {

        if (loaderPhase !== "portal") return;

        requestAnimationFrame(() => {
            setPortalWidth(100);
        });

        const openTimer = setTimeout(() => {
            setPortalHeight(window.innerHeight);
        }, 1200);

        const revealTimer = setTimeout(() => {
            setHeroReveal(true);
            setLoaderOpacity(0);

            setTimeout(() => {
                setShowLoader(false);
            }, 600);
        }, 2400);

        return () => {
            clearTimeout(openTimer);
            clearTimeout(revealTimer);
        };

    }, [loaderPhase]);

    const canvasRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimePassed(true);
        }, 3000);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const frameCount = 240;
        let imagesLoaded = 0;
        const totalFrames = frameCount;

        const images = [];

        const frames = Array.from(
            { length: frameCount },
            (_, i) =>
                `/frames/hero/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
        );
        const sequence = {
            frame: 0,
        };

        let currentFrame = 0;

        // ─── renderFrame declared FIRST ───────────────────────────────────────
        // Must be defined before resizeCanvas, which calls it.
        //
        // FIX 1 — guard against unloaded images:
        // The original guard `if (!image) return` only checked existence.
        // A `new Image()` object is always truthy, even before it has loaded.
        // Calling ctx.drawImage on an unloaded image produces image.naturalWidth
        // === 0, which makes imageAspect = NaN, and all draw dimensions NaN.
        // ctx.drawImage with NaN parameters silently draws nothing — canvas
        // stays black with no error thrown. The fix: also require naturalWidth
        // > 0, which is only true once the image has fully decoded.
        const renderFrame = (index) => {
            const image = images[index];

            // Guard: image must exist AND be fully decoded.
            // A `new Image()` is always truthy before it loads, so the original
            // `if (!image) return` was insufficient. An unloaded image has
            // naturalWidth === 0, which produces NaN geometry in the cover-fit
            // math and causes ctx.drawImage to silently draw nothing.
            if (!image || !image.naturalWidth) return;

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            const imageAspect = image.naturalWidth / image.naturalHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const canvasAspect =
                viewportWidth / viewportHeight;

            let drawWidth;
            let drawHeight;
            let offsetX;
            let offsetY;

            if (imageAspect > canvasAspect) {
                drawHeight = viewportHeight;
                drawWidth = drawHeight * imageAspect;
                offsetX = (viewportWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = viewportWidth;
                drawHeight = drawWidth / imageAspect;
                offsetX = 0;
                offsetY = (viewportHeight - drawHeight) / 2;
            }

            ctx.drawImage(
                image,
                offsetX,
                offsetY,
                drawWidth,
                drawHeight
            );
        };
        // ─────────────────────────────────────────────────────────────────────

        // ─── canvas sizing helpers ──────────────────────────────────────────────
        //
        // Responsibilities are split deliberately:
        //
        //   applyDPR()      — resizes the canvas bitmap and resets the context
        //                     transform for the current devicePixelRatio.
        //                     Does NOT draw a frame. Safe to call any time.
        //
        //   resizeCanvas()  — called by the window 'resize' listener.
        //                     Only calls applyDPR(). Frame redraw is intentionally
        //                     NOT done here; it is handled by ScrollTrigger's
        //                     onRefresh callback (below) which fires after GSAP
        //                     has finished recalculating pin-spacer heights,
        //                     trigger start/end positions, and scroll-progress.
        //
        //                     If we drew a frame here (in the resize listener)
        //                     we would race against ScrollTrigger's deferred
        //                     refresh: resizeCanvas runs synchronously with the
        //                     resize event while ScrollTrigger.refresh() runs in
        //                     a subsequent RAF. Whichever runs last wins, and the
        //                     loser's frame draw is computed against stale pin
        //                     geometry — producing the wrong frame or wrong
        //                     viewport scale.
        const applyDPR = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        const resizeCanvas = () => {
            // Resize the bitmap only. onRefresh redraws the frame once
            // ScrollTrigger has updated its scroll metrics.
            applyDPR();
        };

        // FIX: initialise frame 0 BEFORE calling resizeCanvas.
        // Previously frame 0 was set up well after resizeCanvas() was called,
        // so images[0] was always undefined on the first draw attempt.
        // Moving it here means cached images are available immediately and
        // resizeCanvas() can draw frame 0 on the very first call.
        //
        // onload MUST be assigned before .src — safe async-load path.
        const frame0 = new Image();
        images[0] = frame0;
        frame0.onload = () => renderFrame(0);
        frame0.src = frames[0];
        // Belt-and-suspenders for synchronous cache hits.
        if (frame0.complete && frame0.naturalWidth > 0) renderFrame(0);

        // ─── initial canvas setup ──────────────────────────────────────────────
        // applyDPR() sizes the canvas for the current viewport. We call it once
        // here (not resizeCanvas, which skips the frame draw on purpose) and
        // then immediately try to draw frame 0 in case it is already cached.
        applyDPR();
        renderFrame(0);                 // no-op if frame0 not yet decoded
        window.addEventListener("resize", resizeCanvas);

        const preloadImage = (index) => {
            const img = new Image();

            img.onload = () => {
                imagesLoaded++;

                setLoadingProgress(
                    Math.round(
                        (imagesLoaded / totalFrames) * 100
                    )
                );
            };

            img.src = frames[index];

            images[index] = img;
        };

        // Start from i=1 — frame 0 has its own dedicated Image object above.
        for (let i = 1; i < frameCount; i++) {
            preloadImage(i);
        }

        // Store the tween so we can kill it in the cleanup below.
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
                end: "+=3000",
                scrub: true,
                pin: true,
                // onRefresh fires after every ScrollTrigger.refresh():
                //   • the initial internal refresh that runs during setup
                //   • subsequent window-resize recalculations
                // This ensures the correct frame is always drawn after a layout
                // recalc — including frame 0 at progress=0 on page load, which
                // onUpdate's dedup guard would otherwise silently skip.
                onRefresh: (self) => {
                    const frame = Math.round(
                        self.progress * (frameCount - 1)
                    );
                    currentFrame = frame;
                    renderFrame(frame);
                },
            },
        });

        // ─── cleanup ──────────────────────────────────────────────────────────
        //
        // ORDER MATTERS — we must kill the ScrollTrigger BEFORE killing the
        // tween, and we must do both BEFORE React commits its DOM deletions.
        //
        // Why tween.kill() alone is insufficient:
        //   GSAP's pin:true physically moves sectionRef.current into a new
        //   <div class="pin-spacer"> that GSAP inserts into the real DOM.
        //   React's fiber tree still records the ORIGINAL parent.
        //   Per GSAP docs: "Killing the ScrollTrigger kills the animation.
        //   Killing the animation does NOT kill the ScrollTrigger."
        //   So tween.kill() removes the animation but leaves the pin-spacer
        //   in place. React then calls originalParent.removeChild(section),
        //   but the section is inside pin-spacer, not originalParent →
        //   NotFoundError: "The node to be removed is not a child of this node."
        //
        // tween.scrollTrigger.kill() reverts the pin: removes pin-spacer,
        // moves section back to its original parent, and kills the animation.
        // The subsequent tween.kill() is a safe no-op.
        return () => {
            clearTimeout(timer);

            window.removeEventListener("resize", resizeCanvas);
            tween.scrollTrigger?.kill(); // reverts pin-spacer DOM changes first
            tween.kill();               // safe no-op; belt-and-suspenders
        };


    }, []);



    return (
        <>
            {showLoader && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#7A8B78]"
                    style={{
                        opacity: loaderOpacity,
                        transition: "opacity 0.6s ease",
                    }}
                >

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
                            style={{
                                transform: "translateY(5px)",
                            }}
                        />

                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                clipPath: `inset(${100 - loadingProgress}% 0 0 0)`,
                            }}
                        >
                            <img
                                src="/images/brand/logo.png"
                                alt="Forest Farmer"
                                className="absolute inset-0 w-full h-full object-contain"
                                style={{
                                    transform: "translateY(5px)",
                                }}
                            />
                        </div>



                    </div>
                    {loaderPhase === "portal" && (

                        <div

                            className="absolute left-1/2 top-1/2"

                            style={{

                                width: `${portalWidth}vw`,

                                height: `${portalHeight}px`,

                                backgroundColor: heroReveal ? "transparent" : "white",

                                transform: "translate(-50%, -50%)",

                                transition: "width 1.2s cubic-bezier(0.22,1,0.36,1), height 1.2s cubic-bezier(0.22,1,0.36,1)",

                            }}

                        />

                    )}

                </div>


            )}

            <section
                ref={sectionRef}
                className="relative h-[400vh] w-full overflow-hidden"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-screen h-screen"

                />
            </section>
        </>
    );
}