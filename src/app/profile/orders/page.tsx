'use client';

import { useStore } from '@/store/useStore';

export default function OrdersPage() {

    const orders =
        useStore((state) => state.orders) || [];

    return (
        <div className="min-h-screen pt-32 px-6 max-w-5xl mx-auto">

            <h1 className="text-5xl font-serif mb-12">
                Orders
            </h1>

            {orders.length === 0 ? (

                <p className="text-gray-500">
                    No orders found.
                </p>

            ) : (

                <div className="space-y-6">

                    {orders.map((order, idx) => (

                        <div
                            key={idx}
                            className="border p-6 rounded-2xl"
                        >

                            <div className="flex justify-between mb-4">

                                <div>
                                    <h2 className="text-xl">
                                        {order.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        Size: {order.size}
                                    </p>
                                </div>

                                <div className="text-right">

                                    <p className="font-medium">
                                        ₹{order.price}
                                    </p>

                                    <p className="text-green-600 text-sm uppercase">
                                        {order.status}
                                    </p>

                                </div>

                            </div>

                            {/* TRACKING BAR */}

                            <div className="mt-6">

                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                                    <div className="w-2/3 h-full bg-black" />

                                </div>

                                <div className="flex justify-between text-xs mt-2 text-gray-500">

                                    <span>Ordered</span>
                                    <span>Shipped</span>
                                    <span>Delivered</span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}