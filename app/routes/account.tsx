import { useState } from "react";
import { Button } from "~/components/ui/button";
import PageContainer from "~/layout/PageContainer";
import type { User } from "~/components/types/SharedTypes";
import { SignUpForm, SignInForm } from "../components/Forms";
import { useFetcher, useRouteLoaderData } from "react-router";

export function meta() {
  return [
    { title: "Plantasync — Account page" },
    {
      name: "description",
      content: "Get started with Plantasync by creating your account.",
    },
  ];
}

export default function Register() {
  const fetcher = useFetcher();
  const [showSignIn, setShowSignIn] = useState(false);
  const user: User | null | undefined = useRouteLoaderData("root");
  const handleFormToggle = () => setShowSignIn(!showSignIn);

  return (
    <PageContainer>
      {user ? (
        <div className="grid gap-4 max-w-2xl mx-auto md:mt-20 md:mb-36">
          <div className="grid gap-1">
            <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight">
              Account Preferences
            </h1>
            <p className="text-base md:text-xl">
              Manage your account profile and dashboard experience.
            </p>
          </div>
          <section className="grid space-y-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-bold text-2xl/none md:text-3xl/none">
              Profile Information
            </h2>
            {user.name && (
              <p className="gap-1 flex capitalize text-left text-sm/none md:text-base/none text-dark-green">
                <span className="font-semibold">Name:</span>{" "}
                <span>{user.name}</span>
              </p>
            )}
            {user.email && (
              <p className="gap-1 flex capitalize text-left text-sm/none md:text-base/none text-dark-green">
                <span className="font-semibold">Email:</span>{" "}
                <span>{user.email}</span>
              </p>
            )}

            <div className="flex gap-2">
              <fetcher.Form method="post" action="/api/logout">
                <Button type="submit">Log Out</Button>
              </fetcher.Form>
              <fetcher.Form method="post" action="/account">
                <Button type="submit">Save</Button>
              </fetcher.Form>
            </div>
          </section>
        </div>
      ) : showSignIn ? (
        <SignInForm handleFormToggle={handleFormToggle} />
      ) : (
        <SignUpForm handleFormToggle={handleFormToggle} />
      )}
    </PageContainer>
  );
}
