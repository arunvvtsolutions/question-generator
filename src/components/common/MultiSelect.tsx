"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { convertSearchableTxt } from "@/utils";
import { Input } from "../ui/input";

export interface IValueProps {
  value: any;
  label: string;
  optionalValue?: any;
  group?: string;
}

const MultiSelect = ({
  options,
  isSearch = false,
  placeHolder = "Select Value",
  startIcon,
  selectedValues,
  selectedValuePlaceHolder,
  handleSelectChange,
  isGrouped = false,
}: {
  isSearch?: boolean;
  placeHolder?: string;
  options: IValueProps[];
  startIcon?: React.ReactNode;
  selectedValues: IValueProps[];
  selectedValuePlaceHolder?: string;
  handleSelectChange: (option: IValueProps[]) => void;
  isGrouped?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const isValueExist = (option: IValueProps) =>
    selectedValues.some((value) => String(value.value) === String(option.value));

  const onSelect = (currentValue: string, option: IValueProps) => {
    let newData = [];
    if (currentValue === "0") {
      newData = selectedValues.length === options.length - 1 ? [] : options.slice(1, options.length);
    } else {
      newData = isValueExist(option)
        ? selectedValues.filter((value) => String(value.value) !== String(currentValue))
        : [...selectedValues, option];
    }
    handleSelectChange(newData);
  };

  // Function to format the display of selected values
  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeHolder;
    if (selectedValuePlaceHolder) {
      return `${selectedValues.length + 1 === options.length ? "All" : selectedValues.length} ${selectedValuePlaceHolder}`;
    }

    // Show up to 2 labels, then append "+X more" if there are more
    const maxDisplay = 2;
    const displayedLabels = selectedValues.slice(0, maxDisplay).map((data) => data.label).join(", ");
    const remainingCount = selectedValues.length - maxDisplay;
    return remainingCount > 0 ? `${displayedLabels} +${remainingCount} more` : displayedLabels;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between flex h-auto min-h-[40px] py-2 px-3"
        >
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            {startIcon}
            <span className="flex-1 truncate text-left">
              {getDisplayText()}
            </span>
          </div>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[314px] p-0">
        <Command>
          {isSearch && (
            <div className="w-full p-2">
              <Input
                className="w-full focus-visible:outline-none focus-within:outline-none focus:outline-none"
                value={search}
                placeholder={placeHolder}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          <CommandList className="scrollbar-thin">
            <CommandEmpty>No Data found.</CommandEmpty>
            {isGrouped ? (
              // Group options by their group property
              Object.entries(
                options
                  .filter((option) => convertSearchableTxt(option.label).includes(convertSearchableTxt(search)))
                  .reduce((groups, option) => {
                    const group = option.group || 'Other';
                    return {
                      ...groups,
                      [group]: [...(groups[group] || []), option],
                    };
                  }, {} as Record<string, IValueProps[]>)
              ).map(([groupName, groupOptions]) => (
                <CommandGroup key={groupName} heading={groupName}>
                  {groupOptions.map((option, index) => (
                    <CommandItem
                      key={`${groupName}-${index}`}
                      value={option.value}
                      onSelect={(value) => onSelect(value, option)}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 text-[green]",
                          isValueExist(option) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              <CommandGroup>
                {options
                  .filter((option) => convertSearchableTxt(option.label).includes(convertSearchableTxt(search)))
                  .map((option, index) => (
                    <CommandItem
                      key={index}
                      value={option.value}
                      onSelect={(value) => onSelect(value, option)}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 text-[green]",
                          isValueExist(option) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(MultiSelect);