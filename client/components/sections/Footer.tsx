"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "The story", href: "#story" },
  { label: "Botanicals", href: "#ingredients" },
  { label: "The spirit", href: "#product" },
  { label: "Cocktails", href: "#cocktails" },
];

export default function Footer() {
  const footer = useRef<HTMLElement>(null);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const handleEnquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setEnquirySubmitted(true);
  };

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

          <div className="footer-reveal">
            <nav aria-label="Footer navigation">
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

            <section
              id="contact"
              aria-labelledby="enquiry-heading"
              className="mt-12 border-t border-white/10 pt-7"
            >
              <p className="text-[8px] uppercase tracking-[0.4em] text-[#d8b77c]/65 sm:text-[9px]">
                Start a conversation
              </p>
              <h2
                id="enquiry-heading"
                className="mt-3 text-2xl font-light tracking-[-0.04em] sm:text-3xl"
              >
                Make an enquiry.
              </h2>
              <p className="mt-2 text-xs leading-5 text-white/40">
                Leave a note about partnerships, events, or the spirit.
              </p>

              <form onSubmit={handleEnquirySubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
                    Your name
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      className="min-h-11 w-full border border-white/15 bg-white/[0.03] px-3 text-sm normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d8b77c]/70"
                      placeholder="Name"
                    />
                  </label>
                  <label className="grid gap-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
                    Email address
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-h-11 w-full border border-white/15 bg-white/[0.03] px-3 text-sm normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d8b77c]/70"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
                  What is this about?
                  <select
                    name="enquiry"
                    defaultValue=""
                    required
                    className="min-h-11 w-full border border-white/15 bg-[#0b0b0a] px-3 text-sm normal-case tracking-normal text-white outline-none transition-colors focus:border-[#d8b77c]/70"
                  >
                    <option value="" disabled>
                      Choose an enquiry type
                    </option>
                    <option value="general">General enquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="events">Events</option>
                    <option value="trade">Trade and distribution</option>
                  </select>
                </label>

                <label className="grid gap-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
                  Your message
                  <textarea
                    name="message"
                    rows={3}
                    required
                    className="w-full resize-y border border-white/15 bg-white/[0.03] px-3 py-3 text-sm normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d8b77c]/70"
                    placeholder="Tell us a little about your enquiry..."
                  />
                </label>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center gap-3 border border-[#d8b77c]/60 px-5 text-[9px] uppercase tracking-[0.25em] text-[#ead2a6] transition-colors hover:bg-[#d8b77c] hover:text-[#17120d]"
                  >
                    Send enquiry <span aria-hidden="true">↗</span>
                  </button>
                  <p
                    role="status"
                    aria-live="polite"
                    className="max-w-xs text-[10px] leading-4 text-white/40"
                  >
                    {enquirySubmitted
                      ? "Thanks for your interest. This demo form does not send or store your details."
                      : null}
                  </p>
                </div>
              </form>
            </section>
          </div>
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
