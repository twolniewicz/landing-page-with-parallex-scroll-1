"use client";

import { useMemo, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useSnapSection } from "@/hooks/useSnapSection";
import ParallaxBackground from "./ParallaxBackground";

interface SectionProps {
  bg?: string;
  html?: React.ReactNode;
  parallax?: boolean;
  direction?: "vertical" | "horizontal" | "both";
  height?: string;
  center?: boolean;
  overlay?: string;
  horizontalProgress?: MotionValue<number>;
}

export default function ParallaxSection({
  bg,
  html,
  parallax = true,
  direction = "vertical",
  height = "h-screen",
  center = false,
  overlay = "",
  horizontalProgress,
}: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useSnapSection(ref);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useMemo(() => {
    return useTransform(
      scrollYProgress,
      [0, 1],
      parallax && (direction === "vertical" || direction === "both")
        ? ["-20%", "10%"]
        : ["0%", "0%"]
    );
  }, [scrollYProgress, parallax, direction]);

  const x = useMemo(() => {
    const source = horizontalProgress ?? scrollYProgress;
    return useTransform(
      source,
      [0, 1],
      parallax && (direction === "horizontal" || direction === "both")
        ? ["10%", "-10%"]
        : ["0%", "0%"]
    );
  }, [horizontalProgress, scrollYProgress, parallax, direction]);

  return (
    <section ref={ref} className={`relative w-screen overflow-hidden ${height}`}>
      {bg && (
        <ParallaxBackground
          bg={bg}
          x={direction !== "vertical" ? x : undefined}
          y={direction !== "horizontal" ? y : undefined}
          overlay={overlay}
          direction={direction}
        />
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
