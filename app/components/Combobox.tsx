"use client";

import { cn } from "../lib/utils";
import type { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "../components/ui/popover";

export function Combobox({
  name,
  options,
  artifact,
  value,
  handleSelect
}: {
  name: string;
  options: { value: string; label: string }[];
  artifact: string;
  value: string;
  handleSelect: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const comboboxValue = searchParams.get(name) || "";
    setSelected(comboboxValue);
  }, [searchParams]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between cursor-pointer"
        >
          {selected
            ? options.find((option) => option.value === selected)?.label
            : `Select ${artifact}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${artifact}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {artifact} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className="cursor-pointer"
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue =
                      currentValue === selected ? "" : currentValue;
                    setSelected(newValue);
                    setOpen(false);
                    handleSelect({
                      target: {
                        name: name,
                        value: newValue
                      }
                    } as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
