"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface SectionProps {
  bg?: string;
  html?: React.ReactNode;
  parallax?: boolean;
  direction?: "vertical" | "horizontal" | "both";
  height?: string;
  center?: boolean;
  overlay?: string;
  horizontal?: boolean;
  horizontalProgress?: any;
}

export default function ParallaxSection({
  bg,
  html,
  parallax = true,
  direction = "vertical",
  height = "h-screen",
  center = false,
  overlay = "",
  horizontal = false,
  horizontalProgress, 
}: SectionProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax && (direction === "vertical" || direction === "both")
      ? ["-20%", "10%"]
      : ["0%", "0%"]
  );

  const x = useTransform(
    horizontalProgress ?? scrollYProgress,
    [0, 1],
    parallax && (direction === "horizontal" || direction === "both")
      ? ["10%", "-10%"] 
      : ["0%", "0%"]
  );

  return (
    <section
      ref={ref}
      className={`relative w-screen overflow-hidden ${height} ${
        horizontal ? "shrink-0" : ""
      }`}
    >
      {bg && (
        <motion.div
          style={{
            x: direction !== "vertical" ? x : undefined,
            y: direction !== "horizontal" ? y : undefined,
          }}
          className="absolute inset-0 -z-10 will-change-transform"
        >
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className={`${overlay} w-full h-full`} />
          </div>

          <Image
            src={bg}
            alt="background"
            fill
            unoptimized
            className="object-cover scale-[1.1]"
          />
        </motion.div>
      )}

      <div
        className={`relative z-20 w-full h-full ${
          center ? "flex items-center justify-center" : "p-[5vw]"
        }`}
      >
        {html}
      </div>
    </section>
  );
}
