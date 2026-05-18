import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../data/products';
import { useCartStore } from '../store/cartStore';

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const addItem = useCartStore(s => s.addItem);
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-32 text-center">
        <p className="font-serif text-3xl text-earth-300 mb-4">Product not found.</p>
        <Link to="/shop" className="btn-outline">Back to shop</Link>
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem(product, qty);
    navigate('/cart');
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-earth-400 uppercase tracking-widest mb-10">
        <Link to="/shop" className="hover:text-bark transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-earth-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover rounded"
          />
          <span className="absolute top-4 left-4 bg-cream border border-earth-200 px-3 py-1 text-xs font-sans text-earth-500 uppercase tracking-widest">
            {product.color}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col">

          {/* Category badge */}
          <p className="text-xs font-sans tracking-widest uppercase text-earth-400 mb-3">
            {product.category}
          </p>

          <h1 className="font-serif text-4xl text-bark leading-tight mb-4">
            {product.name}
          </h1>

          <p className="font-sans text-2xl text-earth-700 mb-6">
            ${product.price}
          </p>

          <p className="font-sans text-earth-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Details list */}
          <ul className="border-t border-earth-200 pt-6 mb-8 space-y-2">
            {product.details.map(detail => (
              <li key={detail} className="flex items-start gap-3 font-sans text-sm text-earth-600">
                <span className="text-earth-400 mt-0.5">✦</span>
                {detail}
              </li>
            ))}
          </ul>

          {/* Qty + Add to cart */}
          <div className="flex items-center gap-4 mb-4">

            {/* Qty stepper */}
            <div className="flex items-center border border-earth-300">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-earth-500 hover:text-bark hover:bg-earth-50 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-4 py-2 font-sans text-sm text-bark border-x border-earth-300 min-w-[2.5rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-3 py-2 text-earth-500 hover:text-bark hover:bg-earth-50 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 text-sm font-sans tracking-widest uppercase transition-colors duration-200
                ${added
                  ? 'bg-earth-600 text-cream cursor-default'
                  : 'bg-earth-700 text-cream hover:bg-earth-800'
                }`}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>

          {/* Buy now */}
          <button
            onClick={handleBuyNow}
            className="btn-outline w-full mb-8"
          >
            Buy Now
          </button>

          {/* Shipping note */}
          <p className="font-sans text-xs text-earth-400 text-center tracking-wide">
            Free shipping on orders over $120 · 30-day returns
          </p>

        </div>
      </div>
    </div>
  );
}