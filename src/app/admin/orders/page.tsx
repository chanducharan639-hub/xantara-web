'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
    _id: string;
    userEmail: string;
    paymentId: string;
    subtotal: number;
    shippingAddress: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        pinCode: string;
    };
    items: {
        name: string;
        qty: number;
        size: string;
        price: number;
    }[];
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch('/api/orders')
            .then((res) => res.json())
            .then((data) => {
                setOrders(data.orders || []);
            });
    }, []);

    return (
        <div className="min-h-screen p-10 bg-[#f8f8f6]">
            <h1 className="text-5xl font-serif mb-10">
                Orders Dashboard
            </h1>

            <div className="space-y-8">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white p-8 rounded-xl border"
                    >
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    {order.shippingAddress.fullName}
                                </h2>

                                <p>{order.userEmail}</p>

                                <p>{order.shippingAddress.phone}</p>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-xl">
                                    ₹{order.subtotal}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {order.paymentId}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">
                                Shipping Address
                            </h3>

                            <p>
                                {order.shippingAddress.addressLine1}
                            </p>

                            <p>
                                {order.shippingAddress.addressLine2}
                            </p>

                            <p>
                                {order.shippingAddress.city},{' '}
                                {order.shippingAddress.state}
                            </p>

                            <p>
                                {order.shippingAddress.pinCode}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">
                                Products
                            </h3>

                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between border-b pb-2"
                                    >
                                        <div>
                                            {item.name} ({item.size})
                                        </div>

                                        <div>
                                            {item.qty} × ₹{item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}