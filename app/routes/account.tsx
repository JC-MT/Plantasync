import { useFetcher } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/account";
import { Button } from "~/components/ui/button";
import { authorizeRequest } from "~/server/auth";
import PageContainer from "~/layout/PageContainer";
import type { User } from "~/components/types/SharedTypes";
import { SignUpForm, SignInForm } from "../components/Forms";

export function meta() {
  return [
    { title: "Plantasync — Account page" },
    {
      name: "description",
      content: "Get started with Plantasync by creating your account.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await authorizeRequest(request);
  return user;
}

export default function Register({ loaderData }: { loaderData: User | null }) {
  const fetcher = useFetcher();
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState<User | null>(loaderData);

  useEffect(() => {
    if (fetcher.data && fetcher.data.user) {
      setUser(fetcher.data.user);
    } else {
      setUser(loaderData);
    }
  }, [fetcher.data, loaderData]);

  const handleFormToggle = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <PageContainer>
      {user ? <h2>Welcome back, {user.name}!</h2> : null}
      {user ? (
        <p>You are already logged in.</p>
      ) : showSignIn ? (
        <SignInForm handleFormToggle={handleFormToggle} />
      ) : (
        <SignUpForm handleFormToggle={handleFormToggle} />
      )}

      {user ? (
        <fetcher.Form method="post" action="/api/logout">
          <Button type="submit">Log Out</Button>
        </fetcher.Form>
      ) : null}
    </PageContainer>
  );
}
