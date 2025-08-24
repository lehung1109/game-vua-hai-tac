import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/services/user/user.service";
import { executeGraphQL } from "@/app/lib/graphql/gqlFetch";
import { InsertUserDocument } from "@/__generated__/graphql";

export type RegisterInput = {
  email: string;
  username: string;
  password: string;
};
export type RegisterResponse = { message?: string; error?: string };

export async function POST(req: Request) {
  try {
    const { email, username, password } = (await req.json()) as RegisterInput;

    if (!email || !username || !password) {
      return NextResponse.json<RegisterResponse>(
        { error: "Missing information" },
        { status: 400 }
      );
    }

    // check user email exits and user name exits
    const user = await getUserByEmail(email);

    if (user) {
      return NextResponse.json<RegisterResponse>(
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

    return NextResponse.json<RegisterResponse>(
      { message: "Registry success" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json<RegisterResponse>(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
