import { Link } from 'react-router-dom';

const values = [
  {
    icon: '✦',
    title: 'Full-grain leather only',
    body: 'We never use bonded or corrected leather. Full-grain develops a patina and gets better with age.',
  },
  {
    icon: '✦',
    title: 'One artisan, one bag',
    body: 'Each piece is cut, stitched, and finished by a single pair of hands — no assembly line.',
  },
  {
    icon: '✦',
    title: 'Vegetable-tanned',
    body: 'A slower, plant-based tanning process. Better for the leather, kinder to the environment.',
  },
  {
    icon: '✦',
    title: 'Solid brass hardware',
    body: 'No plating. Our brass hardware is solid and will outlive the bag if you let it.',
  },
];

export default function AboutPage() {
  return (
    <div>

      {/* Hero */}
      <section className="bg-earth-100">
        <div className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-earth-400 font-sans mb-3">
              Our story
            </p>
            <h1 className="font-serif text-5xl text-bark leading-tight mb-6">
              Made by hand,<br />
              <em>kept for life.</em>
            </h1>
            <p className="font-sans text-earth-600 leading-relaxed max-w-md">
              Maison Terre began in a small Parisian workshop with a single belief:
              the things we carry should be made to last a lifetime — and look
              better for every year of use.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80"
            alt="Artisan hand-stitching leather in the Maison Terre studio"
            className="w-full aspect-[4/3] object-cover rounded"
          />
        </div>
      </section>

      {/* Origin story */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="section-title mb-6">How it started</h2>
        <div className="space-y-4 font-sans text-earth-600 leading-relaxed">
          <p>
            In 2019, our founder spent six months apprenticing under a saddler
            in the south of France. She came back with one bag, a notebook full
            of patterns, and the conviction that most leather goods are made to
            be replaced — not to last.
          </p>
          <p>
            Maison Terre started as a market stall. The Harvest Tote — still our
            most popular bag — sold out in the first hour. We've been making them
            by hand ever since.
          </p>
          <p>
            Today we work from a small studio. Every bag is made in batches of
            twelve. When they're gone, they're gone until the next batch. That's
            how it's always been.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-earth-50 border-y border-earth-200">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="section-title mb-12">What we stand for</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {values.map(({ icon, title, body }) => (
              <div key={title}>
                <span className="text-earth-400 text-lg mb-3 block">{icon}</span>
                <h3 className="font-serif text-bark text-lg mb-2">{title}</h3>
                <p className="font-sans text-sm text-earth-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="section-title mb-4">Ready to find yours?</h2>
        <p className="font-sans text-earth-600 mb-8 max-w-md mx-auto">
          Every bag in our collection is in stock and ready to ship — made
          in the same small batches, the same way as always.
        </p>
        <Link to="/shop" className="btn-primary">Shop the Collection</Link>
      </section>

    </div>
  );
}