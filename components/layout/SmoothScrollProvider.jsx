// components/layout/SmoothScrollProvider.jsx
"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function useLenis() {
    return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialise Lenis with premium inertia settings
        const lenis = new Lenis({
            lerp: 0.07,               // low lerp = heavy, luxurious feel
            smoothWheel: true,
            wheelMultiplier: 0.85,    // slightly reduced for heavier feel
            touchMultiplier: 1.5,
            infinite: false,
            orientation: "vertical",
            gestureOrientation: "vertical",
            normalizeWheel: false,
            smoothTouch: false,       // disable on iOS (native scroll is better)
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ticker — critical for ScrollTrigger accuracy
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's own lag smoothing since Lenis handles it
        gsap.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger after Lenis is ready
        ScrollTrigger.refresh();

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}
