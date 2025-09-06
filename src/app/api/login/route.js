import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "../db/db.js";
import jwt from "jsonwebtoken";
import userschema from "../../model/user.model.js";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required." }, { status: 400 });
    }

    await connectDB();

    const user = await userschema.findOne({ email });
    if (!user || !user.password) {
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
    }
 const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" } // 7 din ke liye valid
    );
    const userInfo = user.toObject();
    delete userInfo.password;
      const res = NextResponse.json({
      success: true,
      user: { id: user._id, email: user.email, role: user.role, name: user.name },
    });
   res.cookies.set("token", token, {
      httpOnly: true,   // JS se access nahi hoga
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      path: "/", 
      maxAge: 60 * 60 * 24 * 7, // 7 din
    });
    return res
  } catch (error) {
    console.error("Login Server Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
