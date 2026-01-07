import type { Plant } from "~/components/types/SharedTypes.js";
import { Button } from "./ui/button";
import { useFetcher } from "react-router";
import { actionButtons } from "~/constants";
import { BadgeCheck, BadgeAlert, BadgeX } from "lucide-react";
import {
  isReadyForWatering,
  getDaysSinceLastAction,
  getGeneralWateringInterval,
} from "~/utils";

export function PlantTasks({ plant }: { plant: Plant }) {
  const fetcher = useFetcher();
  const { plantNeedsWatering, nextWateringInDays } = isReadyForWatering(
    plant.category,
    plant.last_water,
    plant.custom_schedule
  );
  const daysUntilNextRotation =
    getGeneralWateringInterval(plant.category, plant.custom_schedule) -
    getDaysSinceLastAction(plant.last_rotated);
  let wateredToday = getDaysSinceLastAction(plant.last_water) === 0;
  let rotatedToday = getDaysSinceLastAction(plant.last_rotated) === 0;
  let skippedToday = getDaysSinceLastAction(plant.last_skipped) === 0;
  let fertilizedToday = getDaysSinceLastAction(plant.last_fertilized) === 0;

  if (fetcher.formData) {
    const formType = fetcher.formData.get("type");

    if (formType === "watered") wateredToday = true;
    if (formType === "rotated") rotatedToday = true;
    if (formType === "skipped") skippedToday = true;
    if (formType === "fertilized") fertilizedToday = true;
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2 justify-between">
        <h2 className="font-bold text-2xl/none md:text-3xl/none">Tasks</h2>
        <span className="text-sm/none place-self-start text-left font-medium">
          {!plantNeedsWatering || wateredToday || rotatedToday ? (
            <>
              {(daysUntilNextRotation >= 0 && !plantNeedsWatering) ||
              (wateredToday && rotatedToday) ? (
                <span className="text-green-600 flex items-center gap-1">
                  <BadgeCheck className="inline size-4" />
                  All caught up
                </span>
              ) : (
                <span className="text-yellow-600 flex items-center gap-1">
                  <BadgeAlert className="inline size-4" />
                  Needs {plantNeedsWatering ? "watering" : "rotating"}
                </span>
              )}
            </>
          ) : (
            <span className="text-red-600 flex items-center gap-1">
              <BadgeX className="inline size-4" />
              Needs attention
            </span>
          )}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
          {wateredToday || !plantNeedsWatering
            ? `Next water ${nextWateringInDays === 0 ? "today" : `in ${nextWateringInDays} days`}`
            : "Plant needs watering"}
        </p>
        <p className="text-left text-sm/none md:text-base/none font-medium text-dark-green">
          {rotatedToday ||
          getGeneralWateringInterval(plant.category, plant.custom_schedule) >=
            getDaysSinceLastAction(plant.last_rotated)
            ? `Next rotation ${daysUntilNextRotation === 0 ? "today" : `in ${daysUntilNextRotation} days`}`
            : "Plant needs rotating"}
        </p>
      </div>
      <div className="grid gap-1 md:gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {actionButtons.map((button) => {
          let actionDoneToday = false;
          switch (button.value) {
            case "watered":
              actionDoneToday = wateredToday;
              break;
            case "rotated":
              actionDoneToday = rotatedToday;
              break;
            case "skipped":
              actionDoneToday = skippedToday;
              break;
            case "fertilized":
              actionDoneToday = fertilizedToday;
              break;
          }
          return (
            <fetcher.Form method="post" key={button.key}>
              <input type="hidden" name="is_action" value="true" />
              <input type="hidden" name="type" value={button.value} />
              <input type="hidden" name={button.key} value={new Date().toISOString()} />
              <Button
                type="submit"
                variant={actionDoneToday ? "default" : "outline"}
                className="font-semibold w-full"
                disabled={actionDoneToday}
              >
                {actionDoneToday ? button.text.complete : button.text.idle}
                <img
                  alt={`${button.value} icon`}
                  className="object-cover size-5"
                  src={button.img}
                ></img>
              </Button>
            </fetcher.Form>
          );
        })}
      </div>
    </div>
  );
}
