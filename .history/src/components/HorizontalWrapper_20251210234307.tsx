"use client";

import { Children, isValidElement, cloneElement, useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHorizontalSnap } from "./useHorizontalSnap";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = Children.count(children);

  // measure width properly
  const widthRef = useRef(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    widthRef.current = containerRef.current.getBoundingClientRect().width;

    const onResize = () => {
      widthRef.current = containerRef.current!.getBoundingClientRect().width;
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxX = useTransform(scrollYProgress, v => -(total - 1) * widthRef.current * v);

  useHorizontalSnap(containerRef, maxX);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x: maxX }} className="flex h-full will-change-transform">
          {Children.map(children, (child, idx) =>
            isValidElement(child) ? (
              <div key={idx} className="w-screen h-screen flex-shrink-0">
                {cloneElement(child, {
                  horizontalProgress: scrollYProgress,
                })}
              </div>
            ) : child
          )}
        </motion.div>
      </div>
    </section>
  );
}
