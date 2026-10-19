"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    number: "01",
    name: "Black Pepper",
    notes: "Bold · Warm",
    image:
      "https://images.unsplash.com/photo-1506085621370-98b475435879?auto=format&fit=crop&w=900&q=80",
    position: "center",
  },
  {
    number: "02",
    name: "Cardamom",
    notes: "Aromatic · Bright",
    image:
      "https://images.unsplash.com/photo-1758657996330-095d08451cd9?auto=format&fit=crop&w=900&q=80",
    position: "center",
  },
  {
    number: "03",
    name: "Tulsi",
    notes: "Sacred · Herbal",
    image:
      "https://images.unsplash.com/photo-1664289283342-7dfd936b4b99?auto=format&fit=crop&w=900&q=80",
    position: "center 58%",
  },
  {
    number: "04",
    name: "Ginger",
    notes: "Zesty · Grounding",
    image:
      "https://images.unsplash.com/photo-1635843104103-ddd88e1c5141?auto=format&fit=crop&w=900&q=80",
    position: "center",
  },
];

export default function Ingredients() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = container.current;

      if (!section) return;

      const eyebrow = section.querySelector(".botanical-eyebrow");
      const heading = section.querySelector(".botanical-heading");
      const items = gsap.utils.toArray<HTMLElement>(".botanical-item");

      gsap.from([eyebrow, heading], {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(items, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 62%",
          once: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="ingredients"
      className="relative overflow-hidden bg-[#070707] px-6 py-24 text-white sm:px-10 md:py-32"
      aria-labelledby="botanical-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <p className="botanical-eyebrow text-[10px] uppercase tracking-[0.5em] text-white/35">
            The Botanicals
          </p>
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/30">
            03 / 07
          </p>
        </div>

        <div className="mt-9 flex flex-col justify-between gap-6 border-b border-white/10 pb-9 md:mt-12 md:flex-row md:items-end md:pb-12">
          <h2
            id="botanical-heading"
            className="botanical-heading max-w-3xl text-4xl font-light leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl"
          >
            Nature&apos;s finest.
            <span className="block text-white/35">Thoughtfully chosen.</span>
          </h2>
          <p className="max-w-xs text-xs leading-6 text-white/35 md:pb-1 md:text-sm">
            Four botanicals, gathered for their character and the depth they
            bring to every drop.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:mt-10 md:grid-cols-4 md:gap-x-8">
          {ingredients.map((ingredient) => (
            <article key={ingredient.name} className="botanical-item group">
              <div className="relative aspect-[0.92] overflow-hidden bg-[#10110f] sm:aspect-[1.05]">
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{
                    backgroundImage: `url('${ingredient.image}')`,
                    backgroundPosition: ingredient.position,
                  }}
                  role="img"
                  aria-label={ingredient.name}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-50"
                  aria-hidden="true"
                />
                <span className="absolute left-3 top-3 text-[9px] tracking-[0.25em] text-white/70 sm:left-4 sm:top-4">
                  {ingredient.number}
                </span>
              </div>

              <div className="mt-4 flex items-start justify-between gap-2 sm:mt-5">
                <h3 className="text-lg font-light tracking-[-0.025em] sm:text-xl md:text-2xl">
                  {ingredient.name}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 text-sm text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/70"
                >
                  ↗
                </span>
              </div>
              <p className="mt-2 text-[8px] uppercase tracking-[0.22em] text-white/35 sm:text-[9px] sm:tracking-[0.28em]">
                {ingredient.notes}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-[9px] uppercase tracking-[0.35em] text-white/25">
          <span>Four botanicals</span>
          <span>Selected for the spirit</span>
        </div>
      </div>
    </section>
  );
}
