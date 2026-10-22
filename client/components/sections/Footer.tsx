"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "The story", href: "#story" },
  { label: "Botanicals", href: "#ingredients" },
  { label: "The spirit", href: "#manifesto" },
  { label: "Cocktails", href: "#cocktails" },
];

export default function Footer() {
  const footer = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = footer.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const content = section.querySelectorAll(".footer-reveal");

      gsap.from(content, {
        opacity: 0,
        y: 22,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(section.querySelector(".footer-wordmark"), {
        opacity: 0,
        y: 34,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footer}
      className="relative isolate overflow-hidden bg-[#070706] px-6 pb-7 pt-16 text-white sm:px-10 sm:pt-20 md:pb-10 md:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[35rem] w-[35rem] rounded-full bg-[#713a18]/[0.11] blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="footer-reveal flex items-center justify-between gap-4 border-y border-white/10 py-4">
          <p className="text-[8px] uppercase tracking-[0.42em] text-white/40 sm:text-[9px]">
            The wild, distilled
          </p>
          <p className="text-[8px] uppercase tracking-[0.32em] text-white/30 sm:text-[9px]">
            07 / 07 · Maharashtra, India
          </p>
        </div>

        <div className="grid gap-10 py-12 sm:py-16 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-16 md:py-20">
          <div>
            <p className="footer-reveal mb-5 text-[8px] uppercase tracking-[0.45em] text-[#d8b77c]/60 sm:text-[9px]">
              Wild botanicals · Monsoon air
            </p>
            <h2 className="footer-reveal max-w-3xl text-[clamp(2.8rem,6vw,6rem)] font-light leading-[0.9] tracking-[-0.055em]">
              Carry the
              <span className="block text-white/35">monsoon with you.</span>
            </h2>
            <p className="footer-wordmark mt-8 select-none font-serif text-[clamp(5.5rem,17vw,14rem)] leading-[0.68] tracking-[-0.065em] text-[#eee7da]">
              KAAL
            </p>
            <p className="footer-reveal mt-7 max-w-sm text-xs leading-6 text-white/45 sm:mt-9 sm:text-sm sm:leading-7">
              A spirit shaped by the landscape that surrounds it. Best enjoyed
              slowly, wherever the evening takes you.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="footer-reveal">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[8px] uppercase tracking-[0.4em] text-white/35 sm:text-[9px]">
                Explore KAAL
              </p>
              <span className="h-px w-10 bg-[#d8b77c]/45" />
            </div>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-5 sm:max-w-md">
              {footerLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-[#e5c58f] sm:text-sm"
                  >
                    <span className="text-[8px] tracking-[0.2em] text-[#d8b77c]/45">
                      0{index + 1}
                    </span>
                    <span className="h-px w-0 bg-[#d8b77c] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-reveal flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-[8px] uppercase tracking-[0.28em] text-white/30 sm:flex-row sm:items-center sm:text-[9px]">
          <p>Spirits of the Monsoon</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>Made in Maharashtra</span>
            <span className="h-3 w-px bg-white/15" />
            <span>© 2026 KAAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
