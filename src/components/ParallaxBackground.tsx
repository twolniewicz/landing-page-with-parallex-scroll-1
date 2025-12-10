"use client";

import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

interface Props {
  bg: string;
  x?: MotionValue<string>;
  y?: MotionValue<string>;
  overlay?: string;
  direction: "vertical" | "horizontal" | "both";
}

export default function ParallaxBackground({ bg, x, y, overlay, direction }: Props) {
  return (
    <motion.div
      style={{
        x: direction !== "vertical" ? x : undefined,
        y: direction !== "horizontal" ? y : undefined,
      }}
      className="absolute inset-0 -z-10 will-change-transform"
    >
      {overlay && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className={`${overlay} w-full h-full`} />
        </div>
      )}

      <Image
        src={bg}
        alt="background"
        fill
        unoptimized
        className="object-cover"
        style={{ transform: "scale(1.2)", transformOrigin: "center" }}
      />
    </motion.div>
  );
}
