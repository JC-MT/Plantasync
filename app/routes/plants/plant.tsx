import tempPlantData from "../../models/plants.js";
import PlantDetails from "~/components/PlantDetails.js";

export async function loader({ params }) {
  const product = tempPlantData[params.id];
  return product;
}

function meta({ data }) {
  return [
    { title: `Plantasync — ${data?.common[0] || "Plant"} details` },
    { name: "description", content: "This is the Detail page" }
  ];
}

export default function Detail({ loaderData }) {
  const plant = loaderData;

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-16 pb-5 sm:pt-5 text-dark-green">
      <PlantDetails plant={plant} />
    </section>
  );
}
