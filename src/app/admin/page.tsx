'use client';

import { useStore } from '@/store/useStore';
import Link from 'next/link';
export default function AdminDashboard() {
  const { orders } = useStore();

  const totalRevenue = orders.reduce(
    (acc: number, order: any) => acc + order.subtotal,
    0
  );

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>XANTARA ADMIN</h1>
        <p>Luxury Control Center</p>
      </div>
      <div className="mt-6 flex gap-4">

        <Link
          href="/admin/orders"
          className="
      bg-black
      text-white
      px-6
      py-3
      rounded-md
      tracking-widest
      text-sm
      hover:bg-neutral-800
      transition
    "
        >
          VIEW ORDERS
        </Link>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>Total Orders</h2>
          <span>{orders.length}</span>
        </div>

        <div className="stat-card">
          <h2>Total Revenue</h2>
          <span>₹{totalRevenue.toLocaleString('en-IN')}</span>
        </div>

        <div className="stat-card">
          <h2>Customers</h2>
          <span>{orders.length}</span>
        </div>

      </div>
      <div className="mt-16 max-w-2xl">
        <h2 className="text-3xl mb-8">Add Product</h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.target as any;

            const product = {
              id: Date.now(),

              name: form.name.value,

              price: Number(form.price.value),

              images: form.images.value
                .split(",")
                .map((img: string) => img.trim()),

              category: form.category.value,
            };



            const existing =
              JSON.parse(localStorage.getItem("products") || "[]");

            localStorage.setItem(
              "products",
              JSON.stringify([...existing, product])
            );

            alert("Product Added 🚀");
          }}
        >
          <input
            name="name"
            placeholder="Product Name"
            className="border p-4"
          />

          <input
            name="price"
            placeholder="Price"
            className="border p-4"
          />

          <input
            name="images"
            placeholder="/shirt1.png,/shirt2.png,/shirt3.png"
            className="border p-4"
          />

          <input
            name="category"
            placeholder="t-shirts"
            className="border p-4"
          />

          <button className="bg-black text-white py-4">
            Add Product
          </button>
        </form>
      </div>
      <div className="orders-section">
        <h2>Recent Orders</h2>

        {orders.length === 0 ? (
          <p className="empty">No orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order: any, index: number) => (
              <div className="order-card" key={index}>

                <div className="order-top">
                  <div>
                    <h3>Order #{index + 1}</h3>
                    <p>{order.userEmail}</p>
                  </div>

                  <div className="price">
                    ₹{order.subtotal?.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="items">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="item">
                      <span>{item.name}</span>
                      <span>Size: {item.size}</span>
                      <span>Qty: {item.qty}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          background: #f8f8f6;
          padding: 120px 40px 40px;
        }

        .admin-header h1 {
          font-size: 42px;
          font-family: Georgia, serif;
          margin-bottom: 10px;
        }

        .admin-header p {
          color: #777;
          margin-bottom: 40px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }

        .stat-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          border: 1px solid #eee;
        }

        .stat-card h2 {
          font-size: 14px;
          color: #777;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .stat-card span {
          font-size: 34px;
          font-weight: 600;
        }

        .orders-section h2 {
          margin-bottom: 20px;
          font-size: 28px;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .order-card {
          background: white;
          padding: 25px;
          border-radius: 18px;
          border: 1px solid #eee;
        }

        .order-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .order-top h3 {
          font-size: 20px;
          margin-bottom: 5px;
        }

        .order-top p {
          color: #777;
          font-size: 14px;
        }

        .price {
          font-size: 24px;
          font-weight: bold;
        }

        .items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .item {
          display: flex;
          justify-content: space-between;
          padding: 14px;
          background: #fafafa;
          border-radius: 10px;
          font-size: 14px;
        }

        .empty {
          color: #777;
        }
      `}</style>
    </div>
  );
}