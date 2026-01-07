import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useFetcher, type SubmitTarget } from "react-router";
import { MinusIcon, PlusIcon, SquarePen } from "lucide-react";

export const CustomSchedule = ({
  defaultValue,
  customSchedule,
}: {
  defaultValue: number;
  customSchedule: number;
}) => {
  const fetcher = useFetcher();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customDays, setCustomDays] = useState<number>(
    customSchedule || defaultValue
  );
  const [isCustomScheduleActive, setIsCustomScheduleActive] = useState<boolean>(
    customSchedule > 0
  );

  const handleFormState = () => {
    if (!isCustomScheduleActive) {
      setIsEditing(!isEditing);
    } else {
      if (customDays > 0) {
        fetcher.submit({ custom_schedule: 0 }, { method: "POST" });
      }
      setIsCustomScheduleActive(false);
      setIsEditing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSchedule !== customDays) {
      fetcher.submit(e.target as SubmitTarget, { method: "POST" });
    }
    setIsEditing(false);
    setIsCustomScheduleActive(true);
  };

  return (
    <div className="grid gap-2 place-items-end">
      <div className="flex items-center gap-2">
        <Label htmlFor="custom-schedule">custom schedule</Label>
        <Switch
          id="custom-schedule"
          name="schedule"
          value="custom"
          checked={isCustomScheduleActive || isEditing}
          onCheckedChange={handleFormState}
        />
      </div>
      {isCustomScheduleActive || isEditing ? (
        <fetcher.Form
          method="post"
          encType="multipart/form-data"
          className="grid gap-1 place-items-end w-full"
          onSubmit={handleSubmit}
        >
          <div className="sm:max-w-72 m-0 dark:bg-input/30 border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-8 w-full min-w-0 items-center overflow-hidden rounded-md border bg-transparent text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring-[3px] md:text-sm">
            <span className="grow text-sm md:text-base px-8 py-1 text-center font-medium">
              Every {customDays === 1 ? "day" : `${customDays} days`}
            </span>
            <input
              name="custom_schedule"
              type="number"
              value={customDays}
              className="hidden"
            />
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={customDays <= 1}
                  className="rounded-none border-y-0 border-r-0"
                  onClick={() => setCustomDays(Math.max(1, customDays - 1))}
                >
                  <MinusIcon />
                  <span className="sr-only">Decrement</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-none border-y-0 border-r-0"
                  onClick={() => setCustomDays(customDays + 1)}
                >
                  <PlusIcon />
                  <span className="sr-only">Increment</span>
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-none border-y-0 border-r-0"
                onClick={() => setIsEditing(true)}
              >
                <SquarePen />
                <span className="sr-only">Edit your custom schedule</span>
              </Button>
            )}
          </div>
          {isEditing ? (
            <Button
              size="sm"
              className="w-fit text-xs/none md:text-sm/none font-semibold px-3 py-1.5 md:px-4 md:py-2 min-w-[74px]"
              type="submit"
              disabled={fetcher.state === "submitting"}
            >
              {fetcher.state === "submitting" ? "Saved" : "Save"}
            </Button>
          ) : null}
        </fetcher.Form>
      ) : null}
    </div>
  );
};
