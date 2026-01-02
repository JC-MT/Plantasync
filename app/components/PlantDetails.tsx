import type { Plant } from "~/components/types/SharedTypes.js";
import { formatDateToInputValue } from "~/utils";
import { CustomSchedule } from "./CustomSchedule";

export function PlantDetails({ plant }: { plant: Plant }) {
  return (
    <div className="grid gap-3">
      <h2 className="font-bold text-2xl/none md:text-3xl/none">Information</h2>
      <div className="grid grid-cols-2 gap-2">
        {plant.health && (
          <p className="gap-1 flex flex-col md:flex-row capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Status:</span>{" "}
            <span>{plant.health}</span>
          </p>
        )}
        {plant.origin && (
          <p className="gap-1 flex flex-col md:flex-row capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Origin:</span>{" "}
            <span>{plant.origin}</span>
          </p>
        )}
        {plant.category && (
          <p className="gap-1 flex flex-col md:flex-row capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Category:</span>{" "}
            <span>{plant.category}</span>
          </p>
        )}
        {plant.last_water && (
          <p className="gap-1 flex flex-col md:flex-row capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Last Watered:</span>{" "}
            <span>{formatDateToInputValue(new Date(plant.last_water))}</span>
          </p>
        )}
        {plant.climate && (
          <p className="gap-1 flex flex-col md:flex-row capitalize text-left text-sm/none md:text-base/none text-dark-green">
            <span className="font-semibold">Climate:</span>{" "}
            <span>{plant.climate}</span>
          </p>
        )}
      </div>
      <CustomSchedule
        defaultValue={7}
        id={plant.id}
        customSchedule={plant.custom_schedule}
      />
    </div>
  );
}
