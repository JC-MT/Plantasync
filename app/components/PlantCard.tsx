const { VITE_IMAGE_CDN_URL } = import.meta.env;
import { Image } from "./Image";
import { Link, useViewTransitionState, useLocation } from "react-router";

interface Plant {
  latin: string;
  origin: string;
  id: number;
  common: string[];
}

export function PlantCard({ plant }: { plant: Plant }) {
  const location = useLocation()
  const href = `${location.pathname}/${plant.id}`;
  const isTransitioning = useViewTransitionState(href);

  return (
    <Link
      to={href}
      className="flex flex-col rounded-lg overflow-hidden border border-zinc-200"
      prefetch="intent"
      viewTransition
    >
      <Image
        imageUrl={`${VITE_IMAGE_CDN_URL}default_plant_image.jpg?v=1746612628`}
        classNames="h-44 sm:h-48 md:h-52 lg:h-56 w-full object-cover bg-plant-card rounded-t-lg border-b border-zinc-200"
        loading={"lazy"}
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 45vw"
        alt="Stock plant image"
        isHero={false}
        width={1000}
        height={1000}
        viewTransition={isTransitioning ? plant.id : undefined}
      />
      <div className="flex flex-col gap-2 p-2 bg-white flex-grow">
        <h3
          style={{
            viewTransitionName: isTransitioning ? `plant-title-${plant.id}` : "none"
          }}
          className="text-xl/none font-semibold"
        >
          {plant.common[0]}
        </h3>
        <p className="text-base/none">{plant.origin}</p>
      </div>
    </Link>
  );
}
