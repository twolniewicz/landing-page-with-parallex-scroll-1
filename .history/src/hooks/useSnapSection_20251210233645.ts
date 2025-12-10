"use client";

import { RefObject, useEffect } from "react";

export function useHorizontalSnap(
  ref: RefObject<HTMLElement>,
  pageCount: number
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const viewportH = window.innerHeight;
      const scrollY = window.scrollY;

      // tìm page gần nhất
      const index = Math.round(scrollY / viewportH);

      const target = index * viewportH;

      window.scrollTo({
        top: target,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, pageCount]);
}
