import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const items = useCartStore(s => s.items);
  const updateQty = useCartStore(s => s.updateQty);
  const removeItem = useCartStore(s => s.removeItem);
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 120 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-32 text-center">
        <p className="font-serif text-3xl text-earth-300 mb-4">Your cart is empty.</p>
        <p className="font-sans text-sm text-earth-400 mb-8">
          Nothing here yet — go find something beautiful.
        </p>
        <Link to="/shop" className="btn-primary">Shop the Collection</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <h1 className="section-title mb-10">Your Cart</h1>

      <div className="grid md:grid-cols-[1fr_340px] gap-12">

        {/* Cart items */}
        <div className="divide-y divide-earth-200">
          {items.map(item => (
            <div key={item.id} className="flex gap-5 py-6">

              {/* Thumbnail */}
              <Link to={`/shop/${item.slug}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
              </Link>

              {/* Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-sans tracking-widest uppercase text-earth-400 mb-1">
                      {item.color}
                    </p>
                    <Link
                      to={`/shop/${item.slug}`}
                      className="font-serif text-bark text-lg leading-tight hover:text-earth-700 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <p className="font-sans text-bark text-sm shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">

                  {/* Qty stepper */}
                  <div className="flex items-center border border-earth-300">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-1.5 text-earth-500 hover:text-bark hover:bg-earth-50 transition-colors text-sm"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 font-sans text-sm text-bark border-x border-earth-300 min-w-[2rem] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-1.5 text-earth-500 hover:text-bark hover:bg-earth-50 transition-colors text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-sans text-xs text-earth-400 uppercase tracking-widest hover:text-earth-700 transition-colors"
                  >
                    Remove
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-earth-50 border border-earth-200 p-6 h-fit">
          <h2 className="font-serif text-xl text-bark mb-6">Order Summary</h2>

          <div className="space-y-3 font-sans text-sm mb-6">
            <div className="flex justify-between text-earth-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-earth-600">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? <span className="text-earth-500 italic">Free</span>
                  : `$${shipping.toFixed(2)}`
                }
              </span>
            </div>
            {subtotal > 0 && subtotal < 120 && (
              <p className="text-xs text-earth-400 italic">
                Add ${(120 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="border-t border-earth-200 pt-3 flex justify-between font-sans text-bark font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn-primary w-full text-center mb-3"
          >
            Proceed to Checkout
          </button>
          <Link
            to="/shop"
            className="block text-center font-sans text-xs text-earth-400 uppercase tracking-widest hover:text-bark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}