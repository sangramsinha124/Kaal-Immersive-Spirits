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
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".manifesto-image", {
        opacity: 0,
        scale: 1.06,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
    },
    {
      scope: container,
    },
  );

  return (
    <section
      id="manifesto"
      ref={container}
      className="relative grid min-h-[82svh] overflow-hidden bg-[#050505] text-white md:grid-cols-2"
      aria-labelledby="manifesto-heading"
    >
      <div className="relative z-10 flex min-h-[62svh] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 md:min-h-[680px] md:px-[clamp(3rem,7vw,7rem)] md:py-12">
        <div className="flex items-center justify-between gap-6">
          <p className="manifesto-word text-[10px] uppercase tracking-[0.5em] text-white/35">
            The Manifesto
          </p>
          <p className="manifesto-word text-[10px] uppercase tracking-[0.35em] text-white/30">
            02 / 07
          </p>
        </div>

        <div className="max-w-2xl py-16 md:py-12">
          <h2
            id="manifesto-heading"
            className="text-5xl font-light leading-[0.9] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[clamp(5rem,7vw,7.5rem)]"
          >
            <span className="manifesto-word block">More</span>
            <span className="manifesto-word block">than a spirit.</span>
            <span className="manifesto-word block text-white/35">A feeling.</span>
          </h2>

          <p className="manifesto-word mt-8 max-w-md text-sm leading-7 text-white/45 sm:mt-10 md:text-base md:leading-8">
            KAAL is born from the raw poetry of the monsoon — where rain meets
            earth, where nature and tradition unite, and where every drop tells
            a story.
          </p>

          <div className="manifesto-word mt-8 flex items-center gap-4 md:mt-10">
            <span className="h-px w-10 bg-white/25" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">
              Rooted in the monsoon
            </span>
          </div>
        </div>

        <span className="manifesto-word text-[9px] uppercase tracking-[0.35em] text-white/25">
          KAAL · India
        </span>
      </div>

      <div
        className="manifesto-image relative min-h-[42svh] overflow-hidden bg-cover bg-center brightness-[0.82] saturate-[0.82] md:min-h-[680px]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,5,5,0.36), rgba(5,5,5,0.04) 38%), linear-gradient(0deg, rgba(0,0,0,0.28), transparent 58%), url('https://images.unsplash.com/photo-1508256638959-56984bf03826?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
    </section>
  );
}
