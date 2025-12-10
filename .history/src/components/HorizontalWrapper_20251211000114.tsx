"use client";

import { Children, cloneElement, isValidElement, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHorizontalSnap } from "@/hooks/useHorizontalSnap";

export default function HorizontalWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [vw, setVw] = useState(0);

  // 🔥 Luôn đồng bộ với đúng width viewport
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

  // 🔥 Mỗi page = đúng bằng viewport width
  const contentWidth = vw * pageCount;
  const maxX = -(contentWidth - vw);

  const x = useTransform(scrollYProgress, [0, 1], [0, maxX]);

  useHorizontalSnap(containerRef, pageCount);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ width: vw, height: `${pageCount * 100}vh` }} // 🔥 width chuẩn theo viewport
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
                style={{ width: "100vw" }} // 🔥 page rộng bằng viewport
                className="h-full flex-shrink-0"
              >
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
