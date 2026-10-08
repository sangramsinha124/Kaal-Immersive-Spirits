"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    number: "01",
    name: "React",
    category: "FRONTEND",
    description:
      "Component-driven interfaces built for scale, clarity and performance.",
    technologies: ["React.js", "Redux Toolkit", "Context API", "Tailwind CSS"],
  },
  {
    number: "02",
    name: "TypeScript",
    category: "LANGUAGE",
    description:
      "Strongly typed application architecture that keeps complex systems predictable.",
    technologies: ["TypeScript", "JavaScript", "ES6+", "Type-safe APIs"],
  },
  {
    number: "03",
    name: "Next.js",
    category: "APPLICATION",
    description:
      "Modern full-stack React applications with structured routing, rendering and scalable architecture.",
    technologies: ["Next.js", "App Router", "SSR", "API Integration"],
  },
  {
    number: "04",
    name: "Node.js",
    category: "BACKEND",
    description:
      "REST APIs and backend services connecting interfaces to reliable application logic.",
    technologies: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    number: "05",
    name: "MongoDB",
    category: "DATA",
    description:
      "Flexible data models designed for modern full-stack applications.",
    technologies: ["MongoDB", "Mongoose", "Data Modeling", "CRUD"],
  },
  {
    number: "06",
    name: "Azure",
    category: "CLOUD",
    description:
      "Enterprise application delivery through authentication, deployment and cloud infrastructure.",
    technologies: ["Azure", "Azure AD", "MSAL", "App Service"],
  },
];

export default function Craft() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const items = gsap.utils.toArray<HTMLElement>(".craft-item");

      const progress = container.current.querySelector(".craft-progress");

      const line = container.current.querySelector(".craft-line");

      /*
       * ------------------------------------------
       * INITIAL STATE
       * ------------------------------------------
       */

      gsap.set(items, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotateX: 20,
      });

      /*
       * ------------------------------------------
       * MAIN SCROLL TIMELINE
       * ------------------------------------------
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Progress line
       */

      timeline.to(
        line,
        {
          scaleY: 1,
          duration: 1,
          ease: "none",
        },
        0,
      );

      /*
       * Each technology
       */

      items.forEach((item, index) => {
        const name = item.querySelector(".craft-name");

        const meta = item.querySelector(".craft-meta");

        const description = item.querySelector(".craft-description");

        const tags = item.querySelector(".craft-tags");

        const visual = item.querySelector(".craft-visual");

        const start = index * 1.35;

        /*
         * Enter
         */

        timeline.to(
          item,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          start,
        );

        timeline.to(
          name,
          {
            letterSpacing: "0.02em",
            duration: 0.6,
            ease: "power2.out",
          },
          start,
        );

        timeline.to(
          meta,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          start + 0.15,
        );

        timeline.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          start + 0.2,
        );

        timeline.to(
          tags,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          start + 0.3,
        );

        timeline.to(
          visual,
          {
            scale: 1,
            opacity: 1,
            rotation: 360,
            duration: 1,
            ease: "power2.out",
          },
          start,
        );

        /*
         * Exit previous technology
         */

        if (index < items.length - 1) {
          timeline.to(
            item,
            {
              opacity: 0.12,
              y: -80,
              scale: 0.9,
              duration: 0.7,
              ease: "power2.inOut",
            },
            start + 0.85,
          );

          timeline.to(
            visual,
            {
              scale: 0.65,
              opacity: 0,
              duration: 0.6,
            },
            start + 0.85,
          );
        }
      });

      /*
       * Progress indicator
       */

      if (progress) {
        timeline.to(
          progress,
          {
            scaleY: 1,
            duration: 1,
            ease: "none",
          },
          0,
        );
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: container,
    },
  );

  return (
    <section
      ref={container}
      id="craft"
      className="relative h-[700vh] overflow-hidden bg-[#f1eee7] text-black"
    >
      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.025] blur-[130px]" />

        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-orange-500/[0.025] blur-[100px]" />

        <div className="absolute right-[10%] bottom-[15%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.02] blur-[100px]" />
      </div>

      {/* ==========================================
          TOP LABEL
      ========================================== */}

      <div className="absolute left-8 top-8 z-30 md:left-16 md:top-12">
        <p className="text-[10px] uppercase tracking-[0.55em] text-black/35">
          KAAL / 06
        </p>
      </div>

      <div className="absolute right-8 top-8 z-30 md:right-16 md:top-12">
        <p className="text-[10px] uppercase tracking-[0.45em] text-black/30">
          The Craft
        </p>
      </div>

      {/* ==========================================
          CENTER CONTENT
      ========================================== */}

      <div className="relative z-10 flex h-screen items-center justify-center px-6">
        {/* ----------------------------------------
            PROGRESS LINE
        ---------------------------------------- */}

        <div className="absolute left-[8%] top-1/2 hidden h-[40vh] w-px -translate-y-1/2 bg-black/10 md:block">
          <div className="craft-line h-full w-full origin-top scale-y-0 bg-black/35" />

          <div className="craft-progress absolute left-1/2 top-0 h-full w-px origin-top scale-y-0 bg-black/20" />
        </div>

        {/* ----------------------------------------
            INTRO
        ---------------------------------------- */}

        <div className="absolute left-[10%] top-[18%] hidden md:block">
          <p className="text-[9px] uppercase tracking-[0.55em] text-black/35">
            The Ingredients
          </p>

          <p className="mt-3 max-w-[180px] text-xs leading-relaxed text-black/35">
            Every experience begins with the right ingredients.
          </p>
        </div>

        {/* ----------------------------------------
            TECHNOLOGY ITEMS
        ---------------------------------------- */}

        <div className="relative h-[500px] w-full max-w-[1000px]">
          {technologies.map((technology) => (
            <article
              key={technology.number}
              className="craft-item absolute inset-0 flex items-center justify-center opacity-0"
              style={{
                perspective: "1000px",
              }}
            >
              {/* =================================
                    CENTRAL VISUAL
                ================================= */}

              <div className="craft-visual absolute left-1/2 top-1/2 flex h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 scale-[0.65] items-center justify-center rounded-full border border-black/10 opacity-0 md:h-[380px] md:w-[380px]">
                <div className="absolute inset-[10%] rounded-full border border-black/[0.07]" />

                <div className="absolute inset-[22%] rounded-full border border-black/[0.06]" />

                <div className="absolute inset-[35%] rounded-full border border-black/[0.05]" />

                <div className="absolute h-px w-[80%] rotate-45 bg-black/10" />

                <div className="absolute h-px w-[80%] -rotate-45 bg-black/10" />

                <div className="absolute h-2 w-2 rounded-full bg-black/30" />

                <span className="relative z-10 text-[8px] uppercase tracking-[0.5em] text-black/30">
                  {technology.number}
                </span>
              </div>

              {/* =================================
                    TEXT
                ================================= */}

              <div className="relative z-10 w-full text-center">
                <div className="craft-meta translate-y-4 opacity-0">
                  <p className="text-[9px] uppercase tracking-[0.55em] text-black/35">
                    {technology.category}
                  </p>

                  <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-black/20">
                    {technology.number}
                  </p>
                </div>

                <h2 className="craft-name mt-7 text-[clamp(4rem,10vw,9rem)] font-medium leading-none tracking-[-0.04em]">
                  {technology.name}
                </h2>

                <p className="craft-description mx-auto mt-8 max-w-[400px] translate-y-5 text-sm leading-relaxed text-black/45 opacity-0">
                  {technology.description}
                </p>

                <div className="craft-tags mx-auto mt-7 flex max-w-[500px] translate-y-5 flex-wrap justify-center gap-2 opacity-0">
                  {technology.technologies.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-black/35"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ==========================================
          BOTTOM
      ========================================== */}

      <div className="absolute bottom-8 left-8 z-30 md:left-16">
        <p className="text-[9px] uppercase tracking-[0.45em] text-black/25">
          KAAL — THE CRAFT
        </p>
      </div>

      <div className="absolute bottom-8 right-8 z-30 md:right-16">
        <p className="text-[9px] uppercase tracking-[0.45em] text-black/25">
          06 / 07
        </p>
      </div>
    </section>
  );
}
