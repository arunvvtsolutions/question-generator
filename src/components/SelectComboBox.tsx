import * as React from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SelectComboBoxProps = {
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showSearch?: boolean; // ✅ New prop
};
export function SelectComboBox({
  options,
  placeholder,
  value,
  onChange,
  disabled,
  showSearch
}: SelectComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open && showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, showSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-full justify-between'
          disabled={disabled}
        >
          {value ? options.find((o) => o.value === value)?.label : placeholder}
          <ChevronsUpDown className='w-3 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
        <Command>
          {showSearch && (
            <CommandInput
              ref={inputRef}
              placeholder='Search…'
              className='h-9'
            />
          )}

          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                  <Check
                    className={cn(
                      'ml-auto w-4',
                      value === opt.value ? 'opacity-100' : 'opacity-0'
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