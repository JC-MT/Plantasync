"use client";
import { useFetcher } from "react-router";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Calendar } from "./ui/calendar";
import { useForm } from "react-hook-form";
import { FileInput } from "./ui/file-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { categories, healthStatuses } from "../constants";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
const formSchema = z.object({
  name: z.string().min(1, "Required: Please enter your plant's name"),
  health: z.string().min(1).optional(),
  last_water: z.date().optional(),
  image: z.string().optional(),
  category: z.string().min(1, "Required: Please select a category").optional(),
  intent: z.string().min(1, "Required: Intent is required")
});

export default function InputForm() {
  const fetcher = useFetcher();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      health: "healthy",
      last_water: undefined,
      image: "",
      category: "",
      intent: "add"
    }
  });

  const addPlant = (
    data: z.infer<typeof formSchema>,
    event?: React.BaseSyntheticEvent
  ) => {
    fetcher.submit(new FormData(event?.target as HTMLFormElement), {
      method: "post",
      action: "/plants/add",
      encType: "multipart/form-data"
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(addPlant)}
        className="space-y-7 max-w-3xl mx-auto p-5 bg-white rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
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
              <FormLabel>Category</FormLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="form-rhf-select-language"
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
                <FormLabel className="m-0">Health Status</FormLabel>
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
        <Input type="hidden" name="intent" value="add" />
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
