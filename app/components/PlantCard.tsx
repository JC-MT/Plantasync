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
      className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 starting:-translate-x-5 starting:opacity-0 delay-100 translate-x-0 opacity-100 transition-[opacity_transform]"
      prefetch="intent"
      viewTransition
    >
      {children}
      <div className="flex flex-col gap-1 p-2 bg-white flex-grow">
        <h3
          style={{
            viewTransitionName: isTransitioning
              ? `plant-title-${plant.id}`
              : "none"
          }}
          className="text-xl font-semibold truncate"
        >
          {plant.name}
        </h3>
        <p className="text-base/none">{plant.origin}</p>
      </div>
    </Link>
  );
}
