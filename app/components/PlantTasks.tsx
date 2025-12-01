import { Button } from "./ui/button";
import { useFetcher } from "react-router";
import { actionButtons } from "~/constants";
import type { Plant } from "~/components/types/SharedTypes.js";
import { isReadyForWatering, getDaysSinceLastAction } from "~/utils";

export function PlantTasks({ plant }: { plant: Plant }) {
  const fetcher = useFetcher();
  const { plantNeedsWatering, nextWateringInDays, pastDue } =
    isReadyForWatering(plant.category, plant.last_water);

  let taskStatus = {
    wateredToday: getDaysSinceLastAction(plant.last_water) === 0,
    rotatedToday: getDaysSinceLastAction(plant.last_rotated) === 0,
    skippedToday: getDaysSinceLastAction(plant.last_skipped) === 0
  };

  if (fetcher.formData) {
    const formType = fetcher.formData.get("type");

    if (formType === "watered") taskStatus.wateredToday = true;
    if (formType === "rotated") taskStatus.rotatedToday = true;
    if (formType === "skipped") taskStatus.skippedToday = true;
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2 justify-between">
        <h2 className="font-bold text-2xl/none md:text-3xl/none">Tasks</h2>
        <span
          className={`text-sm/none place-self-start text-left font-medium ${plantNeedsWatering ? "text-red-600" : "text-green-600"}`}
        >
          {plantNeedsWatering ? "Needs attention!" : "Hydrated"}
        </span>
      </div>
      <div className="grid gap-2">
        <h3 className="font-bold text-base/none md:text-xl/none">Current</h3>
        {plantNeedsWatering ? (
          <div className="flex flex-col gap-1">
            <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
              {pastDue} days past due for watering
            </p>
            <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
              {Math.floor(pastDue / 2)} days past due for rotation
            </p>
          </div>
        ) : (
          <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
            No current tasks.
          </p>
        )}
      </div>
      <div className="grid gap-1 md:gap-2 grid-cols-2 md:grid-cols-3">
        {actionButtons.map((button) => {
          const wasActionDoneToday = taskStatus[button.taskKey];
          return (
            <fetcher.Form method="post" key={button.key}>
              <input type="hidden" name="plant_id" value={plant.id} />
              <input type="hidden" name="type" value={button.value} />
              <input type="hidden" name="key" value={button.key} />
              <Button
                type="submit"
                variant={wasActionDoneToday ? "default" : "outline"}
                className="font-semibold w-full"
                disabled={wasActionDoneToday}
              >
                {wasActionDoneToday ? button.text.complete : button.text.idle}
                <img
                  alt={`${button.value} icon`}
                  className="object-cover size-5"
                  src={
                    button.value === "watered"
                      ? "https://cdn-icons-png.flaticon.com/512/2514/2514435.png"
                      : button.value === "rotated"
                        ? "https://cdn-icons-png.flaticon.com/512/545/545682.png"
                        : "https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                  }
                ></img>
              </Button>
            </fetcher.Form>
          );
        })}
      </div>
      <div className="grid gap-2">
        <h3 className="font-bold text-base/none md:text-xl/none">Upcoming</h3>
        {nextWateringInDays ? (
          <div className="flex flex-col gap-1">
            <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
              Next watering is in {nextWateringInDays} days.
            </p>
            <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
              Next rotation is in {Math.floor(nextWateringInDays / 2)} days.
            </p>
          </div>
        ) : (
          <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
            No upcoming tasks.
          </p>
        )}
      </div>
    </div>
  );
}
