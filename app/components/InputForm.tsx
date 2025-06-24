"use client";
import { useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { Calendar as CalendarIcon, Paperclip } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).optional(),
  health: z.string().min(1).optional(),
  last_water: z.date().optional(),
  image: z.string().optional()
});

export default function InputForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      health: "",
      email: "",
      last_water: undefined,
      image: ""
    }
  });

  const fetcher = useFetcher();
  return (
    <Form {...form}>
      <fetcher.Form
        method="post"
        action="/plants/add"
        encType="multipart/form-data"
        className="space-y-8 max-w-3xl mx-auto p-10 bg-white rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plant Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormDescription>
                Your email address will not be publicly displayed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="health"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Current Status of this plant</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {[
                      ["Healthy", "healthy"],
                      ["Okay", "okay"],
                      ["Dying", "dying"]
                    ].map((option, index) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={index}
                      >
                        <FormControl>
                          <RadioGroupItem value={option[1]} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option[0]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_water"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Last Water</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full max-w-[240px] pl-3 text-left font-normal",
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
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The last time you watered this plant.
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
              <FormLabel>Upload an image of your plant</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input id="picture" type="file" {...field} />
                  <Paperclip className="absolute mr-3 top-2.5 right-0 h-4 w-4 opacity-50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="hidden" name="intent" value="add" />
        <Button type="submit">Submit</Button>
      </fetcher.Form>
    </Form>
  );
}
