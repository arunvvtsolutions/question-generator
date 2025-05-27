"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "../ui/badge";
import { convertSearchableTxt } from "@/utils";
import { Input } from "../ui/input";

export interface IValueProps {
  value: any;
  label: string;
  optionalValue?: any;
}

const MultiSelect = ({
  options,
  isSearch = false,
  placeHolder = "Select Value",
  startIcon,
  selectedValues,
  selectedValuePlaceHolder,
  handleSelectChange,
}: {
  isSearch?: boolean;
  placeHolder?: string;
  options: IValueProps[];
  startIcon?: React.ReactNode;
  selectedValues: IValueProps[];
  selectedValuePlaceHolder?: string;
  handleSelectChange: (option: IValueProps[]) => void;
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between flex h-auto">
          <div className="flex items-center gap-2">
            {startIcon}
            {selectedValues.length ? (
              <>
                <div className="flex flex-wrap gap-2 ">
                  {selectedValuePlaceHolder ? (
                    <>
                      <p>
                        {selectedValues.length + 1 === options.length ? "All" : selectedValues.length}{" "}
                        {selectedValuePlaceHolder}
                      </p>
                    </>
                  ) : (
                    <>
                      (
                      {selectedValues.slice(0, 5).map((data, index) => (
                        <Badge variant="secondary" key={index}>
                          <span className="max-w-[95px] w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {data.label}
                          </span>
                        </Badge>
                      ))}
                      ){selectedValues.length > 5 && "..."}
                    </>
                  )}
                </div>
              </>
            ) : (
              <>{placeHolder}</>
            )}
          </div>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[314px] p-0">
        <Command>
          {isSearch && (
            <div className="w-full p-2">
              <Input
                className="w-100% focus-visible:outline-none focus-within:outline-none focus:outline-none"
                value={search}
                placeholder={placeHolder}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          <CommandList className="scrollbar-thin">
            <CommandEmpty>No Data found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((option) => convertSearchableTxt(option.label).includes(convertSearchableTxt(search)))
                .map((option, index) => (
                  <CommandItem key={index} value={option.value} onSelect={(value) => onSelect(value, option)}>
                    {option.label}
                    <CheckIcon className={cn("ml-auto h-4 w-4 text-[green]", isValueExist(option) ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(MultiSelect);
