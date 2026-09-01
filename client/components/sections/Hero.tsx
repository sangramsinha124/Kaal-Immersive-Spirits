export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.5em] text-white/60">
          Spirits of the Monsoon
        </p>

        <h1 className="text-7xl font-bold tracking-[0.15em] text-white md:text-9xl">
          KAAL
        </h1>

        <p className="mt-6 text-lg text-white/70">
          Born from rain. Distilled in fire.
        </p>

        <button className="mt-10 rounded-full border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black">
          Enter the experience
        </button>
      </div>
    </section>
  );
}
