"use client";

import { useEffect } from "react";
import { MotionValue, animate } from "framer-motion";

export function useHorizontalSnap(
  containerRef: React.RefObject<HTMLElement>,
  x: MotionValue<number>,
  slideWidth = typeof window !== "undefined" ? window.innerWidth : 0
) {
  useEffect(() => {
    let timeout: any;
    let currentAnimation: any = null;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (currentAnimation) {
        currentAnimation.stop();
        currentAnimation = null;
      }

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const current = x.get();
        const pos = Math.abs(current);
        const index = Math.round(pos / slideWidth);
        const targetX = -index * slideWidth;

        currentAnimation = animate(x, targetX, {
          type: "spring",
          stiffness: 120,
          damping: 22,
          onComplete: () => {
            currentAnimation = null;
          },
        });
      }, 120);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [containerRef, x, slideWidth]);
}
