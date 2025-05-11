import { PlantCard } from "~/components/PlantCard.js";
import tempPlantData from "../../models/plants.js";

export function meta() {
  return [
    { title: "Plantasync — Demo Garden" },
    { name: "description", content: "This is the Index page" }
  ];
}

export default function Index() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-16 py-5 text-dark-green">
      <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight mb-2">
        My Plants
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {tempPlantData.map((plant) => (
          <PlantCard plant={plant} />
        ))}
      </div>
    </section>
  );
}
