"use client";
import type { Plant } from "./types/SharedTypes";

import * as z from "zod";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Modal } from "./ui/dialog";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Calendar } from "./ui/calendar";
import { useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { FileInput } from "./ui/file-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { categories, healthStatuses, climates, lights } from "../constants";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Required: Please enter your plant's name"),
  category: z.string().min(1, "Required: Please select a category"),
  health: z.string().min(1).optional(),
  last_water: z.date().optional(),
  image: z.string().optional(),
  climate: z.string().optional(),
  ideal_light: z.string().optional(),
});

const fetcherCallback = (
  data: z.infer<typeof formSchema>,
  fetcher: any,
  event?: React.BaseSyntheticEvent
) => {
  if (event?.target) {
    fetcher.submit(new FormData(event.target), { method: "POST" });
  }
};

export function AddForm() {
  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      health: "healthy",
      last_water: undefined,
      image: "",
      climate: "",
      ideal_light: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data, event) =>
          fetcherCallback(data, fetcher, event)
        )}
        className="space-y-7 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem data-invalid={fieldState.invalid}>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Golden Pothos, Spider Plant, etc."
                  type="text"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              {fieldState.invalid ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Required: Add a name for your plant.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem data-invalid={fieldState.invalid}>
              <FormLabel htmlFor={`select-${field.name}-trigger`}>
                Category
              </FormLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="min-w-32 w-full hover:cursor-pointer hover:bg-accent hover:text-primary"
                  id={`select-${field.name}-trigger`}
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="hover:cursor-pointer"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Required: Choose the category that best describes your plant.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="last_water"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Last Watered</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        <Input
                          type="hidden"
                          name={field.name}
                          value={field.value ? field.value.toISOString() : ""}
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      fromYear={2025}
                      toDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Optional: The date you last watered this plant.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="health"
            render={({ field }) => (
              <FormItem>
                <span className="flex text-sm/none font-semibold">
                  Health Status
                </span>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-x-5"
                    {...field}
                  >
                    {healthStatuses.map((health, index) => (
                      <FormItem
                        className="flex items-center gap-x-2"
                        key={index}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={health.value}
                            className="hover:cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal hover:cursor-pointer text-base">
                          {health.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Optional: Choose the health status that best describes your
                  plant.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileInput {...field} />
              </FormControl>
              <FormDescription>Optional: Image of your plant.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="font-semibold"
          >
            Reset
          </Button>
          <Button
            className="min-w-32 font-semibold"
            type="submit"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function EditForm({ plant }: { plant: Plant }) {
  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: plant.name || "",
      health: plant.health || "healthy",
      last_water: plant.last_water ? new Date(plant.last_water) : undefined,
      image: "",
      category: plant.category || "",
      climate: plant.climate || "",
      ideal_light: plant.ideal_light || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data, event) =>
          fetcherCallback(data, fetcher, event)
        )}
        className="w-full space-y-4 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem data-invalid={fieldState.invalid}>
              <FormLabel>New Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Golden Pothos, Spider Plant, etc."
                  type="text"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              {fieldState.invalid && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem data-invalid={fieldState.invalid}>
              <FormLabel htmlFor={`select-${field.name}-trigger`}>
                New Category
              </FormLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={`select-${field.name}-trigger`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-32 w-full hover:cursor-pointer hover:bg-accent hover:text-primary"
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="hover:cursor-pointer"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FormMessage />}
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <FormField
            name="climate"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem data-invalid={fieldState.invalid}>
                <FormLabel htmlFor={`select-${field.name}-trigger`}>
                  New Climate
                </FormLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={`select-${field.name}-trigger`}
                    aria-invalid={fieldState.invalid}
                    className="min-w-32 w-full hover:cursor-pointer hover:bg-accent hover:text-primary"
                  >
                    <SelectValue placeholder="Choose a climate" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {climates.map((climate) => (
                      <SelectItem
                        key={climate.value}
                        value={climate.value}
                        className="hover:cursor-pointer"
                      >
                        {climate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            name="ideal_light"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem data-invalid={fieldState.invalid}>
                <FormLabel htmlFor={`select-${field.name}-trigger`}>
                  New Ideal Light
                </FormLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={`select-${field.name}-trigger`}
                    aria-invalid={fieldState.invalid}
                    className="min-w-32 w-full hover:cursor-pointer hover:bg-accent hover:text-primary"
                  >
                    <SelectValue placeholder="Choose ideal lighting" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {lights.map((light) => (
                      <SelectItem
                        key={light.value}
                        value={light.value}
                        className="hover:cursor-pointer"
                      >
                        {light.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FormMessage />}
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="last_water"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>New Last Watered</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        <Input
                          type="hidden"
                          name={field.name}
                          value={field.value ? field.value.toISOString() : ""}
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      fromYear={2025}
                      toDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="health"
            render={({ field }) => (
              <FormItem>
                <span className="flex text-sm/none font-semibold">
                  Health Status
                </span>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-x-5"
                    {...field}
                  >
                    {healthStatuses.map((health, index) => (
                      <FormItem
                        className="flex items-center gap-x-2"
                        key={index}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={health.value}
                            className="hover:cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal hover:cursor-pointer text-base">
                          {health.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Image</FormLabel>
              <FormControl>
                <FileInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Modal
            triggerButton={
              <Button
                type="button"
                variant="destructive"
                className="min-w-20 font-semibold"
              >
                Delete
              </Button>
            }
            successButton={
              <Button
                type="submit"
                variant="destructive"
                className="min-w-20 font-semibold"
                onClick={() => fetcher.submit(new FormData(), { method: "DELETE" })}
              >
                Delete
              </Button>
            }
            cancelButton={<Button variant="outline">Cancel</Button>}
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your plant from our servers."
          />
          <Button
            className="min-w-32 font-semibold"
            type="submit"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? (
              <>
                <Spinner />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
