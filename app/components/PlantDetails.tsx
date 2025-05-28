const { VITE_IMAGE_CDN_URL } = import.meta.env;
import { Image } from "./Image";
import { Link } from "react-router";
import PlantHistory from "~/components/PlantHistory";

export default function PlantDetails({ plant }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[40%_auto] gap-2 sm:gap-10 md:gap-16">
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
      <div className="grid grid-cols-1 gap-4">
        <div className="tracking-tight text-balance">
          <h1
            className="text-3xl/none md:text-5xl font-bold"
            style={{
              viewTransitionName: `plant-title-${plant.id}`
            }}
          >
            {plant.name}
          </h1>
          <p className="text-base font-medium">{plant.latin}</p>
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-md border border-zinc-200 bg-white">
          <h2 className="font-bold text-3xl/none md:text-4xl/none mb-1">
            Action Items
          </h2>
          <h3 className="pb-1 font-bold text-xl/none md:text-2xl/none border-b border-zinc-200">
            Today
          </h3>
          <ul className="flex flex-col gap-1">
            <li className="text-left text-base/none font-semibold text-dark-green">
              Water Plant
            </li>
            <li className="text-left text-base/none font-semibold text-dark-green">
              Rotate Vase
            </li>
          </ul>
          <h3 className="pb-1 font-bold text-xl/none md:text-2xl/none border-b border-zinc-200">
            Upcoming
          </h3>

          <ul className="flex flex-col gap-1">
            <li className="text-left text-base/none font-semibold text-dark-green">
              Water 3 days
            </li>
            <li className="text-left text-base/none font-semibold text-dark-green">
              Rotate vase 3 days
            </li>
          </ul>
          <div className="flex flex-wrap w-full text-center gap-1 mt-3">
            <button
              type="button"
              className="flex items-center justify-center gap-1 border border-zinc-200 bg-dark-green/5 hover:bg-dark-green hover:text-light-green px-4 py-1 font-medium text-sm lg:text-base rounded-full hover:cursor-pointer"
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
              className="flex items-center border border-zinc-200 justify-center gap-1 bg-dark-green/5 hover:bg-dark-green hover:text-light-green px-4 py-1 font-medium text-sm lg:text-base rounded-full hover:cursor-pointer"
            >
              <span>Add Plant</span>
              <img
                alt="plant"
                className="inline size-5 object-cover"
                src={`${VITE_IMAGE_CDN_URL}plantasynclogo.png?v=1746559703&width=50`}
              />
            </button>
            <Link
              to={-1}
              className="bg-dark-green/5 hover:bg-dark-green border border-zinc-200 hover:text-light-green px-4 py-1 font-medium text-sm lg:text-base rounded-full"
              viewTransition
            >
              Go Back
            </Link>
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-md border border-zinc-200 bg-white">
          <h2 className="font-bold text-3xl/none md:text-4xl/none">
            Plant Information
          </h2>
          <p
            className={`${
              !plant.last_water || plant.needsWater ? "text-red-400" : ""
            }`}
          >
            <strong>Last Watered: </strong>
            Unkhown
          </p>
          <p>
            <strong>Category:</strong> {plant.category}
          </p>
          <p>
            <strong>Origin:</strong> {plant.origin}
          </p>
          <p>
            <strong>Ideal Light:</strong> {plant.ideallight}
          </p>
          <p>
            <strong>Water Tips:</strong> {plant.watering}
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
