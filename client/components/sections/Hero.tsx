"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const titleLetters = container.current?.querySelectorAll(
        ".hero-title-char",
      );
      const clouds = container.current?.querySelectorAll(".hero-cloud-bank");

      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline
        .from(titleLetters ?? [], {
          opacity: 0,
          yPercent: 110,
          rotateX: -75,
          filter: "blur(12px)",
          stagger: 0.12,
          duration: 1.45,
          ease: "power4.out",
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

      if (clouds?.[0]) {
        gsap.to(clouds[0], {
          xPercent: 4,
          yPercent: -2,
          scale: 1.08,
          duration: 30,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (clouds?.[1]) {
        gsap.to(clouds[1], {
          xPercent: -5,
          yPercent: 2,
          scale: 1.06,
          duration: 38,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      gsap.to(".hero-moonlight", {
        opacity: 0.85,
        scale: 1.12,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
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
        className="hero-moonlight pointer-events-none absolute -top-[18%] left-1/2 z-[1] h-[min(92vw,900px)] w-[min(92vw,900px)] -translate-x-1/2 rounded-full opacity-65 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, rgba(202,220,255,0.3) 0%, rgba(153,184,230,0.13) 23%, rgba(110,145,197,0.06) 43%, transparent 68%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-[8%] left-1/2 z-[1] h-[78%] w-[min(100vw,1200px)] -translate-x-1/2 opacity-50 blur-2xl"
        style={{
          background:
            "conic-gradient(from 165deg at 50% 0%, transparent 0deg, rgba(196,216,255,0.08) 18deg, transparent 35deg, rgba(196,216,255,0.055) 48deg, transparent 68deg)",
        }}
        aria-hidden="true"
      />
      <div
        className="hero-cloud-bank pointer-events-none absolute -left-[12%] top-[6%] z-[2] h-[68%] w-[124%] opacity-35 blur-2xl mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 18% 48%, rgba(191,204,221,0.36) 0%, transparent 36%), radial-gradient(ellipse at 40% 28%, rgba(211,221,236,0.28) 0%, transparent 33%), radial-gradient(ellipse at 66% 44%, rgba(181,198,221,0.3) 0%, transparent 38%), radial-gradient(ellipse at 88% 26%, rgba(205,216,233,0.25) 0%, transparent 32%)",
        }}
        aria-hidden="true"
      />
      <div
        className="hero-cloud-bank pointer-events-none absolute -bottom-[12%] -left-[10%] z-[2] h-[58%] w-[120%] opacity-40 blur-3xl mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 14% 62%, rgba(182,197,215,0.34) 0%, transparent 34%), radial-gradient(ellipse at 38% 72%, rgba(204,215,231,0.23) 0%, transparent 38%), radial-gradient(ellipse at 68% 58%, rgba(174,193,218,0.3) 0%, transparent 38%), radial-gradient(ellipse at 92% 72%, rgba(205,216,230,0.27) 0%, transparent 34%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.2)_62%,rgba(0,0,0,0.62)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.24)_100%)]"
        aria-hidden="true"
      />

      <div className="hero-content relative z-[5] flex min-h-svh w-full items-center justify-center px-6 pb-8 pt-20 text-center">
        <div className="-mt-4">
          <h1
            className="hero-title font-serif text-[clamp(5rem,17vw,14rem)] font-normal leading-[0.78] tracking-[0.035em] text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
            style={{ perspective: "1000px" }}
          >
            <span className="sr-only">KAAL</span>
            {"KAAL".split("").map((letter, index) => (
              <span
                className="hero-title-char inline-block"
                aria-hidden="true"
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
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
