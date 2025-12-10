"use client";

import {
  useRef,
  useLayoutEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
  useEffect,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHorizontalSnap } from "./useHorizontalSnap";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Recalculate widths after mount and on resize
  useLayoutEffect(() => {
    function calc() {
      const inner = innerRef.current;
      if (!inner) return;
      // sum widths of direct child slide wrappers
      const slides = Array.from(inner.children) as HTMLElement[];
      const total = slides.reduce((acc, el) => acc + Math.round(el.getBoundingClientRect().width), 0);
      setContentWidth(total);
    }

    // initial calc (next tick in case fonts/images change layout)
    calc();
    // guard: recalc a bit later to catch late render
    const id = setTimeout(calc, 50);

    // resize observer to adapt to window resize
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

  // maxX = negative px to move so last slide aligns to viewport left
  const maxX = contentWidth ? -(contentWidth - (typeof window !== "undefined" ? window.innerWidth : 0)) : 0;

  // keep same 4-phase mapping but in px
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
