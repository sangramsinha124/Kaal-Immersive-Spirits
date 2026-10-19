"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: "01",
    name: "Fire",
    title: "Heat awakens",
    detail: "the botanicals.",
    description:
      "A steady flame draws out the oils, warmth and wild character held within each ingredient.",
    className: "distillery-step-fire",
  },
  {
    number: "02",
    name: "Vapor",
    title: "Vapor carries",
    detail: "their character.",
    description:
      "Through copper and coil, fragrant vapor rises — carrying the essence of the Western Ghats.",
    className: "distillery-step-vapor",
  },
  {
    number: "03",
    name: "Water",
    title: "Water captures",
    detail: "what remains.",
    description:
      "Cool mountain water gathers every note into a spirit shaped by the rhythm of the monsoon.",
    className: "distillery-step-water",
  },
];

export default function Distillery() {
  const container = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLCanvasElement>(null);
  const fireVideoRef = useRef<HTMLVideoElement>(null);
  const vaporVideoRef = useRef<HTMLVideoElement>(null);
  const waterVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = atmosphereRef.current;
    const section = container.current;
    const stage = stageRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !section || !stage) return;
    if (!context) {
      console.error("Distillery atmosphere canvas could not be initialized.");
      return;
    }
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    const random = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const embers = Array.from({ length: 34 }, () => ({
      x: random(0.22, 0.72),
      y: random(0.55, 1),
      speed: random(0.00008, 0.00023),
      drift: random(0.008, 0.035),
      size: random(0.7, 2.2),
      phase: random(0, Math.PI * 2),
    }));
    const fieldCanvas = document.createElement("canvas");
    const fieldContext = fieldCanvas.getContext("2d");
    if (!fieldContext) {
      console.error("Distillery atmosphere field could not be initialized.");
      return;
    }

    const smoothNoise = (x: number, y: number) => {
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const tx = x - x0;
      const ty = y - y0;
      const fadeX = tx * tx * (3 - 2 * tx);
      const fadeY = ty * ty * (3 - 2 * ty);
      const hash = (ix: number, iy: number) => {
        const value = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453;
        return value - Math.floor(value);
      };
      const top =
        hash(x0, y0) * (1 - fadeX) + hash(x0 + 1, y0) * fadeX;
      const bottom =
        hash(x0, y0 + 1) * (1 - fadeX) + hash(x0 + 1, y0 + 1) * fadeX;
      return top * (1 - fadeY) + bottom * fadeY;
    };
    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
    const smoothStep = (edge0: number, edge1: number, value: number) => {
      const x = clamp01((value - edge0) / (edge1 - edge0));
      return x * x * (3 - 2 * x);
    };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let visible = false;
    let fieldWidth = 0;
    let fieldHeight = 0;
    let fieldPixels: ImageData;

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      fieldWidth = Math.max(120, Math.min(240, Math.round(width / 5)));
      fieldHeight = Math.max(90, Math.round((fieldWidth * height) / width));
      fieldCanvas.width = fieldWidth;
      fieldCanvas.height = fieldHeight;
      fieldPixels = fieldContext.createImageData(fieldWidth, fieldHeight);
    };

    const draw = (time: number) => {
      if (!width || !height) return;

      const progress = reducedMotion
        ? 0.5
        : Number(section.dataset.processProgress || 0);
      const fireWeight = reducedMotion
        ? 0.45
        : 1 - Math.min(1, progress * 3.2);
      const vaporWeight = reducedMotion
        ? 0.35
        : Math.max(0, 1 - Math.abs(progress - 0.5) * 3.3);
      const waterWeight = reducedMotion
        ? 0.45
        : Math.max(0, Math.min(1, (progress - 0.48) * 3.2));
      const t = time * 0.001;

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "screen";
      const pixels = fieldPixels.data;

      if (fireWeight > 0.001) {
        context.globalAlpha = fireWeight * 0.72;
        const glow = context.createRadialGradient(
          width * 0.46,
          height * 1.02,
          0,
          width * 0.46,
          height * 1.02,
          width * 0.64,
        );
        glow.addColorStop(0, "rgba(255, 151, 52, 0.48)");
        glow.addColorStop(0.3, "rgba(211, 67, 24, 0.25)");
        glow.addColorStop(1, "rgba(118, 28, 14, 0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
        embers.forEach((ember, index) => {
          const travel = (t * ember.speed * 650 + ember.y) % 0.5;
          const x =
            width *
            (ember.x +
              Math.sin(t * 0.8 + ember.phase) * ember.drift +
              Math.sin(t * 0.33 + index) * 0.009);
          const y = height * (0.98 - travel);
          const twinkle = 0.55 + 0.45 * Math.sin(t * 5 + ember.phase);
          const alpha = Math.max(
            0,
            (1 - travel / 0.5) * fireWeight * 0.55 * twinkle,
          );
          context.globalAlpha = alpha;
          context.fillStyle = index % 4 === 0 ? "#ffe5a1" : "#ff8a35";
          context.beginPath();
          context.arc(
            x,
            y,
            ember.size * (0.65 + twinkle * 0.6),
            0,
            Math.PI * 2,
          );
          context.fill();
        });
      }

      const falloff = (value: number, center: number, radius: number) =>
        Math.max(0, 1 - Math.abs(value - center) / radius);
      for (let y = 0; y < fieldHeight; y += 1) {
        const ny = y / fieldHeight;
        for (let x = 0; x < fieldWidth; x += 1) {
          const nx = x / fieldWidth;
          const index = (y * fieldWidth + x) * 4;
          let red = 0;
          let green = 0;
          let blue = 0;
          let alpha = 0;

          if (fireWeight > 0.001 && ny > 0.34) {
            const heightFactor = clamp01((1 - ny) / 0.66);
            const flameWidth = 0.035 + Math.pow(heightFactor, 0.72) * 0.34;
            const turbulence =
              (smoothNoise(nx * 7 + t * 0.11, ny * 3.2 - t * 0.52) - 0.5) *
                0.34 +
              (smoothNoise(nx * 15 - t * 0.08, ny * 5.4 - t * 0.78) -
                0.5) *
                0.2;
            const center = 0.47 + Math.sin(t * 0.7) * 0.035;
            const shape = clamp01(
              1 -
                Math.abs(nx - center) / flameWidth +
                turbulence -
                heightFactor * 0.18,
            );
            const heat = shape * fireWeight;
            const core =
              falloff(nx, center, 0.11) *
              falloff(ny, 0.91, 0.2) *
              heat;
            const flameAlpha = heat * smoothStep(0.08, 0.55, shape) * 0.78;
            red += 255 * flameAlpha;
            green += (54 + 170 * core + 82 * heat) * flameAlpha;
            blue += (8 + 38 * core) * flameAlpha;
            alpha += flameAlpha;
          }

          if (vaporWeight > 0.001) {
            const vaporNoise =
              smoothNoise(nx * 3.5 + t * 0.04, ny * 3.1 - t * 0.22) * 0.62 +
              smoothNoise(nx * 7.2 - t * 0.065, ny * 5.8 - t * 0.31) * 0.38;
            const plumeEnvelope =
              falloff(nx, 0.51 + Math.sin(t * 0.17) * 0.035, 0.42) *
              smoothStep(0.98, 0.2, ny);
            const vaporAlpha =
              smoothStep(0.48, 0.84, vaporNoise) *
              plumeEnvelope *
              vaporWeight *
              0.24;
            red += 205 * vaporAlpha;
            green += 207 * vaporAlpha;
            blue += 201 * vaporAlpha;
            alpha += vaporAlpha;
          }

          if (waterWeight > 0.001 && ny > 0.57) {
            const waveNoise =
              smoothNoise(nx * 8 + t * 0.08, ny * 3.5) * 0.65 +
              smoothNoise(nx * 19 - t * 0.12, ny * 7.5) * 0.35;
            const surface =
              0.75 +
              (waveNoise - 0.5) * 0.085 +
              Math.sin(nx * 12 + t * 0.72) * 0.009;
            const depth = Math.abs(ny - surface);
            const body = (1 - smoothStep(0.04, 0.2, depth)) * 0.23;
            const glint =
              smoothStep(0.74, 0.94, waveNoise) *
              (1 - smoothStep(0.006, 0.03, depth)) *
              0.34;
            const waterAlpha = (body + glint) * waterWeight;
            red += 88 * waterAlpha;
            green += 171 * waterAlpha;
            blue += 187 * waterAlpha;
            alpha += waterAlpha;
          }

          const compositing = Math.min(alpha, 1);
          if (alpha > 0) {
            pixels[index] = Math.min(255, red / alpha);
            pixels[index + 1] = Math.min(255, green / alpha);
            pixels[index + 2] = Math.min(255, blue / alpha);
          } else {
            pixels[index] = 0;
            pixels[index + 1] = 0;
            pixels[index + 2] = 0;
          }
          pixels[index + 3] = Math.round(compositing * 255);
        }
      }

      fieldContext.putImageData(fieldPixels, 0, 0);
      context.globalAlpha = 1;
      context.imageSmoothingEnabled = true;
      context.drawImage(fieldCanvas, 0, 0, width, height);

      context.restore();
    };

    const render = (time: number) => {
      if (reducedMotion) {
        draw(0);
        return;
      }

      if (time - lastFrame >= 1000 / 24) {
        elapsed += time - lastFrame;
        lastFrame = time;
        draw(elapsed);
      }

      frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion && !frame) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(render);
      } else if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (visible && reducedMotion) {
        draw(0);
      }
    });
    const resizeObserver = new ResizeObserver(resize);

    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      if (motionQuery.matches) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        draw(0);
      } else if (visible && !frame) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    resizeObserver.observe(stage);
    resize();
    observer.observe(section);
    motionQuery.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", resize);
    if (reducedMotion) draw(0);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", resize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useGSAP(
    () => {
      const section = container.current;
      const stage = stageRef.current;

      if (!section || !stage) return;

      const mm = gsap.matchMedia(section);
      const videos = [
        fireVideoRef.current,
        vaporVideoRef.current,
        waterVideoRef.current,
      ];
      const pendingVideos = new WeakSet<HTMLVideoElement>();
      const failedVideos = new WeakSet<HTMLVideoElement>();
      let activeVideoIndex = -1;
      const playVideo = (video: HTMLVideoElement) => {
        if (document.visibilityState !== "visible") return;
        if (!video.paused || pendingVideos.has(video) || failedVideos.has(video))
          return;
        pendingVideos.add(video);
        video
          .play()
          .catch((error: unknown) => {
            if (error instanceof DOMException && error.name === "AbortError") {
              return;
            }
            failedVideos.add(video);
            console.error(
              "Distillery atmosphere video could not be played.",
              error,
            );
          })
          .finally(() => pendingVideos.delete(video));
      };
      const activateVideo = (index: number) => {
        if (activeVideoIndex === index) {
          const activeVideo = videos[index];
          if (activeVideo?.paused) playVideo(activeVideo);
          return;
        }
        activeVideoIndex = index;
        videos.forEach((video, videoIndex) => {
          if (!video) return;
          if (videoIndex === index) {
            failedVideos.delete(video);
            video.currentTime = index === 2 ? 1 : 0;
            video.playbackRate = index === 2 ? 0.65 : 1;
            playVideo(video);
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      };
      const pauseVideos = () => {
        activeVideoIndex = -1;
        videos.forEach((video) => {
          video?.pause();
          if (video) {
            video.currentTime = 0;
            video.playbackRate = 1;
            failedVideos.delete(video);
          }
        });
      };
      const handleVisibilityChange = () => {
        if (document.visibilityState !== "visible") {
          pauseVideos();
          return;
        }
        const bounds = section.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          const progress = Number(section.dataset.processProgress || 0);
          activateVideo(progress < 0.31 ? 0 : progress < 0.68 ? 1 : 2);
        }
      };
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        const fireCopy = section.querySelector(".distillery-step-fire");
        const vaporCopy = section.querySelector(".distillery-step-vapor");
        const waterCopy = section.querySelector(".distillery-step-water");
        const progress = section.querySelector(".distillery-progress-fill");
        const copyPanels = [fireCopy, vaporCopy, waterCopy].filter(
          (panel): panel is Element => panel !== null,
        );
        gsap.set(
          [fireVideoRef.current, vaporVideoRef.current, waterVideoRef.current],
          { autoAlpha: 0 },
        );
        gsap.set(fireVideoRef.current, { autoAlpha: 0.62 });
        gsap.set([vaporCopy, waterCopy], { autoAlpha: 0 });
        gsap.set(vaporCopy, { y: 24 });
        gsap.set(waterCopy, { y: 24 });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => activateVideo(0),
            onEnterBack: (self) =>
              activateVideo(
                self.progress < 0.31 ? 0 : self.progress < 0.68 ? 1 : 2,
              ),
            onLeave: pauseVideos,
            onLeaveBack: pauseVideos,
            onUpdate: (self) => {
              const progress = self.progress;
              section.dataset.processProgress = String(progress);
              const activeIndex =
                progress < 0.31 ? 0 : progress < 0.68 ? 1 : 2;
              activateVideo(activeIndex);
              const activePanel = copyPanels[activeIndex];
              copyPanels.forEach((panel) => {
                panel.setAttribute(
                  "aria-hidden",
                  panel === activePanel ? "false" : "true",
                );
              });
            },
          },
        });

        timeline
          .to(fireCopy, { autoAlpha: 0, y: -20, duration: 0.25 }, 0.75)
          .to(fireVideoRef.current, { autoAlpha: 0, duration: 0.25 }, 0.75)
          .to(vaporCopy, { autoAlpha: 1, y: 0, duration: 0.35 }, 1.05)
          .to(vaporVideoRef.current, { autoAlpha: 0.48, duration: 0.35 }, 1.05)
          .to(vaporCopy, { autoAlpha: 0, y: -20, duration: 0.25 }, 1.85)
          .to(vaporVideoRef.current, { autoAlpha: 0, duration: 0.25 }, 1.85)
          .to(waterCopy, { autoAlpha: 1, y: 0, duration: 0.35 }, 2.1)
          .to(waterVideoRef.current, { autoAlpha: 0.72, duration: 0.35 }, 2.1)
          .to(progress, { scaleX: 1, duration: 2.8, ease: "none" }, 0);

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange,
          );
          pauseVideos();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(section.querySelectorAll(".distillery-step"), {
          clearProps: "all",
        });
        section
          .querySelectorAll(".distillery-step")
          .forEach((panel) => panel.removeAttribute("aria-hidden"));
      });

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-[340svh] overflow-clip bg-[#070706] text-white motion-reduce:h-auto"
      aria-label="The distillation process"
    >
      <div
        ref={stageRef}
        className="distillery-stage relative flex h-svh items-center overflow-hidden bg-[#080807] motion-reduce:h-auto motion-reduce:min-h-svh motion-reduce:py-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.28] saturate-[0.6]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1765989431827-99068486f4d8?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,0.82)_0%,rgba(5,5,4,0.44)_48%,rgba(5,5,4,0.22)_100%),linear-gradient(0deg,rgba(0,0,0,0.5),transparent_45%,rgba(0,0,0,0.28))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_55%,rgba(124,72,37,0.18),transparent_46%)]"
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
          aria-hidden="true"
        >
          <canvas
            ref={atmosphereRef}
            className="h-full w-full"
            aria-hidden="true"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen motion-reduce:hidden"
          aria-hidden="true"
        >
          <video
            ref={fireVideoRef}
            className="absolute inset-0 h-full w-full object-contain object-bottom opacity-0"
            src="/videos/distillery/fire.mp4"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
          <video
            ref={vaporVideoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            src="/videos/distillery/vapor.mp4"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
          <video
            ref={waterVideoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            src="/videos/distillery/water.mp4"
            style={{ transform: "scaleX(-1)" }}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
        </div>

        <header className="absolute inset-x-6 top-7 z-20 flex items-center justify-between sm:inset-x-10 sm:top-9 md:inset-x-14">
          <p className="text-[9px] uppercase tracking-[0.45em] text-white/55 sm:text-[10px]">
            The Distillery
          </p>
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/40">
            04 / 07
          </p>
        </header>

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-[12vw]">
          <div className="relative min-h-[320px] max-w-2xl sm:min-h-[370px]">
            {stages.map((stage, index) => (
              <article
                key={stage.number}
                className={`distillery-step ${stage.className} absolute inset-0 flex flex-col justify-center ${
                  index === 0
                    ? "opacity-100"
                    : "pointer-events-none opacity-0 motion-reduce:static motion-reduce:mb-12 motion-reduce:opacity-100"
                } motion-reduce:translate-y-0`}
                aria-hidden={index !== 0}
              >
                <p className="mb-7 text-[10px] uppercase tracking-[0.45em] text-white/45">
                  <span className="text-white/75">{stage.number}</span>
                  <span className="mx-3 text-white/25">/</span>
                  {stage.name}
                </p>
                <h2 className="text-5xl font-light leading-[0.94] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[clamp(5rem,7vw,7.25rem)]">
                  {stage.title}
                  <span className="block text-white/45">{stage.detail}</span>
                </h2>
                <p className="mt-7 max-w-md text-sm leading-7 text-white/55 sm:mt-9 md:text-base md:leading-8">
                  {stage.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-7 z-20 flex items-end justify-between sm:inset-x-10 sm:bottom-9 md:inset-x-14">
          <div>
            <p className="mb-3 text-[8px] uppercase tracking-[0.35em] text-white/40">
              KAAL — The distillation
            </p>
            <div className="h-px w-32 overflow-hidden bg-white/20 sm:w-48">
              <div className="distillery-progress-fill h-full w-full origin-left bg-white/75 motion-reduce:scale-x-100" />
            </div>
          </div>
          <p className="text-[8px] uppercase tracking-[0.3em] text-white/35">
            Scroll to experience
          </p>
        </div>
      </div>
    </section>
  );
}
