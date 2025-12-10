"use client";

import { useEffect } from "react";

export function useSnapSection(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (Math.abs(rect.top) < window.innerHeight * 0.4) {
          window.scrollTo({
            top: window.scrollY + rect.top,
            behavior: "smooth",
          });
        }
      }, 70);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref]);
}
