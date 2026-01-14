import { redirect } from "react-router";
import { verifyPassword } from "~/utils/helpers"
import { deleteData, getData } from "~/db/query";
import type { User } from "~/components/types/SharedTypes";
import {
  createRefreshToken,
  createAccessToken,
  accessCookie,
  refreshCookie,
} from "~/server/auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  try {
    const user = (await getData(
      `users?name=eq.${formData.get("name")}`
    )) as User[];

    if (!user[0]) throw new Error("Invalid credentials");

    const isPasswordValid = await verifyPassword(
      `${formData.get("password")}`,
      user[0].password_hash,
      user[0].password_salt
    );

    if (!isPasswordValid) throw new Error("Invalid credentials");

    await deleteData(`sessions?user_id=eq.${user[0].id}`);

    const accessToken = await createAccessToken(user[0]);
    const refreshToken = await createRefreshToken(user[0].id);

    const res = redirect("/account");

    res.headers.append("Set-Cookie", await accessCookie.serialize(accessToken));
    res.headers.append(
      "Set-Cookie",
      await refreshCookie.serialize(refreshToken)
    );

    return res;
  } catch (error) {
    throw error;
  }
}
