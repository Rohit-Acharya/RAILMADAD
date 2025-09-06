import { NextResponse } from "next/server";
import connectDB from "../db/db.js";
// sirf ek model import karo
import bcrypt from "bcrypt";
import userschema from "../../models/user.model.js";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Signup Data:", data);

    await connectDB();

    // Check email exists
    const exists = await userschema.findOne({ email: data.email });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "Email already registered." },
        { status: 400 }
      );
    }

    // Password hash (only if provided)
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Role validation (default already 'user' hai schema me)
    // if (!["user", "admin"].includes(data.role)) {
    //   data.role = "user"; // fallback
    // }

    // Save user
    const userDoc = new userschema(data);
    const saved = await userDoc.save();
// console.log("User Schema Enum:", userschema.schema.path("role").enumValues);

    // Remove password before sending
    const userInfo = saved.toObject();
    delete userInfo.password;

    return NextResponse.json({ success: true, info: userInfo });
  } catch (error) {
    console.error("Signup Server Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
