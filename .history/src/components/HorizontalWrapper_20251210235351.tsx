"use client";

import { Children, cloneElement, isValidElement, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useElementSize } from "@/hooks/useElementSize"; 
import { useHorizontalSnap } from "./useHorizontalSnap";
import { useViewportWidth } from "@/hooks/useViewportWidth";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vw = useViewportWidth();
  const pageCount = Children.count(children);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxX = -(vw * (pageCount - 1));

  const x = useTransform(scrollYProgress, [0, 1], [0, maxX]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${pageCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {Children.map(children, (child, idx) => (
            <div key={idx} style={{ width: vw, height: "100vh" }}>
              {cloneElement(children, {
                horizontalProgress: scrollYProgress,
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}