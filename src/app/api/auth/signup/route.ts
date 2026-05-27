// src/app/api/auth/signup/route.js

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Connect Database
    await connectDB();

    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({
      success: true,
      message: "Signup successful 🚀",
      user,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}