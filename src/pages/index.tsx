"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import HorizontalWrapper from "@/components/HorizontalWrapper";
import SectionContent from "@/components/ParallaxSection";

export default function App() {
  const hero = "/1.jpg";
  const bg1 = "/2.jpg";

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <SectionContent
        bg={hero}
        direction="vertical"
        parallax
        center
        height="h-[120vh]"
        html={<h1 className="text-[6vw] text-white uppercase">Hero Section</h1>}
      />

      <HorizontalWrapper>
        <SectionContent
          bg={bg1}
          direction="horizontal"
          parallax
          center
          html={<h1 className="text-[5vw] text-white uppercase">Slide 1</h1>}
        />

        <SectionContent
          bg={bg1}
          direction="horizontal"
          parallax
          center
          html={<h1 className="text-[5vw] text-white uppercase">Slide 2</h1>}
        />
      </HorizontalWrapper>

      <SectionContent
        parallax={false}
        direction="vertical"
        html={
          <div>
            <h2 className="text-[4vw] text-black font-bold">Normal Section</h2>
            <p className="mt-4 text-xl text-black max-w-[60ch]">
            This is a normal content section without parallax.
            </p>
          </div>
        }
      />
    </div>
  );
}
