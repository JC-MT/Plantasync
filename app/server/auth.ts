const { VITE_JWT_SECRET } = import.meta.env;
import type { User } from "~/components/types/SharedTypes";
import { jwtVerify, SignJWT } from "jose";
import { postData, getData } from "~/db/query";
import { createCookie } from "react-router";
import { toBase64Url } from "../utils/helpers";

export async function createRefreshToken(userId: string) {
  const refreshToken = crypto.randomUUID() + crypto.randomUUID();
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(refreshToken)
  );
  const hashBase64 = toBase64Url(buffer);
  try {
    await postData("sessions", {
      user_id: userId,
      token_hash: hashBase64,
      expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    return refreshToken;
  } catch (error) {
    throw new Error("Error while creating refresh token: " + error);
  }
}

export async function createAccessToken(user: User) {
  try {
    return await new SignJWT({
      sub: user.name,
      id: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("20m")
      .sign(new TextEncoder().encode(VITE_JWT_SECRET));
  } catch (error) {
    throw new Error("Error while creating access token: " + error);
  }
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(VITE_JWT_SECRET)
  );
  return payload;
}

export async function verifyRefreshToken(rawRefreshToken: string) {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(rawRefreshToken)
  );
  const hashedRefreshToken = toBase64Url(buffer);

  return await getData(`sessions?token_hash=eq.${hashedRefreshToken}`);
}

export const accessCookie = createCookie("access", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: 20 * 60,
});

export const refreshCookie = createCookie("refresh", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: 14 * 24 * 60 * 60,
});
