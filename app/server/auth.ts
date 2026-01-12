const { VITE_JWT_SECRET } = import.meta.env;
import type { User } from "~/components/types/SharedTypes";
import { jwtVerify, SignJWT } from "jose";
import { createCookie } from "react-router";
import { toBase64Url } from "../utils/helpers";
import { postData, getData, deleteData } from "~/db/query";

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

export async function authorizeRequest(request: Request) {
  const cookies = request.headers.get("Cookie");
  const accessToken = await accessCookie.parse(cookies);
  const refreshToken = await refreshCookie.parse(cookies);

  if (accessToken) {
    try {
      const payload = await verifyAccessToken(accessToken);
      if (payload?.id) {
        const user: User[] = await getData(
          `users?select=name,id,email&id=eq.${payload.id}`
        );

        return { user: user[0] ? user[0] : null, accessToken, refreshToken };
      }
    } catch {
      // Ignore error and try to refresh the token
    }
  }

  if (!refreshToken) return { user: null, accessToken, refreshToken };

  const session = await verifyRefreshToken(refreshToken);
  if (!session[0]) return { user: null, accessToken, refreshToken };

  const user: User[] = await getData(
    `users?select=name,id,email&id=eq.${session[0].user_id}`
  );

  if (!user[0]) return { user: null, accessToken, refreshToken };

  await deleteData(`sessions?token_hash=eq.${session[0].token_hash}`);

  const newAccess = await createAccessToken(user[0]);
  const newRefresh = await createRefreshToken(user[0].id);

  return { user: user[0], accessToken: newAccess, refreshToken: newRefresh };
}
