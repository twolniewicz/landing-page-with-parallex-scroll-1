"use client";

import {
  useRef,
  useLayoutEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHorizontalSnap } from "./useHorizontalSnap";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useLayoutEffect(() => {
    function calc() {
      const inner = innerRef.current;
      if (!inner) return;
      const slides = Array.from(inner.children) as HTMLElement[];
      const total = slides.reduce((acc, el) => acc + Math.round(el.getBoundingClientRect().width), 0);
      setContentWidth(total);
    }
    calc();
    const id = setTimeout(calc, 50);
    const ro = new ResizeObserver(calc);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", calc);

    return () => {
      clearTimeout(id);
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const maxX = contentWidth ? -(contentWidth - (typeof window !== "undefined" ? window.innerWidth : 0)) : 0;
  const x = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0, maxX, maxX]);

  useHorizontalSnap(containerRef, x);
  
  return (
    <section ref={containerRef} className="relative justify-center" style={{ height: contentWidth ? `calc(${Math.max(1, (contentWidth / (typeof window !== "undefined" ? window.innerWidth : 1)))} * 100vh)` : "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={innerRef}
          style={{ x, width: contentWidth || "auto" }}
          className="flex h-full will-change-transform"
        >
          {Children.map(children, (child, idx) => {
            if (isValidElement(child)) {
              return (
                <div key={idx} className="w-screen h-screen flex-shrink-0">
                  {cloneElement(child, {
                    horizontalProgress: scrollYProgress,
                    horizontal: true,
                  })}
                </div>
              );
            }
            return child;
          })}
        </motion.div>
      </div>
    </section>
  );
}
