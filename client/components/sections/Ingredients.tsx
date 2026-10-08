"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ingredients = [
  {
    number: "01",
    name: "Juniper",
    notes: "Resinous · Dry · Evergreen",
  },
  {
    number: "02",
    name: "Cardamom",
    notes: "Warm · Aromatic · Spiced",
  },
  {
    number: "03",
    name: "Orange Peel",
    notes: "Bright · Bitter · Citrus",
  },
  {
    number: "04",
    name: "Ginger",
    notes: "Sharp · Warm · Earthy",
  },
  {
    number: "05",
    name: "Coriander",
    notes: "Green · Floral · Peppery",
  },
];

export default function Ingredients() {
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = container.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".botanical-eyebrow");
      const heading = section.querySelector(".botanical-heading");
      const items = gsap.utils.toArray<HTMLElement>(".botanical-item");

      gsap.set([eyebrow, heading, items], {
        opacity: 0,
        y: 35,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 25%",
          scrub: 1,
        },
      });

      timeline
        .to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.4,
        })
        .to(
          heading,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.2",
        )
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.35",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      id="ingredients"
      className="relative overflow-hidden bg-[#070707] px-6 py-32 text-white md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="max-w-5xl">
          <p className="botanical-eyebrow mb-8 text-[10px] uppercase tracking-[0.5em] text-white/35 md:text-xs">
            The Botanicals
          </p>

          <h2 className="botanical-heading text-5xl font-light leading-[0.92] tracking-[-0.04em] md:text-7xl lg:text-[8rem]">
            Gathered from
            <span className="block text-white/30">the wild.</span>
          </h2>
        </div>

        {/* BOTANICAL LIST */}
        <div className="mt-24 border-t border-white/10 md:mt-32">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="botanical-item group border-b border-white/10"
            >
              <div className="flex min-h-[120px] items-center gap-5 py-7 md:min-h-[150px] md:gap-10 md:py-8">
                {/* NUMBER */}
                <span className="w-8 shrink-0 text-[10px] tracking-[0.3em] text-white/25 md:w-12 md:text-xs">
                  {ingredient.number}
                </span>

                {/* LINE */}
                <span className="hidden h-px w-12 shrink-0 bg-white/15 transition-all duration-500 group-hover:w-20 group-hover:bg-white/40 md:block" />

                {/* NAME */}
                <h3 className="min-w-0 flex-1 text-3xl font-light tracking-[-0.025em] transition-transform duration-500 group-hover:translate-x-2 md:text-5xl lg:text-6xl">
                  {ingredient.name}
                </h3>

                {/* NOTES */}
                <p className="hidden text-right text-[10px] uppercase tracking-[0.25em] text-white/30 md:block md:w-[260px] lg:w-[320px]">
                  {ingredient.notes}
                </p>

                {/* ARROW */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/25 transition-all duration-500 group-hover:border-white/30 group-hover:text-white/70">
                  <span className="text-sm transition-transform duration-500 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>

              {/* MOBILE NOTES */}
              <div className="pb-7 pl-[52px] md:hidden">
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                  {ingredient.notes}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTNOTE */}
        <div className="mt-10 flex items-center justify-between text-[9px] uppercase tracking-[0.35em] text-white/25">
          <span>Five botanicals</span>

          <span className="hidden md:block">Selected for the spirit</span>
        </div>
      </div>

      {/* SUBTLE BACKGROUND DETAIL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full border border-white/[0.025]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-[38%] h-[340px] w-[340px] rounded-full border border-white/[0.02]"
      />
    </section>
  );
}
