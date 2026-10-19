"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline
        .from(".hero-title", {
          opacity: 0,
          y: 36,
          duration: 1.2,
        })
        .from(
          ".hero-tagline",
          {
            opacity: 0,
            y: 14,
            duration: 0.8,
          },
          "-=0.55",
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 8,
            duration: 0.7,
          },
          "-=0.35",
        );
    },
    {
      scope: container,
    },
  );

  return (
    <section
      ref={container}
      className="hero-section relative flex min-h-svh items-center justify-center overflow-hidden bg-black"
      aria-label="KAAL — The Spirit of the Monsoon"
    >
      <div
        className="absolute inset-0 bg-cover bg-[center_52%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469106233956-20341cc41f8b?auto=format&fit=crop&w=2400&q=85')",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.2)_62%,rgba(0,0,0,0.62)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.24)_100%)]"
        aria-hidden="true"
      />

      <div className="hero-content relative z-10 flex min-h-svh w-full items-center justify-center px-6 pb-8 pt-20 text-center">
        <div className="-mt-4">
          <h1 className="hero-title font-serif text-[clamp(5rem,17vw,14rem)] font-normal leading-[0.78] tracking-[0.035em] text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
            KAAL
          </h1>
          <p className="hero-tagline mt-7 text-[9px] font-medium uppercase tracking-[0.42em] text-white/85 sm:mt-9 sm:text-[10px] sm:tracking-[0.55em]">
            The Spirit of the Monsoon
          </p>
        </div>
      </div>

      <div className="hero-meta absolute inset-x-6 bottom-7 z-10 flex items-center justify-between text-[8px] uppercase tracking-[0.28em] text-white/65 sm:inset-x-10 sm:bottom-9 sm:text-[9px] sm:tracking-[0.35em]">
        <span>Spirit of the Monsoon</span>
        <span>01 / 07</span>
      </div>
    </section>
  );
}
