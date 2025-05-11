const { VITE_IMAGE_CDN_URL } = import.meta.env;
import { Image } from "./Image";import { Link } from "react-router";
import PlantHistory from "~/components/PlantHistory";

export default function PlantDetails({ plant }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[40%_auto] gap-2 sm:gap-10 md:gap-16">
      <Image
        imageUrl={`${VITE_IMAGE_CDN_URL}default_plant_image.jpg?v=1746612628`}
        classNames="w-full object-cover bg-plant-card border border-zinc-200 rounded-lg sticky top-20"
        loading="eager"
        sizes="(min-width: 768px) 42vw, 100vw"
        alt="Stock plant image"
        isHero={true}
        width={1000}
        height={1000}
        viewTransition={plant.id}
      />
      <div className="grid grid-cols-1 gap-3">
        <div className="tracking-tight text-balance">
          <h1
            className="text-3xl/none md:text-5xl font-bold"
            style={{
              viewTransitionName: `plant-title-${plant.id}`
            }}
          >
            {plant.common[0]}
          </h1>
          <p className="text-base font-medium">{plant.latin}</p>
        </div>
        <div className="flex flex-col p-3 rounded-md border border-zinc-200 shadow-xs">
          <h2 className="font-bold text-3xl/none md:text-4xl/none mb-1">
            Todo
          </h2>
          <h3 className="pb-1 font-bold text-xl/none md:text-2xl/none border-b border-zinc-200">
            Today
          </h3>
          <h3 className="pb-1 font-bold text-xl/none md:text-2xl/none border-b border-zinc-200">
            Upcoming
          </h3>
          <div className="flex flex-wrap w-full text-center gap-1">
            <button
              type="button"
              className="flex items-center justify-center gap-1 bg-dark-green/5 hover:bg-dark-green hover:text-light-green px-4 py-1 font-medium text-sm lg:text-base rounded-full hover:cursor-pointer"
            >
              <span>Water Plant</span>
              <img
                alt="water icon"
                className="object-cover size-5"
                src="https://cdn-icons-png.flaticon.com/512/2514/2514435.png"
              ></img>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-1 bg-dark-green/5 hover:bg-dark-green hover:text-light-green px-4 py-1 font-medium text-sm lg:text-base rounded-full hover:cursor-pointer"
            >
              <span>Add Plant</span>
              <img
                alt="plant"
                className="inline size-5 object-cover"
                src={`${VITE_IMAGE_CDN_URL}plantasynclogo.png?v=1746559703&width=50`}
              />
            </button>
            <Link
              className="bg-dark-green/5 hover:bg-dark-green hover:text-light-green px-4 py-1 font-medium text-sm lg:text-base rounded-full"
              to="/plants"
              viewTransition
            >
              Go Back
            </Link>
          </div>
        </div>
        <div className="flex flex-col p-3 rounded-md border border-zinc-200 shadow-xs">
          <h2 className="font-bold text-3xl/none md:text-4xl/none">
            Care info
          </h2>
          <p
            className={`${
              !plant.last_water || plant.needsWater
                ? "animate-[pulse_1s_ease-in-out_infinite] text-red-400"
                : ""
            }`}
          >
            <strong>Last Watered:</strong>
            Has never been watered. Please edit the date or press the water
            plant button to water today.
          </p>
          <p>
            <strong>Category:</strong> {plant.category}
          </p>
          <p>
            <strong>Origin:</strong> {plant.origin}
          </p>
          <p>
            <strong>Ideal Light:</strong> {plant.ideal_light}
          </p>
          <p>
            <strong>Water Tips:</strong> {plant.ideal_watering}
          </p>
        </div>
        <PlantHistory
          actions={[
            { action: "Created" },
            { action: "Watered" },
            { action: "Updated" },
            { action: "Skipped" }
          ]}
        />
      </div>
    </div>
  );
}
