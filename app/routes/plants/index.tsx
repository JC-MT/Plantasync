import type { Plant, User } from "~/components/types/SharedTypes.js";
import { useLoaderData, useRouteLoaderData } from "react-router";
import { getData } from "~/db/query.js";
import { PlantCard } from "~/components/PlantCard.js";
import { Image } from "~/components/Image.js";
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
  const { plants, user } = useLoaderData();
  return (
    <PageContainer>
      <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight mb-2 capitalize">
        {user ? `${user.name}` : "Demo"} Garden
      </h1>
      {plants.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {plants.map((plant: Plant, idx: number) => (
            <PlantCard key={idx} plant={plant}>
              <Image
                imageUrl="default_plant_image.jpg?v=1746612628"
                classNames="h-44 sm:h-48 md:h-52 lg:h-56 w-full object-cover bg-plant-card rounded-t-lg border-b border-zinc-200"
                loading={"lazy"}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 45vw"
                alt="Stock plant image"
                isHero={false}
                width={1000}
                height={1000}
                viewTransition={plant.id}
              />
            </PlantCard>
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
