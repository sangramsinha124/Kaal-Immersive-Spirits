"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");

      gsap.from(words, {
        y: 120,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      gsap.to(".manifesto-line", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "center center",
          scrub: true,
        },
      });
    },
    {
      scope: container,
    },
  );

  return (
    <section
      id="story"
      ref={container}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
    >
      <div className="w-full max-w-6xl">
        <p className="manifesto-word mb-8 text-xs uppercase tracking-[0.6em] text-white/30">
          The beginning
        </p>

        <div className="mb-10 h-px w-full overflow-hidden bg-white/10">
          <div className="manifesto-line h-full w-full origin-left scale-x-0 bg-white/50" />
        </div>

        <h2 className="text-5xl font-medium leading-[0.95] tracking-tight text-white md:text-8xl lg:text-[9rem]">
          <span className="manifesto-word block">Every drop</span>

          <span className="manifesto-word block text-white/30">
            carries a story
          </span>

          <span className="manifesto-word block">of the monsoon.</span>
        </h2>

        <div className="mt-16 flex justify-end">
          <p className="manifesto-word max-w-sm text-sm leading-relaxed text-white/40">
            Born from the collision of water, earth, botanical life and fire.
          </p>
        </div>
      </div>
    </section>
  );
}
