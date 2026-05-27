import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    return Response.json({
      success: true,
      message: "MongoDB Connected 🚀",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}