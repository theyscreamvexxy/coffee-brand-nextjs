// components/layout/ScrollProgressBar.jsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.vars?.trigger === undefined) t.kill();
            });
        };
    }, []);

    return (
        <div
            ref={barRef}
            className="scroll-progress-bar"
            style={{
                width: "100%",
                transformOrigin: "left center",
                transform: "scaleX(0)",
            }}
        />
    );
}
