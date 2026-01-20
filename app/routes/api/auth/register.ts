import { redirect } from "react-router";
import { postData } from "../../../db/query";
import type { User } from "../../../components/types/SharedTypes";
import { hashPassword } from "~/utils/helpers";
import {
  createRefreshToken,
  createAccessToken,
  accessCookie,
  refreshCookie,
} from "~/server/auth";

export async function action({ request }: { request: Request }) {
  const data: {
    name: string;
    password?: string;
    password_hash: string;
    password_salt: string;
  } = await request.json();

  if (!data.name || !data.password) {
    return new Response("Missing required credentials", { status: 400 });
  }
  try {
    const hashResult = hashPassword(data.password);
    if (!hashResult?.hash || !hashResult?.salt) {
      throw new Error("Error while hashing password.");
    }

    delete data.password;
    data.password_hash = hashResult.hash;
    data.password_salt = hashResult.salt;

    const [user] = (await postData("users", data)) as User[];

    if (!user) {
      throw new Error("An error occurred while creating a new user.");
    }

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
