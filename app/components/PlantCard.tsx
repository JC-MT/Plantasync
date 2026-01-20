import type { Plant } from "~/components/types/SharedTypes.js";
import { Image } from "./Image";
import { Link, useLocation } from "react-router";

export function PlantCard({ plant }: { plant: Plant }) {
  const location = useLocation();

  return (
    <Link
      to={`${location.pathname}/${plant.id}`}
      className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 animate-slide-in-card delay-75"
      prefetch="intent"
      viewTransition
    >
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
      <div
        className="flex flex-col p-2 bg-white flex-grow"
        style={{
          viewTransitionName: `plant-title-${plant.id}`,
        }}
      >
        <h3 className="text-base/tight md:text-lg/tight font-semibold truncate">
          {plant.name}
        </h3>
        {plant.category && (
          <p className="text-xs/tight md:text-sm/tight">{plant.category}</p>
        )}
      </div>
    </Link>
  );
}
