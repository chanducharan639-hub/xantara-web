'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useStore } from '@/store/useStore';
import { ChevronLeft, Lock } from 'lucide-react';

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
}

const INITIAL_FORM: ShippingForm = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pinCode: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const [user] = useAuthState(auth);

  const {
    cart,
    clearCart,
    addOrder,
    removeFromCart,
  } = useStore();

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.qty || 1),
    0
  );
  const [form, setForm] = useState<ShippingForm>({
    ...INITIAL_FORM,
    email: user?.email || '',
    fullName: user?.displayName || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  if (!mounted) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const required: (keyof ShippingForm)[] = [
      'fullName', 'email', 'phone', 'addressLine1', 'city', 'state', 'pinCode'
    ];
    for (const field of required) {
      if (!form[field].trim()) {
        setError(`Please fill in: ${field.replace(/([A-Z])/g, ' $1')}`);
        return false;
      }
    }
    if (form.phone.length < 10) {
      setError('Enter a valid 10-digit phone number');
      return false;
    }
    if (form.pinCode.length !== 6) {
      setError('Enter a valid 6-digit PIN code');
      return false;
    }
    return true;
  };

  const handlePay = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!cart.length) {
      setError('Your cart is empty.');
      return;
    }
    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      /* ── Simulate payment (replace with Razorpay/Stripe in production) ── */
      const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      /* ── Save order to MongoDB ── */
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          orderId:
            'XAN-' + Math.floor(100000 + Math.random() * 900000),

          trackingId:
            'TRK-' + Math.floor(100000 + Math.random() * 900000),
          items: cart,
          subtotal: cartTotal,
          shippingAddress: {
            fullName: form.fullName,
            phone: form.phone,
            addressLine1: form.addressLine1,
            addressLine2: form.addressLine2,
            city: form.city,
            state: form.state,
            pinCode: form.pinCode,
          },
          paymentId,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Order failed');

      /* ── Update local store & clear cart ── */
      addOrder(data.order);
      clearCart();

      /* ── Redirect to dashboard orders tab ── */
      router.push('/login?tab=orders&success=1');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length && typeof window !== 'undefined') {
    return (
      <div className="checkout-empty">
        <p>Your cart is empty.</p>
        <button onClick={() => router.push('/collection')}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* ── Left: Form ── */}
      <div className="checkout-left">

        <button className="checkout-back" onClick={() => router.back()}>
          <ChevronLeft size={16} />
          Back
        </button>

        <h1 className="checkout-title">Checkout</h1>

        {/* Contact */}
        <section className="checkout-section">
          <h2>Contact Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Charan Kumar" />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit number" maxLength={10} />
          </div>
        </section>

        {/* Shipping */}
        <section className="checkout-section">
          <h2>Shipping Address</h2>
          <div className="form-group">
            <label>Address Line 1 *</label>
            <input name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="House / Flat No, Street" />
          </div>
          <div className="form-group">
            <label>Address Line 2</label>
            <input name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Landmark (optional)" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="Hyderabad" />
            </div>
            <div className="form-group">
              <label>State *</label>
              <select name="state" value={form.state} onChange={handleChange}>
                <option value="">Select State</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>PIN Code *</label>
              <input name="pinCode" value={form.pinCode} onChange={handleChange} placeholder="500001" maxLength={6} />
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="checkout-section">
          <h2>Payment</h2>
          <div className="payment-note">
            <Lock size={13} />
            <span>Secure encrypted payment. In production, this connects to Razorpay / Stripe.</span>
          </div>
          <div className="payment-mock">
            <div className="form-row">
              <div className="form-group">
                <label>Card Number</label>
                <input placeholder="4242 4242 4242 4242" maxLength={19} disabled />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry</label>
                <input placeholder="MM / YY" maxLength={7} disabled />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input placeholder="···" maxLength={3} disabled />
              </div>
            </div>
            <p className="mock-label">Demo mode — no real card needed</p>
          </div>
        </section>

        {error && <p className="checkout-error">{error}</p>}

        <button
          className="pay-btn"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? 'PROCESSING...' : `PAY ₹${cartTotal.toLocaleString('en-IN')}`}
        </button>
      </div>

      {/* ── Right: Order Summary ── */}
      <div className="checkout-right">
        <div className="summary-box">
          <h2 className="summary-title">ORDER SUMMARY</h2>

          <div className="summary-items">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="summary-item mb-8 pb-4 border-b"
              >
                <div className="summary-item-img-wrap">

                  <Image
                    src={
                      Array.isArray(item.images)
                        ? item.images[0]
                        : item.images || "/shirt.png"
                    }
                    alt={item.name}
                    width={64}
                    height={64}
                    className="summary-item-img"
                  />

                  <span className="summary-item-qty">
                    {item.qty || 1}
                  </span>

                </div>

                <div className="summary-item-info">

                  <h4>{item.name}</h4>

                  <p>
                    Size: {item.size ? item.size : 'Not Selected'}
                  </p>
                </div>
                <p>
                  Size: {item.size ? item.size : 'Not Selected'}
                </p>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 text-lg ml-2"
                >
                  remove
                </button>
                <p className="summary-item-price">
                  ₹
                  {(
                    item.price *
                    (item.qty || 1)
                  ).toLocaleString('en-IN')}
                </p>

              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">FREE</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row summary-total">
            <span>TOTAL</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 0;
          background: #faf9f7;
          padding-top: 100px;
        }
        .checkout-left {
          padding: 3rem 3rem 3rem 10%;
          max-width: 640px;
        }
        .checkout-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          color: #888;
          margin-bottom: 2rem;
          padding: 0;
          transition: color 0.2s;
        }
        .checkout-back:hover { color: #1a1a1a; }
        .checkout-title {
          font-family: 'Georgia', serif;
          font-size: 36px;
          font-weight: 400;
          margin-bottom: 2.5rem;
        }
        .checkout-section {
          margin-bottom: 2.5rem;
        }
        .checkout-section h2 {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          color: #1a1a1a;
        }
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 1rem;
        }
        .form-group label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #888;
          text-transform: uppercase;
        }
        .form-group input,
        .form-group select {
          height: 46px;
          padding: 0 14px;
          border: 1px solid #e0deda;
          border-radius: 8px;
          font-size: 14px;
          background: #fff;
          color: #1a1a1a;
          outline: none;
          transition: border 0.2s;
          width: 100%;
        }
        .form-group input:focus,
        .form-group select:focus {
          border-color: #1a1a1a;
        }
        .form-group input:disabled {
          background: #f5f5f2;
          color: #aaa;
          cursor: not-allowed;
        }
        .payment-note {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #f5f5f2;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 12px;
          color: #777;
          margin-bottom: 1.25rem;
        }
        .payment-mock {
          opacity: 0.7;
        }
        .mock-label {
          font-size: 11px;
          color: #aaa;
          margin-top: 8px;
          font-style: italic;
        }
        .checkout-error {
          background: #fff0f0;
          border: 1px solid #ffcccc;
          color: #d32f2f;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 1.25rem;
        }
        .pay-btn {
          width: 100%;
          height: 54px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 1rem;
        }
        .pay-btn:hover:not(:disabled) { background: #333; }
        .pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Summary */
        .checkout-right {
          background: #fff;
          border-left: 1px solid #ede9e4;
          padding: 3rem 2rem;
          min-height: 100vh;
        }
        .summary-box { position: sticky; top: 120px; }
        .summary-title {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.2em;
          margin-bottom: 2rem;
        }
        .summary-items { display: flex; flex-direction: column; gap: 1.25rem; }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .summary-item-img-wrap {
          position: relative;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
        }
        .summary-item-img {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 8px;
          background: #f7f7f5;
        }
        .summary-item-qty {
          position: absolute;
          top: -7px;
          right: -7px;
          background: #555;
          color: #fff;
          font-size: 11px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .summary-item-info { flex: 1; }
        .summary-item-name { font-size: 14px; font-weight: 500; }
        .summary-item-size { font-size: 12px; color: #999; margin-top: 2px; }
        .summary-item-price { font-size: 14px; font-family: 'Georgia', serif; }
        .summary-divider { height: 1px; background: #f0efec; margin: 1.25rem 0; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 0.75rem;
          color: #555;
        }
        .summary-row .free { color: #5f8057; font-weight: 500; }
        .summary-total {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: 0.08em;
        }
        .summary-total span:last-child { font-family: 'Georgia', serif; font-size: 20px; }
        .checkout-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 1rem;
        }
        .checkout-empty button {
          padding: 12px 28px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          letter-spacing: 0.1em;
        }
        @media (max-width: 900px) {
          .checkout-page { grid-template-columns: 1fr; }
          .checkout-left { padding: 2rem 1.5rem; max-width: 100%; }
          .checkout-right { border-left: none; border-top: 1px solid #ede9e4; min-height: auto; }
        }
      `}</style>
    </div>
  );
}

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry',
];



function clearCart() {
  throw new Error('Function not implemented.');
}

function addOrder(order: any) {
  throw new Error('Function not implemented.');
}

