// components/sections/Testimonials.jsx
"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";

const testimonials = [
    {
        quote:
            "Coffee should tell the story of where it came from. Forest Farmer does exactly that.",
        author: "Specialty Coffee Enthusiast",
    },
    {
        quote:
            "Every cup feels intentional. Clean, balanced and beautifully roasted.",
        author: "Independent Roaster",
    },
    {
        quote:
            "One of the most thoughtful coffees I've experienced in recent years.",
        author: "Coffee Journal",
    },
];

export default function Testimonials() {
    return (
        <Section
            className="text-white"
            style={{ background: "#141f1a" }}
        >
            <div className="mb-20">
                <p
                    className="
          uppercase
          tracking-[0.4em]
          text-[0.65rem]
          text-white/40
          mb-8
          "
                >
                    Testimonials
                </p>

                <h2
                    className="
          text-[clamp(3rem,7vw,6rem)]
          leading-[0.9]
          font-light
          "
                >
                    What People
                    <br />
                    Are Saying.
                </h2>
            </div>

            <div className="space-y-20">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="border-t border-white/10 pt-10"
                    >
                        <blockquote
                            className="
              text-[clamp(1.6rem,3vw,2.5rem)]
              leading-[1.25]
              max-w-4xl
              font-light
              "
                        >
                            “{item.quote}”
                        </blockquote>

                        <p
                            className="
              mt-8
              uppercase
              tracking-[0.25em]
              text-sm
              text-white/45
              "
                        >
                            {item.author}
                        </p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}