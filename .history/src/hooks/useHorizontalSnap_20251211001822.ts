"use client";

import { useEffect } from "react";

export function useHorizontalSnap(
  ref: React.RefObject<HTMLElement>,
  pages: number
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: any;

    const onScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const viewportHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const pageIndex = Math.round(scrolled / viewportHeight);
        window.scrollTo({
          top: pageIndex * viewportHeight,
          behavior: "smooth",
        });
      }, 70);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, pages]);
}
