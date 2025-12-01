import { useEffect } from "react";
import { useLocation } from "react-router";
import { Image } from "~/components/Image.js";
import { InfoCard } from "~/components/InfoCard.js";
import { PlantTasks } from "~/components/PlantTasks";
import PageContainer from "~/layout/PageContainer.js";
import { useGardenData } from "~/hooks/useGardenData.js";
import { PlantDetails } from "~/components/PlantDetails.js";
import { PlantHistory } from "~/components/PlantHistory.js";
import { getData, postData, updateData } from "~/db/query.js";
import type { Action, Plant } from "~/components/types/SharedTypes.js";

export function meta({
  data
}: {
  data: { plant: Plant; actions: { actions: Action[]; count: number } };
}) {
  return [
    { title: `Plantasync — ${data?.plant?.name || "Plant"} details` },
    { name: "description", content: "This is the Detail page" }
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const actionType = formData.get("type") as string;
  const plantId = formData.get("plant_id") as string;
  const actionKey = formData.get("key") as string;

  try {
    const action = await postData("actions", {
      plant_id: plantId,
      type: actionType
    });

    if (action[0]) {
      try {
        const plant = await updateData(`garden?id=eq.${plantId}`, {
          [actionKey]: new Date().toISOString()
        });

        return plant[0];
      } catch (error) {
        throw new Response("Failed to update plant:", {
          status: 500,
          statusText: String(error)
        });
      }
    }

    throw new Response("Action creation failed", { status: 500 });
  } catch (error) {
    throw new Response("Failed to add action:", {
      status: 500,
      statusText: String(error)
    });
  }
}

export async function loader({
  params,
  request
}: {
  params: { id: number };
  request: Request;
}) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const actionsPromise = getData(
    `actions?plant_id=eq.${params.id}${searchParams.get("filter") ? `&type=eq.${searchParams.get("filter")}` : ""}&limit=${page * 5}&offset=${page > 1 ? (page - 1) * 5 : 0}`,
    { estimatedCount: true }
  )
    .then((result) => {
      return { results: result.data, count: result.count };
    })
    .catch((error) => {
      console.error("Failed to get actions:", error);
      throw new Response("Failed to get actions:", { status: 500 });
    });

  const plantData = await getData(`garden?id=eq.${params.id}`);
  if (!plantData || !plantData[0]) {
    throw new Response("Failed to get plant:", { status: 500 });
  }

  return { plant: plantData[0], actions: actionsPromise };
}

export default function Detail({
  loaderData
}: {
  loaderData: {
    plant: Plant;
    actions: Promise<{ results: Action[]; count: number }>;
  };
}) {
  const { plant, actions } = loaderData;
  const location = useLocation();
  const { fetchGardenData } = useGardenData();

  useEffect(() => {
    if (location.state?._isRedirect) {
      fetchGardenData();
    }
  }, []);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 sm:grid-cols-[40%_auto] gap-2 sm:gap-5 md:gap-10 lg:gap-16">
        <Image
          imageUrl="default_plant_image.jpg?v=1746612628"
          classNames="w-full object-cover bg-plant-card border border-zinc-200 rounded-lg sticky top-20"
          loading="eager"
          sizes="(min-width: 768px) 42vw, 100vw"
          alt="Stock plant image"
          isHero={true}
          width={1000}
          height={1000}
          viewTransition={plant.id}
        />
        <div className="grid gap-4">
          <div className="tracking-tight text-balance">
            <h1
              className="text-3xl/none md:text-5xl font-bold"
              style={{
                viewTransitionName: `plant-title-${plant.id}`
              }}
            >
              {plant.name}
            </h1>
            <p className="text-base font-medium">{plant.category}</p>
          </div>
          <InfoCard>
            <PlantTasks plant={plant} />
          </InfoCard>
          <InfoCard>
            <PlantDetails plant={plant} />
          </InfoCard>
          <InfoCard>
            <PlantHistory actions={actions} />
          </InfoCard>
        </div>
      </div>
    </PageContainer>
  );
}
