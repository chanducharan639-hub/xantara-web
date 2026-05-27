import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
    productId: string;
    name: string;
    image: string;
    size: string;
    qty: number;
    price: number;
}

export interface IOrder extends Document {
    userId: string;         // Firebase UID
    userEmail: string;
    items: IOrderItem[];
    subtotal: number;
    shippingAddress: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        pinCode: string;
    };
    paymentId: string;
    orderId: string;

    trackingId: string;     // Razorpay / Stripe payment ID
    paymentStatus: 'paid' | 'pending' | 'failed';
    orderStatus: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
    {
        userId: { type: String, required: true, index: true },
        userEmail: { type: String, required: true },
        items: { type: [OrderItemSchema], required: true },
        subtotal: { type: Number, required: true },
        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pinCode: { type: String, required: true },
        },
        paymentId: { type: String, required: true },

        orderId: { type: String, required: true },

        trackingId: { type: String, required: true },

        paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], default: 'paid' },
        orderStatus: {
            type: String,
            enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            default: 'processing',
        },
    },
    { timestamps: true }
);

const Order: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;