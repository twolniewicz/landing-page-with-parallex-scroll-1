"use client";

import { Children, cloneElement, isValidElement, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHorizontalSnap } from "./useHorizontalSnap";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [vw, setVw] = useState(0);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const pageCount = children.length;

  const contentWidth = vw * pageCount;
  const maxX = -(contentWidth - vw);

  const x = useTransform(scrollYProgress, [0, 1], [0, maxX]);

  useHorizontalSnap(containerRef, pageCount);

  return (
    <section
      ref={containerRef}
      className="relative overflow-x-hidden"     // 🔥 NGĂN OVF ngay tại đây
      style={{ width: "100vw", height: `${pageCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">  {/* 🔥 đảm bảo không hiện scrollbar */}
        <motion.div
          style={{ x }}
          className="flex h-full will-change-transform"
        >
          {Children.map(children, (child, idx) =>
            isValidElement(child) ? (
              <div
                key={idx}
                style={{ width: "100vw" }}       // 🔥 Không dùng pixel, dùng 100vw
                className="h-full flex-shrink-0"
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
