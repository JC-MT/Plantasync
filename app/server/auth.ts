const { VITE_JWT_SECRET } = import.meta.env;
import type { User } from "~/components/types/SharedTypes";
import { jwtVerify, SignJWT } from "jose";
import { createCookie } from "react-router";
import { postData, getData, deleteData } from "~/db/query";
import { sha256 } from "../../node_modules/@noble/hashes/sha2";
import {
  utf8ToBytes,
  bytesToHex,
  randomBytes,
} from "../../node_modules/@noble/hashes/utils";

function sha256Hex(input: string): string {
  const bytes = utf8ToBytes(input);
  const hash = sha256(bytes);
  return bytesToHex(hash);
}

export async function createRefreshToken(userId: string) {
  const refreshToken = bytesToHex(randomBytes(32));
  const hashRefreshToken = sha256Hex(refreshToken);

  try {
    await postData("sessions", {
      user_id: userId,
      token_hash: hashRefreshToken,
      expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    return refreshToken;
  } catch (error) {
    throw new Error("Error while creating refresh token: " + error);
  }
}

export async function createAccessToken(user: User) {
  const encodedSecret = new TextEncoder().encode(VITE_JWT_SECRET);
  try {
    return await new SignJWT({
      sub: user.name,
      id: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("20m")
      .sign(encodedSecret);
  } catch (error) {
    throw new Error("Error while creating access token: " + error);
  }
}

export async function verifyAccessToken(token: string) {
  const encodedSecret = new TextEncoder().encode(VITE_JWT_SECRET);
  const { payload } = await jwtVerify(token, encodedSecret);
  return payload;
}

export async function verifyRefreshToken(rawRefreshToken: string) {
  const hashedRefreshToken = sha256Hex(rawRefreshToken);
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

export async function authorizeRequest(request: Request) {
  const cookies = request.headers.get("Cookie");
  const accessToken = await accessCookie.parse(cookies);
  const refreshToken = await refreshCookie.parse(cookies);

  if (accessToken) {
    try {
      const payload = await verifyAccessToken(accessToken);
      if (payload?.id) {
        const [user]: User[] = await getData(
          `users?select=name,id,email&id=eq.${payload.id}`
        );

        return { user, accessToken, refreshToken };
      }
    } catch {
      // Ignore error and try to refresh the token
    }
  }

  if (!refreshToken) return { user: null, accessToken, refreshToken };

  await deleteData("sessions?expires_at=lt.now()");

  const [session] = await verifyRefreshToken(refreshToken);
  if (!session) return { user: null, accessToken, refreshToken };

  const [user]: User[] = await getData(
    `users?select=name,id,email&id=eq.${session.user_id}`
  );

  if (!user) return { user: null, accessToken, refreshToken };

  await deleteData(`sessions?token_hash=eq.${session.token_hash}`);

  const newAccess = await createAccessToken(user);
  const newRefresh = await createRefreshToken(user.id);

  return { user, accessToken: newAccess, refreshToken: newRefresh };
}
