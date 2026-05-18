import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem);

  return (
    <article className="group bg-white border border-earth-100 rounded overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/shop/${product.slug}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={600}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4">
        <p className="text-xs text-earth-400 uppercase tracking-widest mb-1 font-sans">{product.color}</p>
        <h3 className="font-serif text-bark text-lg leading-tight mb-1">
          <Link to={`/shop/${product.slug}`} className="hover:text-earth-700 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-earth-600 text-sm font-sans mb-4">${product.price}</p>
        <button
          onClick={() => addItem(product)}
          className="btn-outline w-full text-xs py-2"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}