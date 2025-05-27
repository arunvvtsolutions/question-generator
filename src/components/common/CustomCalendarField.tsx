import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { formatDate } from "@/utils";

const CustomCalendarField = ({
  id,
  onSelect,
  placeHolder,
  selected,
}: {
  id: string;
  placeHolder: string;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-full pl-3  font-normal mt-[12px] flex justify-between items-center border-none bg-[#F5F5F7] dark:bg-[#262626]",
            !selected && "text-muted-foreground"
          )}
        >
          <div className="flex">
            <CalendarIcon className="h-4 w-4 opacity-50 ml-0" />
            <span className="ms-2">
              {selected ? formatDate(selected) : placeHolder}
            </span>
          </div>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={(date) => date < new Date()}
          className="w-full"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomCalendarField;
