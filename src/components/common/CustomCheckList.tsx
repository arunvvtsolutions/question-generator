import React, { useState, useEffect, memo, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ERROR } from "@/service/enums/texts";

export interface IOptionProps {
  label: string;
  value: string;
  optionalValue?: number;
}

interface CustomCheckboxListProps {
  options: IOptionProps[];
  selectedValues: IOptionProps[];
  placeHolder: string;
  listHeight?: number;
  error?: string;
  handleSelectChange: (options: IOptionProps[]) => void;
}

const DEFAULT_VALUE = "0";

const CustomCheckList: React.FC<CustomCheckboxListProps> = ({
  options,
  selectedValues,
  placeHolder,
  listHeight = 200,
  error,
  handleSelectChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const [openList, setOpenList] = useState<boolean>(false);

  useEffect(() => {
    if (searchText.trim() !== "") {
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  }, [searchText]);

  const handleCheckboxChange = (value: string) => {
    const isDefault = value === DEFAULT_VALUE;
    const isAllSelected = selectedValues.length === options.length;

    const updatedSelections = isDefault
      ? isAllSelected
        ? []
        : options
      : selectedValues.some((item) => item.value === value)
      ? selectedValues.filter((item) => item.value !== value && item.value !== DEFAULT_VALUE)
      : [...selectedValues, options.find((option) => option.value === value)!];

    handleSelectChange(updatedSelections);
  };

  const filteredOptions = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(searchText.toLowerCase())),
    [options, searchText]
  );

  return (
    <div className="custom-checkbox-list">
      <div className="relative">
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={placeHolder}
          className="border p-2 rounded w-full mb-2 pe-6"
        />
        <span
          title="Open list"
          className="absolute right-[5px] top-[5px] cursor-pointer hover:bg-[#cccccc2d] bg-[#cccccc11] p-1 rounded-[25px]"
          onClick={() => setOpenList(!openList)}
        >
          <ArrowDownIcon />
        </span>
      </div>
      <div
        className={`checkbox-list overflow-y-auto border p-2 rounded scrollbar-thin transition-all duration-300 ease-in-out transform ${
          openList ? "max-h-[200px] opacity-100 scale-y-100 pb-2" : "max-h-0 opacity-0 scale-y-0 pointer-events-none pb-0"
        }`}
        style={{ maxHeight: openList ? listHeight : 0 }}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center mb-1"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Checkbox
                checked={selectedValues.length === options.length || selectedValues.some((item) => item.value === option.value)}
                onCheckedChange={() => handleCheckboxChange(option.value)}
                id={`checkbox-${option.value}`}
                className="mr-2"
              />
              <label
                htmlFor={`checkbox-${option.value}`}
                className="text-[14px] cursor-pointer"
                onClick={() => handleCheckboxChange(option.value)}
              >
                {option.label}
              </label>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-[13px]">{ERROR.NO_DATA_FOUND}</div>
        )}
      </div>
      {error && <p className={cn("text-[#f04749] font-[500] text-[14px] mx-2 mt-0", !openList && "!mt-[-13px]")}>{error}</p>}
    </div>
  );
};

export default memo(CustomCheckList);
