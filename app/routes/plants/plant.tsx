import { SquarePen } from "lucide-react";
import { useLocation, redirect } from "react-router";
import { useEffect, useState } from "react";
import { Image } from "~/components/Image.js";
import { Toggle } from "~/components/ui/toggle";
import { EditForm } from "../../components/Forms";
import { InfoCard } from "~/components/InfoCard.js";
import { PlantTasks } from "~/components/PlantTasks";
import PageContainer from "~/layout/PageContainer.js";
import { useGardenData } from "~/hooks/useGardenData.js";
import { PlantDetails } from "~/components/PlantDetails.js";
import { PlantHistory } from "~/components/PlantHistory.js";
import { getData, postData, updateData, deleteData } from "~/db/query.js";
import type { Action, Plant } from "~/components/types/SharedTypes.js";
import type { Route } from "./+types/plant";

export function meta({
  data,
}: {
  data: { plant: Plant; actions: { actions: Action[]; count: number } };
}) {
  return [
    { title: `Plantasync — ${data?.plant?.name || "Plant"} details` },
    { name: "description", content: "This is the Detail page" },
  ];
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  try {
    if (request.method === "DELETE" && params?.id) {
      await deleteData(`garden?id=eq.${params.id}`);
      return redirect("/plants");
    }

    if (formData.get("is_action") && params?.id) {
      const actionType = formData.get("type") as string;
      const action = await postData("actions", {
        plant_id: params.id,
        type: actionType,
      });
      if (!action.length) {
        throw new Response("Action creation failed", { status: 500 });
      }
      formData.delete("type");
      formData.delete("is_action");
    }

    try {
      if (!params?.id) {
        throw Error("Failed to update plant: Missing plant ID");
      }

      const plant = await updateData(`garden?id=eq.${params.id}`, formData);
      return plant;
    } catch (error) {
      throw new Response("Failed to update plant:", {
        status: 500,
        statusText: String(error),
      });
    }
  } catch (error) {
    throw new Response("Failed to add action or update plant:", {
      status: 500,
      statusText: String(error),
    });
  }
}

export async function loader({
  params,
  request,
}: {
  params: { id: number };
  request: Request;
}) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const actionsPromise = getData(
    `actions?plant_id=eq.${params.id}${searchParams.get("filter") ? `&type=eq.${searchParams.get("filter")}` : ""}&limit=5&offset=${page > 1 ? (page - 1) * 5 : 0}`,
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
  loaderData,
}: {
  loaderData: {
    plant: Plant;
    actions: Promise<{ results: Action[]; count: number }>;
  };
}) {
  const { plant, actions } = loaderData;
  const location = useLocation();
  const { fetchGardenData } = useGardenData();
  const [editingActive, setEditingActive] = useState(false);

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
        <div className="grid gap-4 h-fit">
          <div className="tracking-tight text-balance grid gap-1">
            <div className="flex justify-between items-center">
              <h1
                className="text-3xl/none md:text-5xl font-bold"
                style={{
                  viewTransitionName: `plant-title-${plant.id}`,
                }}
              >
                {plant.name}
              </h1>
              <Toggle
                variant="outline"
                size="sm"
                pressed={editingActive}
                onPressedChange={setEditingActive}
              >
                <SquarePen />
                <span className="sr-only">Edit your plant</span>
              </Toggle>
            </div>
            <p className="text-base font-medium">{plant.category}</p>
          </div>
          {!editingActive ? (
            <>
              <InfoCard>
                <PlantTasks plant={plant} />
              </InfoCard>
              <InfoCard>
                <PlantDetails plant={plant} />
              </InfoCard>
              <InfoCard>
                <PlantHistory actions={actions} />
              </InfoCard>
            </>
          ) : (
            <EditForm plant={plant} />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
