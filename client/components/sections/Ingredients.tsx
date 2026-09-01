const ingredients = [
  "Juniper",
  "Cardamom",
  "Orange Peel",
  "Ginger",
  "Coriander",
];

export default function Ingredients() {
  return (
    <section className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm uppercase tracking-[0.5em] text-white/40">
          The Botanicals
        </p>

        <h2 className="mb-20 text-5xl text-white md:text-8xl">
          Gathered from
          <span className="block text-white/40">the wild.</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-5">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient}
              className="border border-white/10 p-8 transition hover:border-white/40"
            >
              <span className="text-sm uppercase tracking-widest text-white/70">
                {ingredient}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
