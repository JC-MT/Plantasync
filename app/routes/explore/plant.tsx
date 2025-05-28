import PlantDetails from "~/components/PlantDetails.js";
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
    <section className="max-w-7xl mx-auto px-4 lg:px-16 pb-5 sm:pt-5 text-dark-green">
      <PlantDetails plant={loaderData} />
    </section>
  );
}
