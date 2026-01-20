import type { Plant, User } from "~/components/types/SharedTypes.js";
import { useLoaderData, useRouteLoaderData } from "react-router";
import { getData } from "~/db/query.js";
import { PlantCard } from "~/components/PlantCard.js";
import PageContainer from "~/layout/PageContainer.js";
import { authorizeRequest } from "~/server/auth";

export function meta() {
  const user: User | null | undefined = useRouteLoaderData("root");
  return [
    { title: `Plantasync — ${user ? "Your" : "Demo"} Garden` },
    { name: "description", content: "This is the Index page" },
  ];
}

export async function loader({ request }: { request: Request }) {
  const { user } = await authorizeRequest(request);

  try {
    const plants = await getData(
      `garden?${user ? `user_id=eq.${user.id}` : "demo_plant=is.true"}`
    );

    return { plants, user };
  } catch (error) {
    throw error;
  }
}

export default function Index() {
  const { plants, user }: { plants: Plant[]; user: User | null } =
    useLoaderData();
  return (
    <PageContainer
      className={`${plants.length <= 4 ? "md:min-h-[515px]" : ""}`}
    >
      <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight mb-2 capitalize">
        {user ? `${user.name}'s` : "Demo"} Garden
      </h1>
      {plants.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {plants.map((plant: Plant, idx: number) => (
            <PlantCard key={idx} plant={plant} />
          ))}
        </div>
      ) : (
        <p className="text-base md:text-2xl text-center my-10 md:my-20 font-medium">
          Empty Garden → add your plants{" "}
          <a className="underline" href="/add">
            HERE
          </a>
        </p>
      )}
    </PageContainer>
  );
}
