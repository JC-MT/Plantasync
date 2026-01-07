const { VITE_JWT_SECRET } = import.meta.env;
import type { Route } from "./+types/account";
import type { User } from "~/components/types/SharedTypes";

import { getData } from "~/db/query";
import { jwtVerify } from "jose/jwt/verify";
import { accessCookie } from "../utils/auth";
import { SignUpForm } from "../components/Forms";
import PageContainer from "~/layout/PageContainer";

export function meta() {
  return [
    { title: "Plantasync — Register Page" },
    {
      name: "description",
      content: "Get started with Plantasync by creating your account.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const accessToken = await accessCookie.parse(cookieHeader);
  if (!accessToken) return { user: null };

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(VITE_JWT_SECRET)
    );

    if (!payload?.sub || !payload?.id) {
      throw new Error("Invalid token payload.");
    }

    const user = (await getData(
      `users?select=name,id,email&id=eq.${payload.id}`
    )) as User[];
    return { user: !user || user.length === 0 ? null : user[0] };
  } catch (error) {
    throw error;
  }
}

export default function Register({ loaderData }: { loaderData: User | null }) {
  return (
    <PageContainer>
      <SignUpForm />
    </PageContainer>
  );
}
