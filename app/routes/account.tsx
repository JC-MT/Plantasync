import type { User } from "~/components/types/SharedTypes";
import { useState } from "react";
import { hashPassword } from "~/utils/helpers";
import { Modal } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { authorizeRequest } from "~/server/auth";
import { InfoCard } from "../components/InfoCard";
import PageContainer from "~/layout/PageContainer";
import { deleteData, updateData } from "~/db/query";
import { redirect, useFetcher, useRouteLoaderData } from "react-router";
import { SignUpForm, SignInForm, UpdateAccountForm } from "../components/Forms";

export function meta() {
  return [
    { title: "Plantasync — Account page" },
    {
      name: "description",
      content: "Get started with Plantasync by creating your account.",
    },
  ];
}

export async function action({ request }: { request: Request }) {
  const data: {
    name: string;
    email?: string;
    password?: string;
    password_hash?: string;
    password_salt?: string;
  } = await request.json();

  const { user } = await authorizeRequest(request);

  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    if (request.method === "PATCH") {
      if (data.password) {
        const hashResult = hashPassword(`${data.password}`);
        if (!hashResult?.hash || !hashResult?.salt) {
          throw new Error("Error while hashing password.");
        }
        data.password_hash = hashResult.hash;
        data.password_salt = hashResult.salt;
      }

      delete data.password;

      await updateData(`users?id=eq.${user.id}`, data);
      return redirect("/account");
    } else if (request.method === "DELETE") {
      const deletedUser = await deleteData(`users?id=eq.${user.id}`);
      return redirect(`/${deletedUser.ok ? "" : "account"}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Register() {
  const fetcher = useFetcher();
  const [showSignIn, setShowSignIn] = useState(false);
  const user: User | null | undefined = useRouteLoaderData("root");
  const handleFormToggle = () => setShowSignIn(!showSignIn);

  return (
    <PageContainer>
      {user ? (
        <div className="grid gap-4 max-w-2xl mx-auto">
          <div className="grid gap-1">
            <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight">
              Settings
            </h1>
            <p className="text-base md:text-xl">
              Manage your account profile and dashboard experience.
            </p>
          </div>
          <InfoCard>
            <h2 className="font-bold text-2xl/none md:text-3xl/none mb-2">
              Profile Information
            </h2>
            <UpdateAccountForm user={user} />
          </InfoCard>
          <InfoCard>
            <fetcher.Form
              method="post"
              action="/api/logout"
              className="flex justify-between items-center gap-3"
            >
              <span className="text-sm/tight md:text-base/tight max-w-96 font-medium">
                This action will end your current session and require you to
                sign in again to continue.
              </span>
              <Button type="submit" className="font-semibold">
                Log Out
              </Button>
            </fetcher.Form>
          </InfoCard>
          <InfoCard>
            <fetcher.Form
              method="delete"
              action="/account"
              className="flex justify-between items-center gap-3"
            >
              <span className="text-sm/tight md:text-base/tight max-w-96 text-destructive font-medium">
                Deleting your account will permanently delete all your data. We
                do not keep backups of user data.
              </span>
              <Modal
                triggerButton={
                  <Button
                    type="button"
                    variant="destructive"
                    className="font-semibold"
                  >
                    Delete Account
                  </Button>
                }
                successButton={
                  <Button
                    type="submit"
                    variant="destructive"
                    className="font-semibold"
                    onClick={() =>
                      fetcher.submit(
                        {},
                        {
                          method: "DELETE",
                          action: "/account",
                          encType: "application/json",
                        },
                      )
                    }
                  >
                    Delete Account
                  </Button>
                }
                cancelButton={<Button variant="outline">Cancel</Button>}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your account from our servers."
              />
            </fetcher.Form>
          </InfoCard>
        </div>
      ) : showSignIn ? (
        <SignInForm handleFormToggle={handleFormToggle} />
      ) : (
        <SignUpForm handleFormToggle={handleFormToggle} />
      )}
    </PageContainer>
  );
}
