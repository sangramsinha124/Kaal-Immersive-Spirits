"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = container.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".story-eyebrow");
      const heading = section.querySelector(".story-heading");
      const copy = section.querySelector(".story-copy");
      const divider = section.querySelector(".story-divider");
      const statement = section.querySelector(".story-statement");
      const mark = section.querySelector(".story-mark");

      gsap.set([eyebrow, heading, copy, divider, statement, mark], {
        opacity: 0,
        y: 40,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 15%",
          scrub: 1,
        },
      });

      timeline
        .to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.35,
        })
        .to(
          heading,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.15",
        )
        .to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.25",
        )
        .to(
          divider,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.15",
        )
        .to(
          statement,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.15",
        )
        .to(
          mark,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.2",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      id="story"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#050505] px-6 py-32 text-white md:py-44"
    >
      {/* BACKGROUND RINGS */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025] md:h-[760px] md:w-[760px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025] md:h-[520px] md:w-[520px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* EYEBROW */}

        <p className="story-eyebrow mb-10 text-[10px] uppercase tracking-[0.5em] text-white/30 md:mb-14 md:text-xs">
          KAAL
        </p>

        {/* MAIN HEADING */}

        <h2 className="story-heading max-w-6xl text-5xl font-light leading-[0.9] tracking-[-0.045em] md:text-7xl lg:text-[8rem]">
          Born from the
          <span className="block text-white/30">monsoon.</span>
        </h2>

        {/* STORY COPY */}

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_1fr] md:gap-24">
          <p className="story-copy max-w-md text-sm leading-7 text-white/45 md:text-base md:leading-8">
            When the first rain reaches the Western Ghats, the landscape
            changes. Earth becomes fragrant. Forests awaken. The air carries the
            character of everything around it.
          </p>

          <p className="story-copy max-w-md text-sm leading-7 text-white/35 md:text-base md:leading-8">
            KAAL captures that moment in spirit — a meeting of wild botanicals,
            warmth and rain, distilled into something made to be savoured
            slowly.
          </p>
        </div>

        {/* DIVIDER */}

        <div className="story-divider mt-20 h-px w-full bg-white/10 md:mt-28" />

        {/* FINAL STATEMENT */}

        <div className="mt-16 flex flex-col justify-between gap-12 md:mt-20 md:flex-row md:items-end">
          <div>
            <p className="story-statement max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.035em] md:text-6xl lg:text-7xl">
              Not made for
              <span className="text-white/30"> the ordinary.</span>
            </p>
          </div>

          <div className="story-mark flex shrink-0 items-center gap-4">
            <span className="h-px w-10 bg-white/20" />

            <span className="text-[9px] uppercase tracking-[0.4em] text-white/25">
              Spirits of the Monsoon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
