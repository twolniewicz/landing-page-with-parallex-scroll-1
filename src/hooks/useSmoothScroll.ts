"use client";

import { useSpring } from "framer-motion";

export function useSmoothScroll(value: any) {
  return useSpring(value, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });
}
