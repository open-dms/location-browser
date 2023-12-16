import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";
import { SearchResultItem } from "@/lib/osm";
import { KeyboardEventHandler, useState } from "react";
import { Loader } from "../Loader";
import { useSearch } from "./hooks";

export const Search = ({
  value,
  onChange,
}: {
  value?: SearchResultItem | string;
  onChange: (result: SearchResultItem | string) => void;
}) => {
  const [dirty, setDirty] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const {
    result: suggestions,
    reset: resetSuggestions,
    loading,
    debouncing,
  } = useSearch(searchValue);

  const hasValue = inputValue.trim().length > 3;

  const reset = () => {
    if (suggestions.length) {
      resetSuggestions();
      return;
    }
    if (dirty && value) {
      setInputValue(typeof value === "string" ? value : value?.name);
    }
    setDirty(false);
  };

  const handleSelect = (result: SearchResultItem | string) => {
    onChange(result);
    resetSuggestions();
    setDirty(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onChange(inputValue);
      resetSuggestions();
      setDirty(false);
    } else if (e.key === "Escape") {
      reset();
    }
  };

  const handleInput = (search: string) => {
    setInputValue(search);
    setSearchValue(search);
    setDirty(true);
  };

  return (
    <Command
      shouldFilter={false}
      className="h-fit shadow-md rounded-lg shrink-0"
      onKeyDown={handleKeyDown}
    >
      <CommandInput
        onValueChange={handleInput}
        value={inputValue}
        placeholder="Suche nach Ortsname"
      />
      <CommandList className="max-h-[300px]">
        {loading && (
          <CommandLoading>
            <Loader className="flex py-6 justify-center" />
          </CommandLoading>
        )}
        {hasValue && dirty && !debouncing && !loading && (
          <CommandEmpty>Keine Ergebnisse gefunden</CommandEmpty>
        )}
        {suggestions.length > 0 && (
          <>
            <CommandItem onSelect={() => handleSelect(inputValue)}>
              alle
            </CommandItem>
            {suggestions.map((item, index) => (
              <CommandItem key={index} onSelect={() => handleSelect(item)}>
                {item.name}
              </CommandItem>
            ))}
          </>
        )}
      </CommandList>
    </Command>
  );
};
