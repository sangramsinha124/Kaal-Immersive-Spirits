"use client";

import { useEffect, useState } from "react";

const navigationItems = [
  {
    label: "Story",
    target: "story",
  },
  {
    label: "Botanicals",
    target: "ingredients",
  },
  {
    label: "Spirit",
    target: "product",
  },
  {
    label: "Ritual",
    target: "cocktails",
  },
];

const menuItems = [
  { label: "The story", target: "story", number: "01" },
  { label: "The manifesto", target: "manifesto", number: "02" },
  { label: "Botanicals", target: "ingredients", number: "03" },
  { label: "The spirit", target: "product", number: "04" },
  { label: "The distillery", target: "distillery", number: "05" },
  { label: "Cocktail rituals", target: "cocktails", number: "06" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav className="flex items-center justify-between px-6 py-6 md:px-10">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group"
          aria-label="KAAL home"
        >
          <span className="text-xl font-medium tracking-[0.35em] text-white">
            KAAL
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navigationItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="group relative text-xs uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          <span
            className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-1"
            }`}
          />

          <span
            className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Section index */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Explore KAAL"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto bg-[#070706]/[0.98] transition-all duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex min-h-screen w-full max-w-7xl flex-col justify-center px-8 py-28 sm:px-14"
        >
          <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-5">
            <p className="text-[9px] uppercase tracking-[0.45em] text-[#d8b77c]/70">
              Explore the spirit
            </p>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Maharashtra, India
            </span>
          </div>

          <nav aria-label="Main menu" className="grid gap-x-14 md:grid-cols-2">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="group flex items-center gap-5 border-b border-white/10 py-4 text-left sm:py-5"
              >
                <span className="text-[9px] tracking-[0.25em] text-[#d8b77c]/55">
                  {item.number}
                </span>
                <span className="flex-1 text-2xl font-light tracking-[-0.04em] text-white/75 transition-colors group-hover:text-white sm:text-3xl">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm text-white/30 transition-all group-hover:translate-x-1 group-hover:text-[#d8b77c]"
                >
                  ↗
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-xs text-xs leading-6 text-white/40">
              A spirit shaped by wild botanicals and the rhythm of the monsoon.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="self-start border-b border-[#d8b77c]/50 pb-2 text-[9px] uppercase tracking-[0.3em] text-[#e0c394] transition-colors hover:text-white sm:self-auto"
            >
              Make an enquiry <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
