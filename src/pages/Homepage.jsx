import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const featured = products.slice(0, 3);

export default function HomePage() {
  return (
    <div>

      {/* Hero */}
      <section className="relative bg-earth-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-earth-500 font-sans mb-4">
              Handmade in small batches
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-bark leading-tight mb-6">
              Bags that age<br />
              <em>beautifully.</em>
            </h1>
            <p className="font-sans text-earth-600 text-lg leading-relaxed mb-8 max-w-md">
              Each piece is cut, stitched, and finished by hand using
              full-grain leather and natural materials. Made to last a lifetime.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary">Shop the Collection</Link>
              <Link to="/shop" className="btn-outline">Our Story</Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
              alt="The Harvest Tote — hero"
              className="w-full aspect-square object-cover rounded"
            />
            <div className="absolute -bottom-4 -left-4 bg-cream border border-earth-200 px-5 py-3 shadow-sm">
              <p className="font-serif text-bark text-sm">The Harvest Tote</p>
              <p className="font-sans text-earth-500 text-xs">Full-grain leather · $149</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-earth-200 bg-cream">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: '✦', label: 'Handmade' },
            { icon: '✦', label: 'Vegetable-tanned leather' },
            { icon: '✦', label: 'Free shipping over $120' },
            { icon: '✦', label: '30-day returns' },
          ].map(({ icon, label }) => (
            <p key={label} className="font-sans text-xs text-earth-500 tracking-widest uppercase">
              <span className="text-earth-400 mr-2">{icon}</span>{label}
            </p>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-earth-400 font-sans mb-2">
              New arrivals
            </p>
            <h2 className="section-title">Featured pieces</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-sans tracking-widest uppercase text-earth-500 hover:text-bark transition-colors hidden md:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/shop" className="btn-outline">View all</Link>
        </div>
      </section>

      {/* Brand strip */}
      <section className="bg-earth-800 text-cream py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-serif italic text-earth-300 text-sm tracking-wide mb-6">
            Our philosophy
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-cream leading-snug mb-6">
            "We make things slowly,<br /> so they last a long time."
          </h2>
          <p className="font-sans text-earth-300 leading-relaxed max-w-xl mx-auto">
            Every bag leaves our studio stitched by a single pair of hands.
            No assembly lines. No shortcuts. Just material, time, and craft.
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="section-title mb-10">Shop by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Totes', slug: 'totes',     img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=70' },
            { label: 'Crossbody', slug: 'crossbody', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=70' },
            { label: 'Backpacks', slug: 'backpacks', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=70' },
            { label: 'Clutches', slug: 'clutches',  img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=70' },
          ].map(({ label, slug, img }) => (
            <Link
              key={slug}
              to={`/shop?category=${slug}`}
              className="group relative overflow-hidden rounded aspect-square block"
            >
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-bark/30 group-hover:bg-bark/40 transition-colors duration-300" />
              <span className="absolute bottom-3 left-3 font-serif text-cream text-lg">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}