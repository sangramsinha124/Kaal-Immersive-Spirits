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
    vessel: "rocks",
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
    vessel: "highball",
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
    vessel: "rocks",
  },
] as const;

type Cocktail = (typeof cocktails)[number];

function CocktailArtwork({
  cocktail,
}: {
  cocktail: Cocktail;
}) {
  const clipId = `glass-clip-${cocktail.number}`;
  const drinkId = `drink-gradient-${cocktail.number}`;
  const isHighball = cocktail.vessel === "highball";
  const isSilver = cocktail.accent === "silver";

  const glassPath = isHighball
    ? "M91 78 Q150 84 209 78 L195 300 Q194 315 180 315 H120 Q106 315 105 300 Z"
    : "M65 126 Q150 117 235 126 L218 280 Q216 301 195 301 H105 Q84 301 82 280 Z";

  const liquidPath = isHighball
    ? "M104 154 Q150 158 196 154 L187 296 Q186 304 177 304 H123 Q114 304 113 296 Z"
    : "M78 172 Q150 166 222 172 L211 278 Q209 291 193 291 H107 Q91 291 89 278 Z";

  return (
    <div className="relative mx-auto flex aspect-[0.82] w-full max-w-[330px] items-center justify-center md:max-w-[390px]">
      <div
        className={`absolute inset-[7%] rounded-full blur-[70px] ${
          isSilver ? "bg-emerald-200/[0.08]" : "bg-orange-400/[0.12]"
        }`}
        aria-hidden="true"
      />
      <div className="absolute inset-[5%] rounded-full border border-white/[0.07]" />
      <svg
        viewBox="0 0 300 390"
        role="img"
        aria-label={`${cocktail.name} cocktail in a ${isHighball ? "highball" : "rocks"} glass, garnished with ${cocktail.garnish}`}
        className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_24px_38px_rgba(0,0,0,0.4)]"
      >
        <defs>
          <linearGradient id={drinkId} x1="0" y1="1" x2="0.8" y2="0">
            <stop offset="0%" stopColor={isSilver ? "#73918b" : "#61270f"} />
            <stop offset="55%" stopColor={isSilver ? "#b9cbb5" : "#b6531d"} />
            <stop offset="100%" stopColor={isSilver ? "#e0e8c5" : "#e49a42"} />
          </linearGradient>
          <clipPath id={clipId}>
            <path d={glassPath} />
          </clipPath>
        </defs>

        <ellipse
          cx="150"
          cy="348"
          rx="94"
          ry="8"
          fill="#d6b276"
          fillOpacity="0.12"
        />

        <path
          d={liquidPath}
          fill={`url(#${drinkId})`}
          clipPath={`url(#${clipId})`}
          opacity="0.95"
        />
        <path
          d={isHighball
            ? "M105 169 Q150 174 195 169"
            : "M79 185 Q150 179 221 185"}
          fill="none"
          stroke="#ffe3b0"
          strokeOpacity="0.55"
          strokeWidth="2"
          clipPath={`url(#${clipId})`}
        />

        <g
          clipPath={`url(#${clipId})`}
          fill="#f6e9d6"
          fillOpacity="0.24"
          stroke="#fff6e8"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        >
          <path d="M111 197 151 188 163 229 121 238Z" />
          <path d="M160 215 193 208 202 244 168 251Z" />
          {isHighball && <path d="M128 252 160 246 167 282 134 288Z" />}
        </g>

        <path
          d={glassPath}
          fill="rgba(255,255,255,0.035)"
          stroke="rgba(243,231,210,0.58)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d={isHighball ? "M100 92 112 288" : "M78 142 92 273"}
          fill="none"
          stroke="#fff7e8"
          strokeOpacity="0.46"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d={isHighball ? "M202 98 190 277" : "M222 143 210 270"}
          fill="none"
          stroke="#f4c98e"
          strokeOpacity="0.24"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {isHighball ? (
          <g transform="translate(205 84) rotate(28)">
            <path
              d="M0 0 C20 3 25 32 8 49 C-1 37 -8 17 0 0Z"
              fill="#84966b"
              stroke="#d4d6a4"
              strokeWidth="1.5"
            />
            <path d="M1 5 8 43" stroke="#e5d99c" strokeWidth="1.5" />
          </g>
        ) : (
          <g transform="translate(202 110)">
            <circle r="24" fill="#c86b22" stroke="#f0bd70" strokeWidth="3" />
            <circle r="17" fill="#e7a74e" stroke="#ffe2a1" strokeWidth="2" />
            <path d="M0-16V16M-16 0H16M-11-11 11 11M11-11-11 11" stroke="#fff0bd" strokeOpacity=".78" strokeWidth="2" />
            <circle r="4" fill="#b65a1e" />
          </g>
        )}

        <path
          d={isHighball ? "M101 77 Q150 83 199 77" : "M67 125 Q150 115 233 125"}
          fill="none"
          stroke="#fff8eb"
          strokeOpacity="0.72"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M115 316 120 343 Q150 350 180 343 L185 316"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(243,231,210,0.4)"
          strokeWidth="2"
        />
        <path
          d="M88 349 Q150 340 212 349"
          fill="none"
          stroke="rgba(243,231,210,0.56)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
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
      <div
        ref={track}
        className="absolute left-0 top-0 flex h-full w-max"
      >
        <div className="relative flex h-full w-screen shrink-0 items-center px-7 sm:px-10 md:px-16 lg:px-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_51%,rgba(130,65,25,0.12),transparent_42%)]" />
          <div className="relative max-w-[720px]">
            <p className="mb-7 text-[9px] uppercase tracking-[0.5em] text-[#d9b77b]/55 md:mb-8 md:text-xs">
              The Spirit Takes Form
            </p>
            <h2 className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] tracking-[-0.055em]">
              Made to be
              <span className="block text-white/35">remembered.</span>
            </h2>
            <p className="mt-7 max-w-md text-xs leading-6 text-white/45 sm:mt-10 sm:text-sm sm:leading-7 md:text-base">
              KAAL was made to move beyond the bottle. Three expressions,
              shaped by rain, fire and the wild character of the Western Ghats.
            </p>
            <div className="mt-9 flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/35 sm:mt-12 sm:text-[10px]">
              <span className="h-px w-12 bg-[#c59d61]/50" />
              Scroll to discover
            </div>
          </div>
          <span className="absolute bottom-8 right-8 text-[9px] uppercase tracking-[0.35em] text-white/25 md:bottom-10 md:right-12">
            01 — 03
          </span>
        </div>

        {cocktails.map((cocktail) => (
          <article
            key={cocktail.name}
            className="cocktail-card relative flex h-full w-screen shrink-0 items-center overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24"
          >
            <div
              className={`pointer-events-none absolute inset-0 ${
                cocktail.accent === "silver"
                  ? "bg-[radial-gradient(ellipse_at_23%_50%,rgba(103,135,117,0.17),transparent_39%)]"
                  : cocktail.accent === "gold"
                    ? "bg-[radial-gradient(ellipse_at_23%_50%,rgba(183,121,43,0.16),transparent_39%)]"
                    : "bg-[radial-gradient(ellipse_at_23%_50%,rgba(172,77,29,0.17),transparent_39%)]"
              }`}
              aria-hidden="true"
            />
            <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[0.84fr_1.16fr] items-center gap-2 sm:gap-8 md:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <CocktailArtwork cocktail={cocktail} />

              <div className="relative z-10 min-w-0">
                <div className="mb-4 flex items-center gap-3 sm:mb-7 sm:gap-5">
                  <span className="text-[10px] tracking-[0.35em] text-[#d8b779]/65 sm:text-xs">
                    {cocktail.number}
                  </span>
                  <span className="h-px w-7 bg-[#d8b779]/35 sm:w-12" />
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white/45 sm:text-[10px] sm:tracking-[0.45em]">
                    {cocktail.mood}
                  </span>
                </div>

                <h3 className="text-[clamp(2.35rem,7.3vw,8rem)] font-light leading-[0.92] tracking-[-0.06em]">
                  {cocktail.name}
                </h3>

                <p className="mt-4 max-w-lg text-[11px] leading-[1.65] text-white/55 sm:mt-7 sm:text-sm sm:leading-7 md:text-base">
                  {cocktail.description}
                </p>

                <div className="mt-5 border-t border-white/10 pt-4 sm:mt-8 sm:pt-6">
                  <p className="mb-3 text-[8px] uppercase tracking-[0.3em] text-white/30 sm:text-[9px]">
                    In the glass
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-5">
                    {cocktail.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="text-[8px] uppercase tracking-[0.16em] text-white/55 sm:text-[9px] sm:tracking-[0.22em]"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-[8px] uppercase tracking-[0.25em] text-[#d8b779]/55 sm:mt-7 sm:text-[9px] sm:tracking-[0.35em]">
                  Garnished with {cocktail.garnish}
                </p>
              </div>
            </div>

            <span className="absolute bottom-7 right-7 text-[9px] uppercase tracking-[0.35em] text-white/25 sm:bottom-9 sm:right-10">
              {cocktail.number} / 03
            </span>
          </article>
        ))}

        <div className="relative flex h-full w-screen shrink-0 items-center justify-center overflow-hidden px-7">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(154,87,39,0.16),transparent_48%)]" />
          <div className="relative text-center">
            <p className="mb-6 text-[9px] uppercase tracking-[0.5em] text-[#d9b77b]/55 sm:mb-8 sm:text-[10px]">
              KAAL
            </p>
            <h3 className="text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.05em]">
              Pour the wild.
            </h3>
            <p className="mx-auto mt-5 max-w-md text-xs leading-6 text-white/45 sm:mt-8 sm:text-sm sm:leading-7">
              Best enjoyed slowly. Wherever the evening takes you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
