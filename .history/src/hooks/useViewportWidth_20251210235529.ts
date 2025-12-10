"use client";

import { useState, useEffect } from "react";

export function useViewportWidth() {
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return vw;
}
