import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const order = {
            ...body,

            orderId:
                'XAN-' +
                Math.floor(100000 + Math.random() * 900000),

            trackingId:
                'TRK-' +
                Math.floor(100000 + Math.random() * 900000),
        };

        return NextResponse.json({
            success: true,
            order,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Order failed',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        success: true,
        orders: [],
    });
}