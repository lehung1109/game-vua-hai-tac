import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/services/user/user.service";
import { executeGraphQL } from "@/app/lib/graphql/gqlFetch";
import { InsertUserDocument } from "@/__generated__/graphql";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Missing information" },
        { status: 400 }
      );
    }

    // check user email exits and user name exits
    const user = await getUserByEmail(email);

    if (user) {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save data to database
    await executeGraphQL(InsertUserDocument, {
      object: {
        email,
        username,
        password_hash: hashedPassword,
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ message: "Registry success" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
