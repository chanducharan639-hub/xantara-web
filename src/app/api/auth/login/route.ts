import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid password' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        return NextResponse.json({
            message: 'Login successful',
            token,
            user,
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: 'Server Error' },
            { status: 500 }
        );
    }
}