"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ============================================
      // 1. PAGE LOAD ANIMATION
      // ============================================

      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 1,
        })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
            duration: 1.4,
          },
          "-=0.5",
        )
        .from(
          ".hero-tagline",
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          "-=0.8",
        )
        .from(
          ".hero-button",
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          "-=0.6",
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 1,
          },
          "-=0.4",
        );

      // ============================================
      // 2. ATMOSPHERIC GLOW
      // ============================================

      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.7,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ============================================
      // 3. CENTER LINE
      // ============================================

      gsap.to(".hero-line", {
        scaleY: 1,
        transformOrigin: "top center",
        duration: 2,
        delay: 2,
        ease: "power2.inOut",
      });

      // ============================================
      // 4. SCROLL STORY
      // ============================================

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      scrollTimeline
        // KAAL gets smaller
        .to(
          ".hero-title",
          {
            scale: 0.45,
            y: -180,
            opacity: 0.25,
            letterSpacing: "0.25em",
            duration: 1,
          },
          0,
        )

        // Eyebrow disappears
        .to(
          ".hero-eyebrow",
          {
            y: -100,
            opacity: 0,
            duration: 1,
          },
          0,
        )

        // Tagline disappears
        .to(
          ".hero-tagline",
          {
            y: -80,
            opacity: 0,
            duration: 1,
          },
          0,
        )

        // Button moves away
        .to(
          ".hero-button",
          {
            y: 100,
            opacity: 0,
            duration: 1,
          },
          0,
        )

        // Scroll indicator disappears
        .to(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 0.5,
          },
          0,
        )

        // Glow expands and disappears
        .to(
          ".hero-glow",
          {
            scale: 2,
            opacity: 0,
            duration: 1,
          },
          0,
        );
    },
    {
      scope: container,
    },
  );

  const scrollToNext = () => {
    const nextSection = document.getElementById("story");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={container}
      className="hero-section relative flex min-h-[180vh] items-start justify-center overflow-hidden bg-black"
    >
      {/* ============================================
          FILM GRAIN
      ============================================ */}

      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.5'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ============================================
          ATMOSPHERIC GLOW
      ============================================ */}

      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
        }}
      />

      {/* ============================================
          CENTER LINE
      ============================================ */}

      <div className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full -translate-x-1/2 md:block">
        <div className="hero-line h-full w-px scale-y-0 bg-white/10" />
      </div>

      {/* ============================================
          MAIN CONTENT
      ============================================ */}

      <div className="hero-content sticky top-0 z-10 flex h-screen items-center justify-center px-6 text-center">
        <div>
          {/* Eyebrow */}

          <p className="hero-eyebrow mb-8 text-xs uppercase tracking-[0.65em] text-white/50 md:text-sm">
            Spirits of the Monsoon
          </p>

          {/* Title */}

          <h1 className="hero-title text-[clamp(5rem,15vw,13rem)] font-semibold leading-[0.8] tracking-[0.08em] text-white">
            KAAL
          </h1>

          {/* Tagline */}

          <p className="hero-tagline mt-10 text-base text-white/60 md:text-xl">
            Born from rain. Distilled in fire.
          </p>

          {/* CTA */}

          <button
            onClick={scrollToNext}
            className="hero-button group relative mt-12 overflow-hidden rounded-full border border-white/20 px-10 py-5 text-xs uppercase tracking-[0.35em] text-white transition-all duration-500 hover:border-white/60"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Enter the experience
            </span>

            <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 group-hover:scale-y-100" />
          </button>
        </div>
      </div>

      {/* ============================================
          SCROLL INDICATOR
      ============================================ */}

      <button
        onClick={scrollToNext}
        className="hero-scroll absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/40 transition-colors hover:text-white"
        aria-label="Scroll to explore"
      >
        <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>

        <span className="h-10 w-px overflow-hidden bg-white/10">
          <span className="block h-1/2 w-full origin-top animate-pulse bg-white/70" />
        </span>
      </button>
    </section>
  );
}
