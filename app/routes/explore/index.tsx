import { getData } from "~/db/query.js";
import { useEffect, useState } from "react";
import { Image } from "~/components/Image.js";
import { includesTerm } from "~/utils";
import { Filter } from "../../components/Filter";
import { useGardenData } from "~/hooks/useGardenData";
import PageContainer from "~/layout/PageContainer.js";
import { PlantCard } from "~/components/PlantCard.js";
import { gardenDataExists } from "~/cookies.server.js";
import { FILTERED_PLANT_INCREMENT } from "~/constants";
import { LoadMore } from "../../components/LoadMore";
import { redirect, useSearchParams } from "react-router";
import type {
  LoaderData,
  Plant,
  Search
} from "~/components/types/SharedTypes.js";

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
    throw new Response("Failed to get plants:", { status: 404 });
  }
  return { data: plants, catchedData: false };
}

export async function action({ request }: { request: Request }) {
  const cookieHeader = request.headers.get("Cookie");
  const existingCookie = await gardenDataExists.parse(cookieHeader);
  const bodyData = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  searchParams.set("limit", `${bodyData.get("limit")}`);
  const headers = new Headers();

  if (!existingCookie?.exists) {
    headers.append(
      "Set-Cookie",
      await gardenDataExists.serialize({
        exists: Number(bodyData.get("plantsExist")) > 0
      })
    );
  }
  return redirect(`/explore?${searchParams.toString()}`, { headers });
}

export default function Index({ loaderData }: { loaderData: LoaderData }) {
  const [searchParams] = useSearchParams();
  const [plants, setPlants] = useState<Plant[]>([]);
  const { allPlants } = useGardenData();
  const [search, setSearch] = useState<Search>({
    name: "",
    climate: "",
    ideal_light: ""
  });

  const matchesSearchTerm = (plant: Plant, search: Search) => {
    for (const key in search) {
      const value = search[key as keyof typeof search];
      const plantValue = plant[key as keyof Plant];
      if (value && !includesTerm(String(plantValue), value)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (loaderData?.catchedData) {
      setPlants(
        allPlants?.slice(
          0,
          Number(searchParams.get("limit") || FILTERED_PLANT_INCREMENT)
        )
      );
    } else {
      setPlants(loaderData.data || []);
    }
  }, [loaderData, allPlants]);

  useEffect(() => {
    setSearch({
      name: searchParams.get("name") || "",
      climate: searchParams.get("climate") || "",
      ideal_light: searchParams.get("ideal_light") || ""
    });
  }, [searchParams]);

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row mb-2 gap-1 md:gap-4 w-full md:items-center">
        <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight min-w-fit">
          All Plants
        </h1>
        <Filter search={search} setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {plants
          .filter((plant) => matchesSearchTerm(plant, search))
          .map((plant: Plant, idx: number) => (
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
      <LoadMore
        currentPlants={plants.length}
        filteredPlants={
          plants.filter((plant) => matchesSearchTerm(plant, search)).length
        }
        filterFunction={matchesSearchTerm}
        setSearch={setSearch}
        currentSearch={search}
      />
    </PageContainer>
  );
}
