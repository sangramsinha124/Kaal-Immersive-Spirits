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
      const section = container.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const copy = section.querySelectorAll(".manifesto-reveal");
      const image = section.querySelector(".manifesto-image");
      const imageFrame = section.querySelector(".manifesto-image-frame");

      gsap.from(copy, {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(image, {
        opacity: 0,
        scale: 1.04,
        duration: 1.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(imageFrame, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.3,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      id="manifesto"
      ref={container}
      className="relative isolate overflow-hidden bg-[#070706] text-white"
      aria-labelledby="manifesto-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[35rem] w-[35rem] rounded-full bg-[#6f3515]/[0.09] blur-[130px]"
      />

      <div className="relative mx-auto grid min-h-[min(860px,100svh)] max-w-[1600px] md:grid-cols-[0.94fr_1.06fr]">
        <div className="relative z-10 flex min-h-[690px] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 md:min-h-[760px] md:px-[clamp(3rem,7vw,7.5rem)] md:py-12">
          <div className="manifesto-reveal flex items-center justify-between gap-5">
            <p className="text-[9px] uppercase tracking-[0.48em] text-white/45 sm:text-[10px]">
              The Manifesto
            </p>
            <p className="text-[9px] uppercase tracking-[0.32em] text-white/35">
              02 / 07
            </p>
          </div>

          <div className="py-16 md:py-12">
            <p className="manifesto-reveal mb-6 text-[9px] uppercase tracking-[0.38em] text-[#d8b77c]/65 sm:mb-8">
              Born where rain meets earth
            </p>
            <h2
              id="manifesto-heading"
              className="max-w-2xl text-[clamp(3.4rem,7.8vw,7.5rem)] font-light leading-[0.88] tracking-[-0.065em]"
            >
              <span className="manifesto-reveal block">More than</span>
              <span className="manifesto-reveal block">a spirit.</span>
              <span className="manifesto-reveal block text-white/35">
                A feeling.
              </span>
            </h2>

            <p className="manifesto-reveal mt-7 max-w-md text-xs leading-6 text-white/55 sm:mt-9 sm:text-sm sm:leading-7 md:text-base">
              KAAL is born from the raw poetry of the monsoon — where rain meets
              earth, where nature and tradition unite, and where every drop
              carries a story.
            </p>

            <div className="manifesto-reveal mt-8 flex items-center gap-4 sm:mt-10">
              <span className="h-px w-10 bg-[#c7a264]/70" />
              <span className="text-[8px] uppercase tracking-[0.36em] text-white/45 sm:text-[9px]">
                Rooted in the monsoon
              </span>
            </div>
          </div>

          <span className="manifesto-reveal text-[8px] uppercase tracking-[0.35em] text-white/35 sm:text-[9px]">
            KAAL · India
          </span>
        </div>

        <div className="manifesto-image-frame relative min-h-[390px] overflow-hidden border-y border-white/10 md:min-h-[760px] md:border-y-0 md:border-l md:border-white/10">
          <div
            className="manifesto-image absolute inset-0 bg-cover bg-[center_55%] brightness-[0.76] saturate-[0.78] transition-transform duration-[1600ms] ease-out hover:scale-[1.025]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508256638959-56984bf03826?auto=format&fit=crop&w=1800&q=80')",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,6,0.2)_0%,rgba(7,7,6,0.02)_38%,rgba(7,7,6,0.68)_100%),linear-gradient(90deg,rgba(7,7,6,0.25),transparent_38%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,transparent_15%,rgba(0,0,0,0.34)_100%)]"
            aria-hidden="true"
          />

          <div className="absolute inset-5 border border-white/15 sm:inset-7 md:inset-9">
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
              <p className="max-w-[15rem] font-serif text-2xl leading-[0.95] tracking-[-0.035em] text-white/90 sm:text-4xl">
                The land gives
                <span className="block text-white/55">
                  the spirit its soul.
                </span>
              </p>
              <span className="shrink-0 text-[8px] uppercase tracking-[0.3em] text-white/55">
                Monsoon / 01
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
