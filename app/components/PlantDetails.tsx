import type { Plant } from "~/components/types/SharedTypes.js";
import { formatDateToInputValue } from "~/utils";

export function PlantDetails({ plant }: { plant: Plant }) {
  return (
    <div className="grid gap-2">
      <h2 className="font-bold text-2xl/none md:text-3xl/none">Information</h2>
      <div className="grid grid-cols-2 gap-2">
        {plant.category && (
          <p className="capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Category:</span> {plant.category}
          </p>
        )}
        {plant.origin && (
          <p className="capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Origin:</span> {plant.origin}
          </p>
        )}
        {plant.last_water && (
          <p className="capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Last Watered:</span>{" "}
            {formatDateToInputValue(new Date(plant.last_water))}
          </p>
        )}
      </div>
    </div>
  );
}
