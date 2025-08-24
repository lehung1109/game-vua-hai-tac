// middleware.ts (verify JWT)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./utils/auth";

const PUBLIC_ONLY = ["/login", "/register"];
const AUTH_ONLY = ["/play-game"];

function pathMatches(pathname: string, list: string[]) {
  return list.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const payload = token && (await verifyJwt(token));
  const isAuth = !!payload;

  if (isAuth && pathMatches(pathname, PUBLIC_ONLY)) {
    return NextResponse.redirect(new URL("/play-game", req.url));
  }

  if (!isAuth && pathMatches(pathname, AUTH_ONLY)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/play-game"],
};
