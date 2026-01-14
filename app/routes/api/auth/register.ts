import { redirect } from "react-router";
import { postData } from "../../../db/query";
import type { User } from "../../../components/types/SharedTypes";
import { hashPassword } from "~/utils/helpers";
import {
  createRefreshToken,
  createAccessToken,
  accessCookie,
  refreshCookie
} from "~/server/auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  try {
    const hashResult = await hashPassword(`${formData.get("password")}`);
    if (!hashResult?.hash || !hashResult?.salt) {
      throw new Error("Error while hashing password.");
    }
    formData.delete("password");
    formData.append("password_hash", hashResult.hash);
    formData.append("password_salt", hashResult.salt);

    const user = (await postData("users", formData)) as User[];

    if (!user || user.length === 0) {
      throw new Error("An error occurred while creating a new user.");
    }

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
