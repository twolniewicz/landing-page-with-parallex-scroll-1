"use client";

import { Children, cloneElement, isValidElement, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useElementSize } from "@/hooks/useElementSize"; 
import { useHorizontalSnap } from "@/hooks/useHorizontalSnap";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width: containerWidth } = useElementSize(containerRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const pageCount = children.length;

  const contentWidth = containerWidth * pageCount;
  const maxX = -(contentWidth - containerWidth);

  const x = useTransform(scrollYProgress, [0, 1], [0, maxX]);

  useHorizontalSnap(containerRef, pageCount);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ width: `100vw`, height: `${pageCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex w-full h-full will-change-transform">
          {Children.map(children, (child, idx) =>
            isValidElement(child) ? (
              <div key={idx} className="w-full h-full flex-shrink-0">
                {cloneElement(child, {
                  horizontalProgress: scrollYProgress,
                  horizontal: true,
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
