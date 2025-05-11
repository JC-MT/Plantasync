import tempPlantData from "../../api/src/models/plants.js";
import PlantDetails from "~/components/PlantDetails.js";

export function meta({ data }) {
  return [
    { title: `Plantasync — ${data?.common[0] || "Plant"} details` },
    { name: "description", content: "This is the Explore Detail page" }
  ];
}

export async function loader({ params }) {
  const product = tempPlantData[params.id];
  return product;
}

export default function Detail({ loaderData }) {
  const plant = loaderData;

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-16 pb-5 sm:pt-5 text-dark-green">
      <PlantDetails plant={plant} />
    </section>
  );
}
