// components/animations/ImageReveal.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/**
 * ImageReveal — premium clip-path image reveal wrapper.
 *
 * Props:
 *   src, alt, fill, className — passed to next/image
 *   direction  {"center"|"left"|"top"|"right"} — wipe direction (default "center")
 *   delay      {number} — delay in seconds
 *   duration   {number} — duration in seconds (default 1.6)
 *   scale      {number} — inner image starts at this scale (default 1.06)
 *   style      {object} — wrapper style
 *   aspectRatio {string} — wrapper aspect ratio (default "4/5")
 *   priority   {boolean}
 */
export default function ImageReveal({
    src,
    alt = "",
    fill = true,
    className = "object-cover",
    direction = "center",
    delay = 0,
    duration = 1.6,
    scale = 1.06,
    style = {},
    aspectRatio = "4/5",
    priority = false,
    children,
}) {
    const wrapRef = useRef(null);
    const inView = useInView(wrapRef, { once: true, margin: "0px 0px -60px 0px" });

    const clipVariants = {
        center: {
            initial: "inset(0 50% 0 50%)",
            animate: "inset(0 0% 0 0%)",
        },
        left: {
            initial: "inset(0 100% 0 0%)",
            animate: "inset(0 0% 0 0%)",
        },
        top: {
            initial: "inset(0% 0 100% 0)",
            animate: "inset(0% 0 0% 0)",
        },
        right: {
            initial: "inset(0 0% 0 100%)",
            animate: "inset(0 0% 0 0%)",
        },
    };

    const clip = clipVariants[direction] || clipVariants.center;

    return (
        <div
            ref={wrapRef}
            className="relative overflow-hidden"
            style={{ aspectRatio, ...style }}
        >
            <motion.div
                initial={{ clipPath: clip.initial }}
                animate={{ clipPath: inView ? clip.animate : clip.initial }}
                transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
                className="absolute inset-0"
            >
                {/* Inner layer — oversized for scale reveal */}
                <motion.div
                    initial={{ scale }}
                    animate={{ scale: inView ? 1 : scale }}
                    transition={{ duration: duration + 0.2, ease: [0.22, 1, 0.36, 1], delay }}
                    className="absolute inset-0 h-full w-full"
                >
                    {fill ? (
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className={className}
                            priority={priority}
                        />
                    ) : null}
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}
