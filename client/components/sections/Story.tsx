"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = container.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const reveals = section.querySelectorAll(".story-reveal");
      const image = section.querySelector(".story-image");
      const imageFrame = section.querySelector(".story-image-frame");

      gsap.from(reveals, {
        opacity: 0,
        y: 26,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(image, {
        opacity: 0,
        scale: 1.055,
        duration: 1.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(imageFrame, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      id="story"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#080807] px-5 py-8 text-white sm:px-8 sm:py-10 md:px-10 md:py-8"
      aria-labelledby="story-heading"
    >
      <div className="relative mx-auto max-w-[1600px]">
        <div className="story-reveal mb-3 flex items-center justify-between border-t border-white/10 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.45em] text-white/45 sm:text-[10px]">
            The Story
          </p>
          <p className="text-[9px] uppercase tracking-[0.32em] text-white/35">
            07 / 07
          </p>
        </div>

        <div className="story-image-frame relative isolate h-[min(68svh,620px)] min-h-[440px] overflow-hidden border border-white/20 md:aspect-auto md:h-[min(64svh,560px)] md:min-h-[400px]">
          <div
            className="story-image absolute inset-0 z-0 scale-[1.02] bg-cover bg-[center_55%] brightness-[0.75] saturate-[0.85] transition-transform duration-[1600ms] ease-out hover:scale-[1.06]"
            style={{
              backgroundImage: "url('/images/western-ghats-waterfall.jpg')",
            }}
            role="img"
            aria-label="Waterfalls in the Kumaraparvatha mountain range of the Western Ghats"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(3,5,5,0.9)_0%,rgba(3,5,5,0.72)_34%,rgba(3,5,5,0.22)_66%,rgba(3,5,5,0.05)_100%),linear-gradient(0deg,rgba(3,5,5,0.56),transparent_48%),linear-gradient(180deg,rgba(3,5,5,0.16),transparent_38%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_75%_45%,transparent_15%,rgba(0,0,0,0.25)_100%)]"
          />

          <div className="absolute inset-3 z-20 border border-white/20 sm:inset-5 md:inset-6">
            <div className="flex h-full flex-col justify-between p-5 sm:p-8 md:max-w-[47%] md:p-10">
              <div>
                <p className="story-reveal mb-6 text-[8px] uppercase tracking-[0.42em] text-[#e0c28d] sm:mb-8 sm:text-[9px]">
                  Our story
                </p>
                <h2
                  id="story-heading"
                  className="max-w-[34rem] font-serif text-[clamp(2.65rem,4.3vw,4.6rem)] leading-[0.91] tracking-[-0.045em] text-white"
                >
                  <span className="story-reveal block">Rooted in</span>
                  <span className="story-reveal block">Maharashtra.</span>
                  <span className="story-reveal block text-white/75">
                    Inspired by nature.
                  </span>
                </h2>
                <p className="story-reveal mt-6 max-w-sm text-xs leading-6 text-white/75 sm:mt-7 sm:text-sm sm:leading-7">
                  KAAL is a tribute to the land, the people and the monsoon
                  that shapes us. It&apos;s not just a spirit — it&apos;s a
                  season, a landscape, a feeling.
                </p>
              </div>

              <div className="story-reveal mt-10 flex items-center gap-4">
                <span className="text-[8px] uppercase tracking-[0.36em] text-white/65">
                  07 / 07
                </span>
                <span className="h-px w-8 bg-[#d8b77c]" />
              </div>
            </div>
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2 sm:right-6 sm:top-6 sm:gap-3">
              <span className="h-px w-6 bg-[#d8b77c]" />
              <span className="text-[7px] uppercase tracking-[0.25em] text-white/70 sm:text-[8px] sm:tracking-[0.35em]">
                Western Ghats · India
              </span>
            </div>
            <a
              href="https://commons.wikimedia.org/wiki/File:Western_ghats_waterfall.jpg"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 z-20 block w-[min(55%,20rem)] whitespace-normal text-right text-[6px] uppercase leading-3 tracking-[0.12em] text-white/70 underline decoration-white/35 underline-offset-2 transition-colors hover:text-white sm:bottom-6 sm:right-6 sm:text-[8px] sm:leading-4 sm:tracking-[0.2em]"
              aria-label="Photo by Samson Joseph, licensed under Creative Commons Attribution-ShareAlike 4.0"
            >
              Photo: Samson Joseph · CC BY-SA 4.0
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
