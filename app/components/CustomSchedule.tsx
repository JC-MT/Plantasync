import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Spinner } from "./ui/spinner";
import { useFetcher } from "react-router";
import { MinusIcon, PlusIcon } from "lucide-react";

export const CustomSchedule = ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: number;
}) => {
  const fetcher = useFetcher();
  const [customTime, setCustomTime] = useState<number>(defaultValue);
  const [isCustomTimeActive, setIsCustomTimeActive] = useState<boolean>(false);

  return (
    <div className="grid gap-3 place-items-end">
      <div className="flex items-center gap-2">
        <Switch
          id="custom-schedule"
          name="schedule"
          value="custom"
          checked={isCustomTimeActive}
          onCheckedChange={() => setIsCustomTimeActive(!isCustomTimeActive)}
        />
        <Label htmlFor="custom-schedule" className="text-base">
          Custom Schedule
        </Label>
      </div>
      {isCustomTimeActive && (
        <fetcher.Form
          method="post"
          encType="multipart/form-data"
          className="flex gap-2 items-end w-full justify-end"
        >
          <div className="w-full max-w-xs space-y-1 md:space-y-2">
            <Label htmlFor="custom-days">{label}</Label>
            <div className="m-0 dark:bg-input/30 border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-8 w-full min-w-0 items-center overflow-hidden rounded-md border bg-transparent text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring-[3px] md:text-sm">
              <span className="grow text-sm md:text-base pl-3 pr-8 py-1 text-center font-medium">
                Every {customTime === 1 ? "day" : `${customTime} days`}
              </span>
              <Input
                id="custom-days"
                name="custom-days"
                type="number"
                value={customTime}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={customTime <= 1}
                className="rounded-none border-y-0 border-r-0"
                onClick={() => setCustomTime(Math.max(1, customTime - 1))}
              >
                <MinusIcon />
                <span className="sr-only">Decrement</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-none border-y-0 border-r-0"
                onClick={() => setCustomTime(customTime + 1)}
              >
                <PlusIcon />
                <span className="sr-only">Increment</span>
              </Button>
            </div>
          </div>
          <Button
            size="sm"
            className="w-fit text-xs/none md:text-sm/none font-semibold px-3 py-1.5 md:px-4 md:py-2 min-w-14"
            type="submit"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? <Spinner /> : "Save"}
          </Button>
        </fetcher.Form>
      )}
    </div>
  );
};
