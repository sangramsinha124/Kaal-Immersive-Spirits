"use client";

import { useState } from "react";

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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* Mobile menu */}
      <div
        className={`absolute left-0 top-0 -z-10 flex min-h-screen w-full flex-col items-center justify-center bg-black transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navigationItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="text-3xl uppercase tracking-[0.2em] text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
