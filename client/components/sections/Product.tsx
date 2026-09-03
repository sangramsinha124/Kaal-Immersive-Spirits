"use client";

import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BottleScene from "@/components/three/BottleScene";

gsap.registerPlugin(ScrollTrigger);

export default function Product() {
  const container = useRef<HTMLElement>(null);

  const bottleRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const [sceneReady, setSceneReady] = useState(false);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  useGSAP(
    () => {
      if (
        !sceneReady ||
        !container.current ||
        !bottleRef.current ||
        !cameraRef.current
      ) {
        return;
      }

      const bottle = bottleRef.current;
      const camera = cameraRef.current;

      console.log("🎬 KAAL Product Scene Ready");

      /*
       * ============================================================
       * RESET
       * ============================================================
       */

      gsap.killTweensOf(bottle);
      gsap.killTweensOf(bottle.position);
      gsap.killTweensOf(bottle.rotation);
      gsap.killTweensOf(bottle.scale);
      gsap.killTweensOf(camera.position);

      /*
       * Three.js POSITION
       */
      gsap.set(bottle.position, {
        x: 0,
        y: -0.5,
        z: 0,
      });

      /*
       * Three.js ROTATION
       */
      gsap.set(bottle.rotation, {
        x: 0,
        y: -0.18,
        z: 0,
      });

      /*
       * Three.js SCALE
       */
      gsap.set(bottle.scale, {
        x: 0.08,
        y: 0.08,
        z: 0.08,
      });

      /*
       * CAMERA
       */
      gsap.set(camera.position, {
        x: 0,
        y: 0,
        z: 11,
      });

      camera.fov = 42;
      camera.updateProjectionMatrix();

      /*
       * ============================================================
       * TEXT INITIAL STATE
       * ============================================================
       */

      gsap.set(".product-eyebrow", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".product-title", {
        opacity: 0,
        y: 50,
      });

      gsap.set(".product-description", {
        opacity: 0,
        y: 30,
      });

      /*
       * ============================================================
       * SCROLL TIMELINE
       * ============================================================
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      /*
       * ============================================================
       * PHASE 1
       *
       * BOTTLE EMERGES
       * ============================================================
       */

      timeline.to(
        bottle.scale,
        {
          x: 0.48,
          y: 0.48,
          z: 0.48,
          duration: 1.8,
          ease: "power3.out",
        },
        0,
      );

      timeline.to(
        bottle.position,
        {
          y: -0.05,
          duration: 1.8,
          ease: "power3.out",
        },
        0,
      );

      timeline.to(
        bottle.rotation,
        {
          y: 0.08,
          duration: 1.8,
          ease: "power3.out",
        },
        0,
      );

      /*
       * ============================================================
       * PHASE 2
       *
       * FULL BOTTLE HERO
       * ============================================================
       */

      timeline.to(
        bottle.scale,
        {
          x: 0.52,
          y: 0.52,
          z: 0.52,
          duration: 1.2,
          ease: "power2.out",
        },
        1.8,
      );

      /*
       * Slow cinematic rotation
       */
      timeline.to(
        bottle.rotation,
        {
          y: Math.PI * 0.32,
          duration: 2.2,
          ease: "power1.inOut",
        },
        1.8,
      );

      /*
       * Slight camera movement
       */
      timeline.to(
        camera.position,
        {
          z: 10.4,
          duration: 2.2,
          ease: "power1.inOut",
        },
        1.8,
      );

      /*
       * ============================================================
       * PHASE 3
       *
       * LABEL REVEAL
       * ============================================================
       */

      timeline.to(
        bottle.rotation,
        {
          y: Math.PI * 0.06,
          duration: 1.5,
          ease: "power2.inOut",
        },
        4,
      );

      /*
       * ============================================================
       * PHASE 4
       *
       * CAMERA PUSH
       * ============================================================
       */

      timeline.to(
        camera.position,
        {
          z: 8.8,
          y: 0.05,
          duration: 2,
          ease: "power2.inOut",
        },
        5.5,
      );

      timeline.to(
        bottle.scale,
        {
          x: 0.57,
          y: 0.57,
          z: 0.57,
          duration: 2,
          ease: "power2.inOut",
        },
        5.5,
      );

      /*
       * ============================================================
       * PHASE 5
       *
       * PRODUCT STORY
       * ============================================================
       */

      timeline.to(
        ".product-eyebrow",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        6.7,
      );

      timeline.to(
        ".product-title",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        6.9,
      );

      timeline.to(
        ".product-description",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        7.2,
      );

      /*
       * ============================================================
       * PHASE 6
       *
       * CINEMATIC HOLD
       * ============================================================
       */

      timeline.to(
        bottle.rotation,
        {
          y: Math.PI * 0.1,
          duration: 1.5,
          ease: "none",
        },
        8.2,
      );

      /*
       * ============================================================
       * PHASE 7
       *
       * EXIT
       * ============================================================
       */

      timeline.to(
        ".product-copy",
        {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "power2.in",
        },
        9.8,
      );

      timeline.to(
        bottle.position,
        {
          y: 0.45,
          x: 0.15,
          duration: 1.5,
          ease: "power2.inOut",
        },
        9.8,
      );

      timeline.to(
        bottle.rotation,
        {
          y: Math.PI * 0.5,
          duration: 1.5,
          ease: "power2.inOut",
        },
        9.8,
      );

      timeline.to(
        bottle.scale,
        {
          x: 0.42,
          y: 0.42,
          z: 0.42,
          duration: 1.5,
          ease: "power2.in",
        },
        9.8,
      );

      timeline.to(
        camera.position,
        {
          z: 10.5,
          duration: 1.5,
          ease: "power2.in",
        },
        9.8,
      );

      /*
       * Make ScrollTrigger recalculate after the scene
       * has finished mounting.
       */
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: container,
      dependencies: [sceneReady],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={container}
      className="relative h-[500vh] bg-[#050505] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* =====================================================
            ATMOSPHERE
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[650px]
              w-[650px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-orange-500/[0.035]
              blur-[140px]
            "
          />

          <div
            className="
              absolute
              left-[12%]
              top-[20%]
              h-[300px]
              w-[300px]
              rounded-full
              bg-blue-500/[0.025]
              blur-[110px]
            "
          />
        </div>

        {/* =====================================================
            3D SCENE
        ===================================================== */}

        <div className="absolute inset-0 z-10">
          <BottleScene
            bottleRef={bottleRef}
            cameraRef={cameraRef}
            onReady={handleSceneReady}
          />
        </div>

        {/* =====================================================
            PRODUCT COPY
        ===================================================== */}

        <div
          className="
            product-copy
            pointer-events-none
            absolute
            left-8
            top-1/2
            z-20
            -translate-y-1/2
            md:left-16
            lg:left-24
          "
        >
          <p
            className="
              product-eyebrow
              translate-y-8
              text-[10px]
              uppercase
              tracking-[0.55em]
              text-white/40
              opacity-0
            "
          >
            KAAL / 01
          </p>

          <h2
            className="
              product-title
              mt-5
              max-w-[280px]
              translate-y-12
              text-4xl
              font-medium
              leading-[0.95]
              tracking-tight
              text-white
              opacity-0
              md:text-6xl
            "
          >
            The Spirit
            <span className="block text-white/35">of the Monsoon.</span>
          </h2>

          <p
            className="
              product-description
              mt-7
              max-w-[300px]
              translate-y-8
              text-sm
              leading-relaxed
              text-white/45
              opacity-0
            "
          >
            Born from rain.
            <br />
            Distilled in fire.
            <br />
            <br />A spirit shaped by the rhythm of Maharashtras monsoon.
          </p>
        </div>

        {/* =====================================================
            UI
        ===================================================== */}

        <div
          className="
            absolute
            left-6
            top-24
            z-20
            text-[10px]
            uppercase
            tracking-[0.45em]
            text-white/30
          "
        >
          The Spirit
        </div>

        <div
          className="
            absolute
            right-6
            top-24
            z-20
            text-[10px]
            uppercase
            tracking-[0.45em]
            text-white/30
          "
        >
          04 / 07
        </div>

        <div
          className="
            absolute
            bottom-8
            left-6
            z-20
            text-[10px]
            uppercase
            tracking-[0.4em]
            text-white/25
          "
        >
          KAAL — THE SPIRIT
        </div>

        <div
          className="
            absolute
            bottom-8
            right-6
            z-20
            text-[10px]
            uppercase
            tracking-[0.4em]
            text-white/25
          "
        >
          SCROLL TO EXPLORE
        </div>

        {/* =====================================================
            VIGNETTE
        ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]
          "
        />

        {/* =====================================================
            LOADING
        ===================================================== */}

        {!sceneReady && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-20
              left-1/2
              z-40
              -translate-x-1/2
              text-[9px]
              uppercase
              tracking-[0.4em]
              text-white/20
            "
          >
            Initializing
          </div>
        )}
      </div>
    </section>
  );
}
