import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/utils/auth";
import { LoginPayload } from "../auth/login/route";

export type MeResponse = { email?: string; message?: string };

export async function GET(req: Request) {
  const token = (await cookies()).get("token")?.value;

  if (!token)
    return NextResponse.json<MeResponse>(
      { message: "Not logged in" },
      { status: 401 }
    );

  try {
    const payload = await verifyJwt<LoginPayload>(token ?? "");
    const isAuth = !!payload;

    if (!isAuth) {
      return NextResponse.json<MeResponse>(
        { message: "Your login session has expired" },
        { status: 401 }
      );
    }

    // payload contains id, username, email ...
    return NextResponse.json<MeResponse>({
      email: payload.email,
    });
  } catch {
    return NextResponse.json(
      { message: "Your login session has expired" },
      { status: 401 }
    );
  }
}
