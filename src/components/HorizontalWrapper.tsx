"use client";

import { useRef, Children, isValidElement, cloneElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HorizontalWrapper({
  children,
}: {
  children: React.ReactNode[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const totalWidth = (children.length - 1) * 100;

  const x = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    ["0%", "0%", `-${totalWidth}%`, `-${totalWidth}%`]
  );

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {Children.map(children, (child, idx) => {
            if (isValidElement(child)) {
              return (
                <div key={idx} className="w-screen h-screen flex-shrink-0">
                  {cloneElement(child, {
                    horizontalProgress: progressX,
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
