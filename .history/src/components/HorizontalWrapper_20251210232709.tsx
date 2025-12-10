"use client";

import { Children, isValidElement, cloneElement, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHorizontalSnap } from "./useHorizontalSnap";
import { useElementSize } from "./useElementSize"; 

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxX = -((children.length - 1) * (typeof window !== "undefined" ? window.innerWidth : 0));
  const x = useTransform(scrollYProgress, [0, 1], [0, maxX]);

  useHorizontalSnap(containerRef, x);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${children.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {Children.map(children, (child, idx) =>
            isValidElement(child) ? (
              <div key={idx} className="w-screen h-screen flex-shrink-0">
                {cloneElement(child, { horizontalProgress: scrollYProgress, horizontal: true })}
              </div>
            ) : (
              child
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
