import PlantDetails from "~/components/PlantDetails.js";
import PageContainer from "~/layout/PageContainer.js";
import { getData } from "../../db/query.js";

export async function loader({
  params
}: {
  params: Record<string, string | undefined>;
}) {
  const plant = await getData(`garden?id=eq.${params.id}`);
  if (!plant) {
    throw new Response("Failed to get plants:", { status: 500 });
  }
  return plant[0];
}

export function meta({ data }: { data: any }) {
  return [
    { title: `Plantasync — ${data?.name || "Plant"} details` },
    { name: "description", content: "This is the Detail page" }
  ];
}

export default function Detail({ loaderData }: { loaderData: any }) {
  return (
    <PageContainer>
      <PlantDetails plant={loaderData} />
    </PageContainer>
  );
}
