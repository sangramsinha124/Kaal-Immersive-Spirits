"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type RainDrop = {
  x: number;
  y: number;
  length: number;
  speed: number;
  drift: number;
  opacity: number;
  width: number;
};

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const rainCanvas = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const canvas = rainCanvas.current;
    const section = container.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !section) return;
    if (!context) {
      console.error("Hero rain canvas could not be initialized.");
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let visible = false;
    let frame = 0;
    let lastFrame = 0;
    let width = 0;
    let height = 0;
    let drops: RainDrop[] = [];

    const random = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from(
        { length: Math.max(48, Math.round((width * height) / 11000)) },
        () => ({
          x: random(0, width),
          y: random(-height, height),
          length: random(9, 19),
          speed: random(390, 650),
          drift: random(-115, -72),
          opacity: random(0.12, 0.28),
          width: random(0.45, 0.8),
        }),
      );
    };

    const render = (time: number) => {
      const delta = Math.min((time - lastFrame) / 1000, 0.05);
      lastFrame = time;
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      drops.forEach((drop) => {
        drop.x += drop.drift * delta;
        drop.y += drop.speed * delta;

        if (drop.y - drop.length > height || drop.x < -30) {
          drop.x = random(0, width + 30);
          drop.y = random(-80, -drop.length);
        }

        context.beginPath();
        context.moveTo(drop.x, drop.y);
        context.lineTo(
          drop.x + (drop.drift / drop.speed) * drop.length,
          drop.y + drop.length,
        );
        context.strokeStyle = `rgba(224, 235, 239, ${drop.opacity})`;
        context.lineWidth = drop.width;
        context.stroke();
      });

      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!visible || reducedMotion || frame) return;
      lastFrame = performance.now();
      frame = requestAnimationFrame(render);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const resizeObserver = new ResizeObserver(resize);
    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      if (reducedMotion) {
        stop();
        context.clearRect(0, 0, width, height);
      } else {
        start();
      }
    };

    resize();
    observer.observe(section);
    resizeObserver.observe(section);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

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
      <canvas
        ref={rainCanvas}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
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
