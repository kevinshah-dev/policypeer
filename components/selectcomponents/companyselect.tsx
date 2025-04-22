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

interface CompanyOption {
  label: string;
  value: string;
}

const COMPANY_OPTIONS: CompanyOption[] = [
  { label: "UnitedHealthcare", value: "unitedhealthcare" },
  { label: "State Farm", value: "state-farm" },
  { label: "GEICO", value: "geico" },
  { label: "Progressive", value: "progressive" },
  { label: "Allstate", value: "allstate" },
  { label: "USAA", value: "usaa" },
  { label: "Liberty Mutual", value: "liberty-mutual" },
  { label: "Travelers", value: "travelers" },
  { label: "Nationwide", value: "nationwide" },
  { label: "Farmers Insurance", value: "farmers" },
  { label: "Elevance Health", value: "elevance-health" },
  { label: "Aetna", value: "aetna" },
  { label: "Cigna", value: "cigna" },
  { label: "Humana", value: "humana" },
  { label: "Kaiser Permanente", value: "kaiser-permanente" },
  { label: "American Family", value: "american-family" },
  { label: "Chubb", value: "chubb" },
  { label: "The Hartford", value: "the-hartford" },
  { label: "Oscar Health", value: "oscar-health" },
];

interface CompanySelectProps {
  value: string;
  onChange: (newValue: string) => void;
}

export function CompanySelect({ value, onChange }: CompanySelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = React.useMemo(() => {
    const found = COMPANY_OPTIONS.find((opt) => opt.value === value);
    return found ? found.label : "Select a company";
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
          <CommandInput placeholder="Search companies..." />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup>
              {COMPANY_OPTIONS.map((company) => (
                <CommandItem
                  key={company.value}
                  onSelect={() => handleSelect(company.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === company.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {company.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
