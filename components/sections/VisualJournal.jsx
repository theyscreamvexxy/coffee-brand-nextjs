// components/sections/VisualJournal.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";

const items = [
    {
        type: "image",
        src: "/images/gallery/gallery-1.png",
        link: "#",
    },
    {
        type: "image",
        src: "/images/gallery/gallery-2.png",
        link: "#",
    },
    {
        type: "image",
        src: "/images/gallery/gallery-3.png",
        link: "#",
    },
];

export default function VisualJournal() {
    return (
        <Section
            className="text-white"
            style={{ background: "#141f1a" }}
        >
            <div className="mb-16">

                <p
                    className="
          uppercase
          tracking-[0.38em]
          text-[0.65rem]
          text-white/40
          mb-6
          "
                >
                    Visual Journal
                </p>

                <h2
                    className="
          text-[clamp(3rem,7vw,6rem)]
          leading-[0.9]
          font-light
          "
                >
                    Moments From
                    <br />
                    The Roastery.
                </h2>

            </div>

            <div className="space-y-8">

                {/* Large Feature */}
                <motion.a
                    href={items[0].link}
                    whileHover={{ scale: 1.01 }}
                    className="
          relative
          block
          overflow-hidden
          aspect-[16/9]
          "
                >
                    <Image
                        src={items[0].src}
                        alt=""
                        fill
                        className="object-cover"
                    />
                </motion.a>

                {/* Two Smaller */}
                <div className="grid md:grid-cols-2 gap-8">

                    {items.slice(1).map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            whileHover={{ scale: 1.01 }}
                            className="
              relative
              block
              overflow-hidden
              aspect-square
              "
                        >
                            <Image
                                src={item.src}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </motion.a>
                    ))}

                </div>

            </div>

            <div className="mt-12">

                <button
                    className="
          uppercase
          tracking-[0.25em]
          text-sm
          text-white/50
          hover:text-white
          transition
          "
                >
                    View More Stories →
                </button>

            </div>

        </Section>
    );
}