import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function OrderConfirmPage() {
  const clearCart = useCartStore(s => s.clearCart);

  useEffect(() => {
    clearCart();
  }, []);

  const orderNumber = Math.random().toString(36).slice(2, 10).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">

      {/* Icon */}
      <div className="w-16 h-16 rounded-full border-2 border-earth-400 flex items-center justify-center mx-auto mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-earth-500" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Heading */}
      <p className="text-xs font-sans tracking-widest uppercase text-earth-400 mb-3">
        Order confirmed
      </p>
      <h1 className="font-serif text-4xl text-bark mb-4">
        Thank you.
      </h1>
      <p className="font-sans text-earth-600 leading-relaxed mb-2">
        Your order has been received and is being lovingly prepared.
        You'll get a confirmation email shortly.
      </p>
      <p className="font-sans text-xs text-earth-400 tracking-widest uppercase mb-12">
        Order #{orderNumber}
      </p>

      {/* Divider */}
      <div className="border-t border-earth-200 mb-12" />

      {/* What's next */}
      <div className="grid grid-cols-3 gap-6 mb-14 text-left">
        {[
          {
            step: '01',
            title: 'Confirmation',
            body: 'An email receipt is on its way to your inbox.',
          },
          {
            step: '02',
            title: 'Handcrafted',
            body: 'Your piece is cut and stitched to order. Allow 3–5 days.',
          },
          {
            step: '03',
            title: 'Delivered',
            body: 'Shipped in our signature kraft wrap. Track via email.',
          },
        ].map(({ step, title, body }) => (
          <div key={step}>
            <p className="font-sans text-xs text-earth-300 tracking-widest mb-2">{step}</p>
            <p className="font-serif text-bark text-base mb-1">{title}</p>
            <p className="font-sans text-xs text-earth-500 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        <Link to="/" className="btn-outline">Back to Home</Link>
      </div>

    </div>
  );
}