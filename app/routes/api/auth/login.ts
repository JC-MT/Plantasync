import type { User } from "~/components/types/SharedTypes";
import type { Route } from "./+types/login";
import { verifyPassword } from "~/utils/helpers";
import { deleteData, getData } from "~/db/query";
import { redirect } from "react-router";
import {
  createRefreshToken,
  createAccessToken,
  accessCookie,
  refreshCookie,
} from "~/server/auth";

export async function action({ request }: Route.ActionArgs) {
  const data: { name: string; password: string } = await request.json();
  if (!data.name || !data.password) {
    return new Response("Missing required credentials", { status: 400 });
  }
  try {
    const [user]: User[] = await getData(`users?name=eq.${data.name}`);

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = verifyPassword(
      `${data.password}`,
      user.password_hash,
      user.password_salt,
    );

    if (!isPasswordValid) throw new Error("Invalid credentials");

    await deleteData(`sessions?user_id=eq.${user.id}`);

    const accessToken = await createAccessToken(user);
    const refreshToken = await createRefreshToken(user.id);

    const res = redirect("/account");

    res.headers.append("Set-Cookie", await accessCookie.serialize(accessToken));
    res.headers.append(
      "Set-Cookie",
      await refreshCookie.serialize(refreshToken),
    );

    return res;
  } catch (error) {
    throw error;
  }
}
