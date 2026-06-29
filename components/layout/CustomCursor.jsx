// components/layout/CustomCursor.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const dotRef  = useRef(null);
    const ringRef = useRef(null);
    const labelRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState("");

    useEffect(() => {
        // Only run on non-touch devices
        if (window.matchMedia("(hover: none)").matches) return;

        const dot  = dotRef.current;
        const ring = ringRef.current;
        const lbl  = labelRef.current;

        if (!dot || !ring) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX  = mouseX;
        let ringY  = mouseY;

        // Quick-move dot — instant
        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.set(dot, { x: mouseX, y: mouseY });
            if (!visible) setVisible(true);
        };

        // Smooth ring follows with lag
        const ticker = gsap.ticker.add(() => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            gsap.set(ring, { x: ringX, y: ringY });
            if (lbl) gsap.set(lbl, { x: ringX, y: ringY });
        });

        window.addEventListener("mousemove", onMove);

        // ─── Hover states ───────────────────────────────────────────────
        const expandTargets = document.querySelectorAll(
            "a, button, [data-cursor]"
        );

        const imageTargets = document.querySelectorAll(
            "[data-cursor='view']"
        );

        const expand = (e) => {
            const el = e.currentTarget;
            const cursorType = el.dataset.cursor;
            gsap.to(ring, {
                width: cursorType === "view" ? 80 : 64,
                height: cursorType === "view" ? 80 : 64,
                borderColor: "rgba(202,203,167,0.8)",
                duration: 0.4,
                ease: "power2.out",
            });
            gsap.to(dot, {
                width: 4,
                height: 4,
                duration: 0.3,
                ease: "power2.out",
            });
            if (cursorType === "view" && lbl) {
                setLabel("View");
                gsap.to(lbl, { opacity: 1, duration: 0.3 });
            }
        };

        const contract = () => {
            gsap.to(ring, {
                width: 40,
                height: 40,
                borderColor: "rgba(202,203,167,0.5)",
                duration: 0.4,
                ease: "power2.out",
            });
            gsap.to(dot, {
                width: 8,
                height: 8,
                duration: 0.3,
                ease: "power2.out",
            });
            if (lbl) {
                setLabel("");
                gsap.to(lbl, { opacity: 0, duration: 0.2 });
            }
        };

        const clickPress = () => {
            gsap.to(ring, { scale: 0.85, duration: 0.1, ease: "power2.out" });
        };
        const clickRelease = () => {
            gsap.to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
        };

        expandTargets.forEach((el) => {
            el.addEventListener("mouseenter", expand);
            el.addEventListener("mouseleave", contract);
        });

        window.addEventListener("mousedown", clickPress);
        window.addEventListener("mouseup", clickRelease);

        const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
        const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", clickPress);
            window.removeEventListener("mouseup", clickRelease);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
            expandTargets.forEach((el) => {
                el.removeEventListener("mouseenter", expand);
                el.removeEventListener("mouseleave", contract);
            });
            gsap.ticker.remove(ticker);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{ opacity: visible ? 1 : 0 }}
            />
            <div
                ref={ringRef}
                className="cursor-ring"
                style={{ opacity: visible ? 1 : 0 }}
            />
            <div
                ref={labelRef}
                className="cursor-label"
            >
                {label}
            </div>
        </>
    );
}
