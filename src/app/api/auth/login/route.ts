import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwt } from "@/utils/auth";
import { getUserByEmail } from "@/services/user/user.service";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email/password" },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email/password" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return NextResponse.json(
        { message: "Invalid email/password" },
        { status: 401 }
      );
    }

    // Sign JWT (only contains minimum information)
    const token = await signJwt(
      { sub: String(user.id), email: user.email },
      "1h"
    );

    // Set cookie HttpOnly
    const res = NextResponse.json({ message: "Login success" });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1h
    });
    return res;
  } catch (e) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
