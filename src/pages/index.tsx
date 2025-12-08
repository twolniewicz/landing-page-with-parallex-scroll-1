"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import HorizontalWrapper from "@/components/HorizontalWrapper";
import SectionContent from "@/components/ParallaxSection";

export default function App() {
  const hero = "/hero2.jpg";
  const bg1 = "/3.jpg";
  const bg2 = "/2.jpg";
  const bg3 = "/4.jpg";

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
        //height="h-[100vh]"
        html={<div className="items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div><center><h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg"><font color="#d9feff">D</font>ata <font color="#d9feff">G</font>overnance <span className="font-normal"><i>by</i></span> <font color="#d9feff">Design</font><span className="font-normal"><sup><small><small> TM</small></small> </sup></span></h1>
          <p className="mt-4 text-lg md:text-xl text-white drop-shadow-lg mix-blend-difference">Leadership and Strategic Advisory in Business Value driven DG/DQ & DM Initiatives</p>
          </center></div>
        }
      />

      <SectionContent
        bg={bg3}
        direction="vertical"
        parallax
        center={false}
        //height="h-[120vh]"
        html={<div className="items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div><h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mix-blend-difference">DG<span className="font-normal"><i>by</i></span>Design<span className="font-normal"><sup><small><small> TM</small></small></sup></span> Methodology</h1>
          <p className="mt-4 text-lg md:text-xl text-white drop-shadow-lg mix-blend-difference">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        }
      />

      <HorizontalWrapper>
        <SectionContent
          bg={bg1}
          direction="both"
          parallax
          center={false}
          html={<div className="items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div><h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mix-blend-difference">DG<span className="font-normal"><i>by</i></span>Design<span className="font-normal"><sup><small><small> TM</small></small></sup></span> Capabilities</h1>
          <p className="mt-4 text-lg md:text-xl text-white drop-shadow-lg mix-blend-difference">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          }
          
        />

        <SectionContent
          bg={bg2}
          direction="horizontal"
          parallax
          center={false}
          html={<div className="items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div><h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mix-blend-difference">DG<span className="font-normal"><i>by</i></span>Design<span className="font-normal"><sup><small><small> TM</small></small></sup></span> Industry Leadership</h1>
          <p className="mt-4 text-lg md:text-xl text-white drop-shadow-lg mix-blend-difference">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          }
        />

        <SectionContent
          bg={bg3}
          direction="both"
          parallax
          center={false}
          html={<div className="items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div><h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mix-blend-difference">DG<span className="font-normal"><i>by</i></span>Design<span className="font-normal"><sup><small><small> TM</small></small></sup></span> Team</h1>
          <p className="mt-4 text-lg md:text-xl text-white drop-shadow-lg mix-blend-difference">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          }
        />
      </HorizontalWrapper>

      <SectionContent
        parallax={false}
        direction="vertical"
        html={
          <div className="items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div><h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mix-blend-difference">DG<span className="font-normal"><i>by</i></span>Design<span className="font-normal"><sup><small><small> TM</small></small></sup></span> Contact Information</h1>
          <p className="mt-4 text-lg md:text-xl text-white drop-shadow-lg mix-blend-difference">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        }
      />
    </div>
  );
}
