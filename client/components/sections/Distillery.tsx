"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Distillery() {
  const container = useRef<HTMLElement>(null);
  const stickyContent = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current || !stickyContent.current) return;

      // ============================================
      // MAIN DISTILLERY TIMELINE
      // ============================================

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stickyContent.current,
          anticipatePin: 1,
        },
      });

      // ============================================
      // STAGE 1 — TITLE
      // ============================================

      timeline.to(
        ".distillery-title",
        {
          scale: 0.65,
          y: -120,
          opacity: 0.2,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      // ============================================
      // STAGE 2 — FIRE
      // ============================================

      timeline.fromTo(
        ".fire-orb",
        {
          scale: 0.2,
          opacity: 0,
        },
        {
          scale: 2.5,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0,
      );

      // Fire pulses
      timeline.to(
        ".fire-orb",
        {
          scale: 1.5,
          opacity: 0.6,
          duration: 0.7,
          ease: "sine.inOut",
        },
        1,
      );

      // ============================================
      // STAGE 3 — FIRE FADES
      // ============================================

      timeline.to(
        ".fire-orb",
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        1.7,
      );

      // ============================================
      // STAGE 4 — VAPOR RISES
      // ============================================

      timeline.fromTo(
        ".vapor",
        {
          y: 100,
          scale: 0.5,
          opacity: 0,
        },
        {
          y: -220,
          scale: 1.8,
          opacity: 0.8,
          duration: 1.3,
          ease: "power2.out",
        },
        2.1,
      );

      // ============================================
      // STAGE 5 — WATER APPEARS
      // ============================================

      timeline.fromTo(
        ".water-orb",
        {
          scale: 0.2,
          opacity: 0,
        },
        {
          scale: 2,
          opacity: 0.7,
          duration: 1.2,
          ease: "power2.out",
        },
        2.7,
      );

      // ============================================
      // STAGE 6 — WATER MOVES
      // ============================================

      timeline.to(
        ".water-orb",
        {
          x: 250,
          y: 100,
          scale: 2.5,
          opacity: 0.35,
          duration: 1,
          ease: "sine.inOut",
        },
        3.9,
      );

      // ============================================
      // STAGE 7 — FINAL MESSAGE
      // ============================================

      timeline.to(
        ".distillery-copy",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        4,
      );

      // ============================================
      // FINAL FADE
      // ============================================

      timeline.to(
        ".distillery-title",
        {
          opacity: 0.05,
          duration: 0.8,
        },
        4.8,
      );
    },
    {
      scope: container,
    },
  );

  return (
    <section
      ref={container}
      className="relative h-[500vh] overflow-hidden bg-white text-black"
    >
      <div
        ref={stickyContent}
        className="distillery-sticky relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* ============================================
            ATMOSPHERIC BACKGROUND
        ============================================ */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.02] blur-[100px]" />
        </div>

        {/* ============================================
            FIRE
        ============================================ */}

        <div
          className="fire-orb pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[70px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,80,20,0.9), rgba(255,150,30,0.4), transparent 70%)",
          }}
        />

        {/* ============================================
            WATER
        ============================================ */}

        <div
          className="water-orb pointer-events-none absolute left-[15%] top-[25%] h-72 w-72 rounded-full opacity-0 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(80,150,255,0.7), transparent 70%)",
          }}
        />

        {/* ============================================
            VAPOR
        ============================================ */}

        <div className="vapor pointer-events-none absolute left-1/2 top-[65%] h-72 w-40 -translate-x-1/2 rounded-full bg-black/[0.08] opacity-0 blur-[50px]" />

        {/* ============================================
            CONTENT
        ============================================ */}

        <div className="relative z-10 px-6 text-center">
          <p className="mb-8 text-xs uppercase tracking-[0.6em] text-black/40">
            The Process
          </p>

          <h2 className="distillery-title text-6xl font-medium leading-none tracking-tight md:text-9xl">
            Fire
            <span className="block text-black/20">transforms.</span>
          </h2>

          <p className="distillery-copy mx-auto mt-10 max-w-md translate-y-20 text-sm leading-relaxed text-black/50 opacity-0">
            Heat awakens the botanicals. Vapor carries their character. Water
            captures what remains.
          </p>
        </div>

        {/* ============================================
            PROCESS LABEL
        ============================================ */}

        <div className="absolute bottom-10 left-6 text-[10px] uppercase tracking-[0.4em] text-black/30">
          KAAL — THE DISTILLATION
        </div>

        <div className="absolute bottom-10 right-6 text-[10px] uppercase tracking-[0.4em] text-black/30">
          03 / 07
        </div>
      </div>
    </section>
  );
}
