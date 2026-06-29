// components/animations/LineReveal.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * LineReveal — premium masked-curtain text reveal.
 * Each line slides up from behind an invisible clip
 * while a kinetic blur simultaneously sharpens.
 *
 * Props:
 *   delay    {number} — stagger offset in seconds (default 0)
 *   blur     {number} — starting blur in px (default 16)
 *   duration {number} — animation duration in seconds (default 1.1)
 *   y        {string} — starting Y offset (default "108%")
 *   once     {boolean} — trigger only once (default true)
 */
export default function LineReveal({
    children,
    delay    = 0,
    blur     = 16,
    duration = 1.1,
    y        = "108%",
    once     = true,
}) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, {
        once,
        margin: "0px 0px -40px 0px",
    });

    return (
        <div
            ref={containerRef}
            style={{ overflow: "hidden", display: "block", lineHeight: "inherit" }}
        >
            <motion.div
                initial={{
                    y,
                    filter: `blur(${blur}px)`,
                    opacity: 0,
                }}
                animate={
                    isInView
                        ? { y: "0%", filter: "blur(0px)", opacity: 1 }
                        : { y, filter: `blur(${blur}px)`, opacity: 0 }
                }
                transition={{
                    duration,
                    ease: [0.16, 1, 0.3, 1],
                    delay,
                }}
                style={{ display: "block" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
