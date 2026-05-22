import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'all'
  );

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

  function handleCategory(cat) {
    setActiveCategory(cat);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Page header */}
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-earth-400 font-sans mb-2">
          Handmade collection
        </p>
        <h1 className="section-title text-4xl">All bags</h1>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-earth-200 pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`
              px-5 py-2 text-xs font-sans tracking-widest uppercase transition-colors duration-200
              ${activeCategory === cat
                ? 'bg-earth-700 text-cream'
                : 'border border-earth-300 text-earth-600 hover:border-earth-600 hover:text-bark'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="font-sans text-sm text-earth-400 mb-6">
        {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        {activeCategory !== 'all' && (
          <span className="ml-1">in <em>{activeCategory}</em></span>
        )}
      </p>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 reveal-item">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="font-serif text-2xl text-earth-300 mb-3">Nothing here yet.</p>
          <p className="font-sans text-sm text-earth-400">
            Try a different category.
          </p>
        </div>
      )}

    </div>
  );
}