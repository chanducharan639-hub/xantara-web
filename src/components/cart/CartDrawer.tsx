'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
} from 'lucide-react';

import { useStore } from '@/store/useStore';

export default function CartDrawer() {

  const router = useRouter();

  const {
    cart,
    removeFromCart,
    updateQty,
    isCartOpen,
    setIsCartOpen,
  } = useStore();
  // CLOSE CART
  const closeCart = () => {
    useStore.setState({
      isCartOpen: false,
    });
  };

  // GET SAFE QTY
  const getQty = (item: any) => {
    return Number(
      item.qty ||
      item.quantity ||
      1
    );
  };

  // GET SAFE PRICE
  const getPrice = (item: any) => {
    return Number(item.price || 0);
  };

  // TOTAL
  const cartTotal = () => {
    return cart.reduce(
      (total, item: any) =>
        total +
        getPrice(item) *
        getQty(item),
      0
    );
  };

  // COUNT
  const cartCount = () => {
    return cart.reduce(
      (total, item: any) =>
        total + getQty(item),
      0
    );
  };

  // CHECKOUT
  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };


  return (
    <>
      {/* BACKDROP */}
      <div
        className={`cart-backdrop ${isCartOpen
          ? 'cart-backdrop--visible'
          : ''
          }`}
        onClick={closeCart}
      />

      {/* DRAWER */}
      <div
        className={`cart-drawer ${isCartOpen
          ? 'cart-drawer--open'
          : ''
          }`}
      >

        {/* HEADER */}
        <div className="cart-header">

          <h2 className="cart-title">
            YOUR CART

            {cartCount() > 0 && (
              <span className="cart-count">
                ({cartCount()})
              </span>
            )}
          </h2>

          <button
            className="cart-close"
            onClick={closeCart}
          >
            <X size={20} />
          </button>

        </div>

        {/* ITEMS */}
        <div className="cart-items">

          {cart.length === 0 ? (

            <div className="cart-empty">

              <ShoppingBag
                size={48}
                strokeWidth={1}
              />

              <p>Your cart is empty</p>

            </div>

          ) : (

            cart.map((item: any) => (

              <div
                key={`${item.id}-${item.size}`}
                className="cart-item"
              >

                {/* IMAGE */}
                <div className="cart-item-image">

                  <Image
                    src={
                      item.images?.[0] ||
                      item.image ||
                      '/shirt.png'
                    }
                    alt={item.name || item.title}
                    width={80}
                    height={100}
                    className="cart-item-img object-cover"
                  />

                </div>

                {/* DETAILS */}
                <div className="cart-item-details">

                  <div className="cart-item-top">

                    <div>

                      <h3 className="cart-item-name">
                        {item.name || item.title}
                      </h3>

                      <p className="cart-item-meta">
                        Size: {item.size}
                      </p>

                    </div>

                    <button
                      className="cart-item-delete"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size
                        )
                      }
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                  <div className="cart-item-bottom">

                    {/* QTY */}
                    <div className="cart-qty">
                      <button
                        onClick={() => {
                          if (item.qty > 1) {
                            updateQty(
                              item.id,
                              item.size,
                              item.qty - 1
                            );
                          }
                        }}
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          updateQty(
                            item.id,
                            item.size,
                            item.qty + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* PRICE */}
                    <p className="cart-item-price">
                      ₹
                      {(
                        getPrice(item) *
                        getQty(item)
                      ).toLocaleString('en-IN')}
                    </p>

                  </div>

                </div>

              </div>

            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (

          <div className="cart-footer">

            <div className="cart-subtotal">

              <span>SUBTOTAL</span>

              <span>
                ₹
                {cartTotal().toLocaleString(
                  'en-IN'
                )}
              </span>

            </div>

            <p className="cart-shipping-note">
              Shipping & taxes calculated at checkout
            </p>

            <button
              className="cart-checkout-btn"
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </button>

          </div>
        )}
      </div >

      <style jsx>{`
        .cart-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }

        .cart-backdrop--visible {
          opacity: 1;
          pointer-events: all;
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          height: 100vh;
          background: white;
          z-index: 999;
          transform: translateX(100%);
          transition: 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .cart-drawer--open {
          transform: translateX(0);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #eee;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .cart-item {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .cart-item-image {
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: 8px;
          background: #f5f5f5;
          flex-shrink: 0;
        }

        .cart-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
        }

        .cart-item-top {
          display: flex;
          justify-content: space-between;
        }

        .cart-item-name {
          font-size: 15px;
          font-weight: 500;
        }

        .cart-item-meta {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }

        .cart-item-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }

        .cart-qty {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #ddd;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .cart-qty button {
          border: none;
          background: none;
          cursor: pointer;
        }

        .cart-item-price {
          font-weight: 600;
        }

        .cart-footer {
          border-top: 1px solid #eee;
          padding: 24px;
        }

        .cart-subtotal {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .cart-checkout-btn {
          width: 100%;
          height: 52px;
          background: black;
          color: white;
          border: none;
          cursor: pointer;
          letter-spacing: 0.15em;
        }

        .cart-empty {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #999;
          gap: 16px;
        }
      `}</style>
    </>
  );
}