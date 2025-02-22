"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleOption {
  label: string;
  value: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  { label: "Toyota", value: "toyota" },
  { label: "Honda", value: "honda" },
  { label: "Ford", value: "ford" },
  { label: "Chevrolet", value: "chevrolet" },
  { label: "Nissan", value: "nissan" },
  { label: "BMW", value: "bmw" },
  { label: "Mercedes-Benz", value: "mercedes-benz" },
  { label: "Audi", value: "audi" },
  { label: "Volkswagen", value: "volkswagen" },
  { label: "Hyundai", value: "hyundai" },
  { label: "Kia", value: "kia" },
  { label: "Subaru", value: "subaru" },
  { label: "Mazda", value: "mazda" },
  { label: "Lexus", value: "lexus" },
  { label: "Acura", value: "acura" },
  { label: "Porsche", value: "porsche" },
  { label: "Jaguar", value: "jaguar" },
  { label: "Land Rover", value: "land-rover" },
  { label: "Volvo", value: "volvo" },
  { label: "Tesla", value: "tesla" },
  { label: "Mitsubishi", value: "mitsubishi" },
  { label: "Chrysler", value: "chrysler" },
  { label: "Dodge", value: "dodge" },
  { label: "Jeep", value: "jeep" },
  { label: "Ram", value: "ram" },
  { label: "Buick", value: "buick" },
  { label: "GMC", value: "gmc" },
  { label: "Cadillac", value: "cadillac" },
  { label: "Lincoln", value: "lincoln" },
  { label: "Infiniti", value: "infiniti" },
  { label: "Mini", value: "mini" },
  { label: "Fiat", value: "fiat" },
  { label: "Alfa Romeo", value: "alfa-romeo" },
  { label: "Maserati", value: "maserati" },
  { label: "Bentley", value: "bentley" },
  { label: "Rolls-Royce", value: "rolls-royce" },
  { label: "Ferrari", value: "ferrari" },
  { label: "Lamborghini", value: "lamborghini" },
  { label: "Aston Martin", value: "aston-martin" },
  { label: "Bugatti", value: "bugatti" },
  { label: "Pagani", value: "pagani" },
];

interface VehicleSelectProps {
  value: string;
  onChange: (newValue: string) => void;
}

export function VehicleSelect({ value, onChange }: VehicleSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = React.useMemo(() => {
    const found = VEHICLE_OPTIONS.find((opt) => opt.value === value);
    return found ? found.label : "Select a vehicle";
  }, [value]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[280px]">
        <Command>
          <CommandInput placeholder="Search vehicle makes..." />
          <CommandList>
            <CommandEmpty>No vehicles found.</CommandEmpty>
            <CommandGroup>
              {VEHICLE_OPTIONS.map((vehicle) => (
                <CommandItem
                  key={vehicle.value}
                  onSelect={() => handleSelect(vehicle.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === vehicle.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {vehicle.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
