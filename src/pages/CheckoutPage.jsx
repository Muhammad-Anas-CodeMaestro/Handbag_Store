import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCartStore } from '../store/cartStore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontFamily: '"DM Sans", system-ui, sans-serif',
      fontSize: '14px',
      color: '#2c1f0e',
      letterSpacing: '0.02em',
      '::placeholder': { color: '#c49a6c' },
    },
    invalid: { color: '#b91c1c' },
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const items = useCartStore(s => s.items);
  const clearCart = useCartStore(s => s.clearCart);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= 120 ? 0 : 12;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        address: {
          line1: form.address,
          city: form.city,
          state: form.state,
          postal_code: form.zip,
          country: form.country,
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    /*
     * TODO: send paymentMethod.id + cart to your backend to create
     * a PaymentIntent and confirm it. For now we simulate success.
     *
     * Example backend call:
     *   const res = await fetch('/api/checkout', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify({ paymentMethodId: paymentMethod.id, items, total }),
     *   });
     *   const { clientSecret } = await res.json();
     *   await stripe.confirmCardPayment(clientSecret);
     */

    clearCart();
    navigate('/order/confirm');
  }

  const inputClass =
    'w-full border border-earth-300 bg-white px-4 py-2.5 font-sans text-sm text-bark placeholder-earth-300 focus:outline-none focus:border-earth-600 transition-colors';

  const labelClass = 'block font-sans text-xs uppercase tracking-widest text-earth-500 mb-1.5';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-[1fr_340px] gap-12">

        {/* Left — fields */}
        <div className="space-y-8">

          {/* Contact */}
          <section>
            <h2 className="font-serif text-xl text-bark mb-5">Contact</h2>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="font-serif text-xl text-bark mb-5">Shipping address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange}
                  placeholder="Jane" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange}
                  placeholder="Smith" required className={inputClass} />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Address</label>
                <input name="address" value={form.address} onChange={handleChange}
                  placeholder="123 Main St" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input name="city" value={form.city} onChange={handleChange}
                  placeholder="New York" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input name="state" value={form.state} onChange={handleChange}
                  placeholder="NY" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>ZIP code</label>
                <input name="zip" value={form.zip} onChange={handleChange}
                  placeholder="10001" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <select name="country" value={form.country} onChange={handleChange}
                  className={inputClass}>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-serif text-xl text-bark mb-5">Payment</h2>
            <div className="border border-earth-300 bg-white px-4 py-3">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            {error && (
              <p className="mt-2 font-sans text-xs text-red-600">{error}</p>
            )}
          </section>

        </div>

        {/* Right — order summary */}
        <div>
          <div className="bg-earth-50 border border-earth-200 p-6 sticky top-24">
            <h2 className="font-serif text-xl text-bark mb-6">Order Summary</h2>

            {/* Items */}
            <ul className="divide-y divide-earth-200 mb-6">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <img src={item.image} alt={item.name}
                    className="w-12 h-12 object-cover rounded shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs text-bark truncate">{item.name}</p>
                    <p className="font-sans text-xs text-earth-400">Qty {item.qty}</p>
                  </div>
                  <p className="font-sans text-xs text-bark shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            {/* Totals */}
            <div className="space-y-2 font-sans text-sm border-t border-earth-200 pt-4 mb-6">
              <div className="flex justify-between text-earth-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-earth-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? <span className="italic text-earth-500">Free</span>
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-bark font-medium pt-2 border-t border-earth-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className={`btn-primary w-full text-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing…' : `Pay $${total.toFixed(2)}`}
            </button>

            <p className="mt-4 font-sans text-xs text-earth-400 text-center">
              Secured by Stripe · SSL encrypted
            </p>
          </div>
        </div>

      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const items = useCartStore(s => s.items);
  const navigate = useNavigate();

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="section-title mb-10">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}