// src/app/api/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });

  // Clear JWT token cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  // Clear user info cookie (agar user ko bhi cookie me save kar rahe ho)
  res.cookies.set("user", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
