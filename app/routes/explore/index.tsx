import { PlantCard } from "~/components/PlantCard.js";
import { getData } from "~/db/query.js";
import { Pagination } from "../../components/Pagination";
import { Image } from "~/components/Image.js";
import { gardenDataExists } from "~/cookies.server.js";
import type { Route } from "../+types/home";
import { redirect, useSearchParams } from "react-router";
import { useLocalStorage } from "~/hooks/useLocalStorage.js";
import { Filter } from "../../components/Filter";
import { useState } from "react";

type LoaderData = {
  catchedData?: {
    data: any[];
  };
};

export function meta() {
  return [
    { title: "Plantasync — Discover new plants" },
    { name: "description", content: "This is the Explore Index page" }
  ];
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const cookieHeader = request.headers.get("Cookie");
  const catchedData = (await gardenDataExists.parse(cookieHeader)) || {};

  if (catchedData?.exists) {
    return { catchedData: true };
  }

  const plants = await getData(
    `garden?select=*&limit=${url.searchParams.get("limit") || "10"}`
  );
  if (!plants) {
    throw new Response("Failed to get plants:", { status: 500 });
  }
  return plants;
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const existingCookie = await gardenDataExists.parse(cookieHeader);
  const bodyData = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  searchParams.set("limit", `${bodyData.get("limit")}`);

  const headers = new Headers();

  if (!existingCookie) {
    headers.append(
      "Set-Cookie",
      await gardenDataExists.serialize({
        exists: Number(bodyData.get("plantsExist")) > 0,
        timestamp: new Date()
      })
    );
  }
  return redirect(`/explore?${searchParams.toString()}`, { headers });
}

export default function Index({ loaderData }: { loaderData: LoaderData }) {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return {
      name: searchParams.get("name") || "",
      climate: searchParams.get("climate") || "",
      light: searchParams.get("light") || ""
    };
  });

  const renderFilteredList = (item: {
    category: string;
    ideal_light: string;
    name: string;
  }) => {
    if (!search.name && !search.climate && !search.light) return true;

    const nameSearchTerm = search.name.toLowerCase();
    const climateSearchTerm = search.climate.toLowerCase();
    const lightSearchTerm = search.light.toLowerCase();
    const { category, ideal_light, name } = item;

    if (nameSearchTerm && !name.toLowerCase().includes(nameSearchTerm)) {
      return false;
    }
    if (
      climateSearchTerm &&
      !category.toLowerCase().includes(climateSearchTerm)
    ) {
      return false;
    }
    if (
      lightSearchTerm &&
      !ideal_light.toLowerCase().includes(lightSearchTerm)
    ) {
      return false;
    }

    return true;
  };

  if (loaderData?.catchedData) {
    const { value } = useLocalStorage("gardenData", {});
    loaderData = value?.data.slice(
      0,
      searchParams.get("limit") || value?.data.length
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-16 py-5 text-dark-green">
      <div className="flex flex-col sm:flex-row sm:items-center mb-2 gap-1 sm:gap-4">
        <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight">
          All Plants
        </h1>
        <Filter search={search} setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {loaderData
          ? loaderData.filter(renderFilteredList).map((plant, idx: number) => (
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
            ))
          : null}
      </div>
      <Pagination
        renderedPlants={loaderData}
        renderFilteredList={renderFilteredList}
        setSearch={setSearch}
      />
    </section>
  );
}
