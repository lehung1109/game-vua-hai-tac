import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Clear the token cookie by setting it to empty and expired
  const res = NextResponse.json({ message: "Logout success" });

  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return res;
}
