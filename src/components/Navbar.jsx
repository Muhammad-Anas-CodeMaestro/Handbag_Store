import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const items = useCartStore(s => s.items);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const { pathname } = useLocation();

  return (
    <nav className="bg-cream border-b border-earth-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-xl text-bark tracking-wide hover:text-earth-600 transition-colors">
          Maison Terre
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/shop"
            className={`text-sm font-sans tracking-widest uppercase transition-colors ${
              pathname.startsWith('/shop') ? 'text-bark' : 'text-earth-500 hover:text-bark'
            }`}
          >
            Shop
          </Link>

          <Link to="/cart" className="relative text-earth-600 hover:text-bark transition-colors">
            {/* Cart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-label="Cart">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-earth-600 text-cream text-xs w-4 h-4 rounded-full flex items-center justify-center font-sans">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}