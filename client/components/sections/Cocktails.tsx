export default function Cocktails() {
  return (
    <section id="cocktails" className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm uppercase tracking-[0.5em] text-white/40">
          The ritual
        </p>

        <h2 className="mb-20 text-5xl text-white md:text-8xl">
          Pour differently.
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {["Monsoon Sour", "Ember Highball", "Forest Negroni"].map(
            (cocktail) => (
              <article
                key={cocktail}
                className="min-h-72 border border-white/10 p-8"
              >
                <h3 className="text-2xl text-white">{cocktail}</h3>

                <p className="mt-4 text-white/50">
                  A modern expression of KAAL.
                </p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
