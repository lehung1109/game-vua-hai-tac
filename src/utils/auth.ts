import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
const issuer = process.env.JWT_ISSUER!;
const audience = process.env.JWT_AUDIENCE!;

export async function signJwt(
  payload: JWTPayload,
  exp: string | number = "1h"
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(exp)
    .sign(secretKey);
}

export async function verifyJwt<T = JWTPayload>(token: string) {
  const { payload } = await jwtVerify(token, secretKey, { issuer, audience });
  return payload as T;
}
