"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import * as THREE from "three";

import BottleScene from "../three/BottleScene";

gsap.registerPlugin(ScrollTrigger);

export default function Product() {
  const container = useRef<HTMLElement>(null);

  const bottleRef = useRef<THREE.Group | null>(null);

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useGSAP(
    () => {
      if (!container.current || !bottleRef.current || !cameraRef.current) {
        return;
      }

      const bottle = bottleRef.current;

      const camera = cameraRef.current;

      /*
       * ============================================
       * MASTER PRODUCT TIMELINE
       * ============================================
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,

          start: "top top",

          end: "bottom bottom",

          scrub: 1.2,

          pin: true,

          anticipatePin: 1,
        },
      });

      /*
       * ============================================
       * PHASE 1
       *
       * Bottle starts small and distant
       * ============================================
       */

      gsap.set(bottle.scale, {
        x: 0.65,
        y: 0.65,
        z: 0.65,
      });

      gsap.set(bottle.position, {
        y: -0.2,
      });

      /*
       * ============================================
       * PHASE 2
       *
       * Bottle enters
       * ============================================
       */

      timeline.to(
        bottle.scale,
        {
          x: 0.82,
          y: 0.82,
          z: 0.82,
          duration: 1,
          ease: "power2.out",
        },
        0,
      );

      timeline.to(
        bottle.position,
        {
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        0,
      );

      /*
       * ============================================
       * PHASE 3
       *
       * Bottle rotates
       * ============================================
       */

      timeline.to(
        bottle.rotation,
        {
          y: Math.PI * 0.75,
          x: 0.04,
          duration: 1.8,
          ease: "power1.inOut",
        },
        0.8,
      );

      /*
       * ============================================
       * PHASE 4
       *
       * Camera moves closer
       * ============================================
       */

      timeline.to(
        camera.position,
        {
          z: 7.5,
          y: 0.15,
          duration: 1.4,
          ease: "power2.inOut",
        },
        1.2,
      );

      /*
       * ============================================
       * PHASE 5
       *
       * Show label
       * ============================================
       */

      timeline.to(
        bottle.rotation,
        {
          y: Math.PI * 2,
          duration: 1.5,
          ease: "power2.inOut",
        },
        2.6,
      );

      /*
       * ============================================
       * PHASE 6
       *
       * Cinematic close-up
       * ============================================
       */

      timeline.to(
        camera.position,
        {
          z: 5.8,
          duration: 1.5,
          ease: "power2.inOut",
        },
        3.8,
      );

      /*
       * ============================================
       * PHASE 7
       *
       * Bottle slightly rises
       * ============================================
       */

      timeline.to(
        bottle.position,
        {
          y: 0.25,
          duration: 1,
          ease: "power2.out",
        },
        4.3,
      );

      /*
       * ============================================
       * PHASE 8
       *
       * Exit / prepare next section
       * ============================================
       */

      timeline.to(
        bottle.scale,
        {
          x: 0.68,
          y: 0.68,
          z: 0.68,
          duration: 1,
        },
        5.3,
      );

      /*
       * Refresh ScrollTrigger after
       * Three.js has initialized.
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    {
      scope: container,
    },
  );

  return (
    <section
      ref={container}
      id="product"
      className="
        relative
        h-[600vh]
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* =========================================
          3D CANVAS
          ========================================= */}

      <div
        className="
          absolute
          inset-0
          z-0
        "
      >
        <BottleScene bottleRef={bottleRef} cameraRef={cameraRef} />
      </div>

      {/* =========================================
          ATMOSPHERIC GRADIENT
          ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]
        "
      />

      {/* =========================================
          TOP LABEL
          ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-16
          z-20
          -translate-x-1/2
          text-center
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.6em]
            text-white/40
          "
        >
          The Spirit
        </p>
      </div>

      {/* =========================================
          PRODUCT COPY
          ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-14
          left-8
          z-20
          max-w-xs
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.45em]
            text-white/30
          "
        >
          KAAL
        </p>

        <p
          className="
            mt-4
            text-sm
            leading-relaxed
            text-white/50
          "
        >
          Born from rain.
          <br />
          Distilled in fire.
        </p>
      </div>

      {/* =========================================
          PROGRESS
          ========================================= */}

      <div
        className="
          absolute
          bottom-14
          right-8
          z-20
          text-[10px]
          uppercase
          tracking-[0.4em]
          text-white/30
        "
      >
        04 / 07
      </div>

      {/* =========================================
          SCROLL INDICATOR
          ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-8
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-white/30
          "
        >
          Scroll
        </span>

        <span
          className="
            h-8
            w-px
            bg-white/20
          "
        />
      </div>
    </section>
  );
}
