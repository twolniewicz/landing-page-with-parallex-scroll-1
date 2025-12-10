"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { useHorizontalSnap } from "@/hooks/useHorizontalSnap";

export default function HorizontalWrapper({
  children,
}: {
  children: React.ReactNode[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Always correct width → fixes all misalignment bugs
  const vw = useViewportWidth();
  const pageCount = Children.count(children);

  // Vertical scroll drives horizontal movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move horizontally from 0 → -(viewportWidth * (pages-1))
  const maxX = -(vw * (pageCount - 1));
  const x = useTransform(scrollYProgress, [0, 1], [0, maxX]);

  // Horizontal snapping
  useHorizontalSnap(containerRef, pageCount);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: `${pageCount * 100}vh`, // scroll height
        width: "100vw",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full will-change-transform"
        >
          {Children.map(children, (child, idx) =>
            isValidElement(child) ? (
              <div
                key={idx}
                style={{
                  width: vw,
                  height: "100vh",
                  flexShrink: 0,
                }}
              >
                {cloneElement(child, {
                  horizontalProgress: scrollYProgress,
                })}
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
