"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cocktails = [
  {
    number: "01",
    mood: "MONSOON",
    name: "Negroni",
    description:
      "KAAL meets bitter orange and wild botanicals in a drink built for slow evenings and heavy skies.",
    ingredients: ["KAAL", "Bitter Orange", "Sweet Vermouth", "Wild Botanicals"],
    garnish: "Orange Peel",
    accent: "amber",
  },
  {
    number: "02",
    mood: "RAINFALL",
    name: "Highball",
    description:
      "Bright citrus, mountain herbs and a long, cold finish. Light enough for the first rain.",
    ingredients: ["KAAL", "Tonic", "Fresh Citrus", "Mountain Herbs"],
    garnish: "Citrus Twist",
    accent: "silver",
  },
  {
    number: "03",
    mood: "EMBER",
    name: "Old Fashioned",
    description:
      "Deep, warm and deliberate. KAAL, jaggery and aromatic bitters finished with a whisper of smoke.",
    ingredients: ["KAAL", "Jaggery", "Aromatic Bitters", "Smoke"],
    garnish: "Orange & Clove",
    accent: "gold",
  },
];

function CocktailGlass({ accent }: { accent: "amber" | "silver" | "gold" }) {
  return (
    <div className="relative flex h-[430px] w-[300px] items-center justify-center md:h-[520px] md:w-[360px]">
      {/* Ambient halo */}
      <div
        className={`absolute h-[260px] w-[260px] rounded-full blur-3xl ${
          accent === "amber"
            ? "bg-orange-400/10"
            : accent === "gold"
              ? "bg-amber-300/10"
              : "bg-white/10"
        }`}
      />

      {/* Ritual circle */}
      <div className="absolute h-[300px] w-[300px] rounded-full border border-white/10 md:h-[360px] md:w-[360px]" />

      <div className="relative flex h-[330px] w-[210px] flex-col items-center md:h-[390px] md:w-[250px]">
        {/* Glass rim */}
        <div className="absolute top-[58px] z-20 h-[8px] w-[190px] rounded-[50%] border border-white/30 bg-white/[0.03] shadow-[0_0_30px_rgba(255,255,255,0.06)] md:w-[220px]" />

        {/* Glass bowl */}
        <div className="absolute top-[60px] h-[205px] w-[190px] overflow-hidden rounded-b-[90px] rounded-t-[12px] border-x border-b border-white/20 bg-white/[0.025] backdrop-blur-[2px] md:h-[245px] md:w-[220px]">
          {/* Drink */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-[68%] ${
              accent === "amber"
                ? "bg-gradient-to-t from-[#6b260d]/80 via-[#a64d18]/55 to-[#d98235]/25"
                : accent === "gold"
                  ? "bg-gradient-to-t from-[#5b3512]/90 via-[#9b681e]/55 to-[#d2a34b]/20"
                  : "bg-gradient-to-t from-[#bac5c2]/25 via-[#d9e4df]/10 to-transparent"
            }`}
          />

          {/* Ice */}
          <div className="absolute bottom-[55px] left-[42px] h-[48px] w-[42px] rotate-12 border border-white/20 bg-white/10 backdrop-blur-sm" />
          <div className="absolute bottom-[80px] right-[35px] h-[42px] w-[38px] -rotate-12 border border-white/15 bg-white/[0.08]" />
          <div className="absolute bottom-[32px] right-[72px] h-[38px] w-[35px] rotate-6 border border-white/15 bg-white/[0.07]" />

          {/* Liquid reflection */}
          <div className="absolute bottom-[18px] left-[15%] right-[15%] h-px bg-white/20 blur-[1px]" />
        </div>

        {/* Stem */}
        <div className="absolute top-[260px] h-[115px] w-px bg-gradient-to-b from-white/25 to-white/10 md:top-[305px] md:h-[120px]" />

        {/* Base */}
        <div className="absolute bottom-[5px] h-px w-[130px] bg-white/20 md:w-[150px]" />

        {/* Garnish */}
        <div
          className={`absolute right-[25px] top-[30px] z-30 h-[45px] w-[12px] rotate-[35deg] rounded-full ${
            accent === "silver" ? "bg-lime-300/50" : "bg-orange-300/60"
          } blur-[1px]`}
        />
      </div>
    </div>
  );
}

export default function Cocktails() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = container.current;
    const horizontalTrack = track.current;

    if (!section || !horizontalTrack) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        Math.max(0, horizontalTrack.scrollWidth - window.innerWidth);

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(horizontalTrack, {
        x: () => -getScrollAmount(),
        duration: 1,
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      id="cocktails"
      className="relative h-screen overflow-hidden bg-[#080807] text-white"
    >
      <div ref={track} className="absolute left-0 top-0 flex h-full w-max">
        {/* INTRO */}
        <div className="flex h-full w-screen shrink-0 items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-[720px]">
            <p className="mb-8 text-[10px] uppercase tracking-[0.5em] text-white/35 md:text-xs">
              The Spirit Takes Form
            </p>

            <h2 className="text-5xl leading-[0.9] tracking-[-0.04em] md:text-7xl lg:text-[9rem]">
              Made to be
              <span className="block text-white/35">remembered.</span>
            </h2>

            <p className="mt-10 max-w-md text-sm leading-7 text-white/45 md:text-base">
              KAAL was made to move beyond the bottle. Three expressions, shaped
              by rain, fire and the wild character of the Western Ghats.
            </p>

            <div className="mt-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-white/30">
              <span className="h-px w-12 bg-white/20" />
              Scroll to discover
            </div>
          </div>
        </div>

        {/* COCKTAILS */}
        {cocktails.map((cocktail) => (
          <article
            key={cocktail.name}
            className="cocktail-card flex h-full w-screen shrink-0 items-center px-8 md:px-16 lg:px-24"
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.9fr_1.1fr]">
              {/* Visual */}
              <div className="flex justify-center md:justify-start">
                <CocktailGlass
                  accent={cocktail.accent as "amber" | "silver" | "gold"}
                />
              </div>

              {/* Details */}
              <div className="max-w-xl">
                <div className="mb-8 flex items-center gap-5">
                  <span className="text-xs tracking-[0.4em] text-white/25">
                    {cocktail.number}
                  </span>

                  <span className="h-px w-12 bg-white/15" />

                  <span className="text-[10px] uppercase tracking-[0.45em] text-white/40">
                    {cocktail.mood}
                  </span>
                </div>

                <h3 className="text-6xl font-light tracking-[-0.04em] md:text-8xl lg:text-[8rem]">
                  {cocktail.name}
                </h3>

                <p className="mt-8 max-w-lg text-sm leading-7 text-white/45 md:text-base">
                  {cocktail.description}
                </p>

                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
                  {cocktail.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="text-[10px] uppercase tracking-[0.25em] text-white/40"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>

                <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/25">
                  Garnished with {cocktail.garnish}
                </p>
              </div>
            </div>
          </article>
        ))}

        {/* END PANEL */}
        <div className="flex h-full w-screen shrink-0 items-center justify-center px-8">
          <div className="text-center">
            <p className="mb-8 text-[10px] uppercase tracking-[0.5em] text-white/30">
              KAAL
            </p>

            <h3 className="text-5xl tracking-[-0.03em] md:text-7xl lg:text-8xl">
              Pour the wild.
            </h3>

            <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-white/35">
              Best enjoyed slowly. Wherever the evening takes you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
