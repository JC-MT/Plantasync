import { Link, useViewTransitionState, useLocation } from "react-router";

interface Plant {
  latin: string;
  origin: string;
  id: number;
  common: string[];
  name: string;
}

export function PlantCard({
  plant,
  children
}: {
  plant: Plant;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const href = `${location.pathname}/${plant.id}`;
  const isTransitioning = useViewTransitionState(href);

  return (
    <Link
      to={href}
      className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 animate-slide-in-card delay-75"
      prefetch="intent"
      viewTransition
    >
      {children}
      <div className="flex flex-col p-2 bg-white flex-grow">
        <h3
          style={{
            viewTransitionName: isTransitioning
              ? `plant-title-${plant.id}`
              : "none"
          }}
          className="text-base/tight md:text-lg/tight font-semibold truncate"
        >
          {plant.name}
        </h3>
        <p className="text-xs/tight md:text-sm/tight">{plant.origin}</p>
      </div>
    </Link>
  );
}
