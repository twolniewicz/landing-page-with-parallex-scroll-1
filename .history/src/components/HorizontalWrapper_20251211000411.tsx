"use client";

import { Children, cloneElement, isValidElement, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHorizontalSnap } from "@/hooks/useHorizontalSnap";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const pageCount = children.length;

  // 🔥 Mỗi page = đúng 100vw
  const contentWidth = pageCount * 100;
  const maxX = -(contentWidth - 100); // chuyển đơn vị: 100vw * N

  // 🔥 transform sử dụng 100 → 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `${maxX}vw`]);

  useHorizontalSnap(containerRef, pageCount);

  return (
    <section
      ref={containerRef}
      className="relative overflow-x-hidden"
      style={{ width: "100vw", height: `${pageCount * 100}vh` }}
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
                className="h-full flex-shrink-0"
                style={{ width: "100vw" }} // 🔥 page rộng đúng viewport
              >
                {cloneElement(child, {
                  horizontalProgress: scrollYProgress,
                  horizontal: true,
                })}
              </div>
            ) : child
          )}
        </motion.div>
      </div>
    </section>
  );
}
