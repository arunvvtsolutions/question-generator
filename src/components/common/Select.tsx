import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IValueProps } from "./MultiSelect";
import { cn } from "@/lib/utils";

const CustomSelect = ({
  label,
  options,
  selectedValue,
  placeHolder = "Select Option",
  startIcon,
  className = 'w-[120px]',
  onValueChange,
}: {
  label?: string;
  selectedValue: any;
  placeHolder?: string;
  options: IValueProps[];
  startIcon?: React.ReactNode;
  className?:string
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select onValueChange={onValueChange} value={selectedValue}>
      <SelectTrigger className={cn(" bg-[#FFFF] dark:bg-[#0e0e0e]", className)}>
        {startIcon}
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent ref={(ref) => { if (!ref) return; ref.ontouchstart = (e) => { e.preventDefault(); }; }}>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((opt, index) => {
            return (
              <SelectItem value={opt.value} key={index}>
                {opt.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
