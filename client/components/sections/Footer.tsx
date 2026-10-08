"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footer = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = footer.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const content = section.querySelector(".footer-content");
      const line = section.querySelector(".footer-line");
      const bottom = section.querySelector(".footer-bottom");

      gsap.set([content, line, bottom], {
        opacity: 0,
        y: 20,
      });

      gsap.to([content, line, bottom], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footer}
      className="relative overflow-hidden bg-[#050505] px-6 pb-8 pt-20 text-white md:pb-10 md:pt-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* TOP LINE */}

        <div className="footer-line mb-12 h-px w-full bg-white/10 md:mb-16" />

        {/* MAIN FOOTER */}

        <div className="footer-content flex flex-col justify-between gap-12 md:flex-row md:items-end">
          {/* BRAND */}

          <div>
            <p className="text-4xl font-light tracking-[0.18em] md:text-5xl">
              KAAL
            </p>

            <p className="mt-4 text-[9px] uppercase tracking-[0.45em] text-white/35 md:text-[10px]">
              Spirits of the Monsoon
            </p>

            <p className="mt-8 max-w-xs text-sm leading-6 text-white/30">
              Wild botanicals. Monsoon air. A spirit shaped by the landscape
              that surrounds it.
            </p>
          </div>

          {/* BRAND MARK */}

          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 md:h-28 md:w-28">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.06] md:h-20 md:w-20">
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                KAAL
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="footer-bottom mt-16 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 md:mt-24 md:flex-row md:items-center">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/25">
            The wild, distilled.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
              Maharashtra
            </span>

            <span className="h-3 w-px bg-white/10" />

            <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">
              © 2026 KAAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
