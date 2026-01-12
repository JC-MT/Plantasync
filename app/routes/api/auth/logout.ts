import { redirect } from "react-router";
import { deleteData } from "~/db/query";
import {
  accessCookie,
  refreshCookie,
  verifyAccessToken,
  verifyRefreshToken,
} from "~/server/auth";

export async function action({ request }: { request: Request }) {
  const cookies = request.headers.get("Cookie");
  try {
    const accessToken = await accessCookie.parse(cookies);

    if (!accessToken) throw new Error("Access could not be confirmed.");

    const payload = await verifyAccessToken(accessToken);
    const userID = payload?.id as string;

    if (!userID) throw new Error("Access could not be confirmed.");

    const refreshToken = await refreshCookie.parse(cookies);
    const session = await verifyRefreshToken(refreshToken);

    if (!session[0]) throw new Error("Unable to determine valid session.");

    await deleteData(`sessions?token_hash=eq.${session[0].token_hash}`);

    const res = redirect("/account");
    res.headers.append(
      "Set-Cookie",
      await refreshCookie.serialize("", {
        maxAge: 0,
      })
    );
    res.headers.append(
      "Set-Cookie",
      await accessCookie.serialize("", { maxAge: 0 })
    );

    return res;
  } catch (error) {
    throw error;
  }
}
