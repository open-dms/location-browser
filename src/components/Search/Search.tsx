import classNames from "classnames";
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { useSearch } from "./hooks";
import { SearchResult, hasQuery } from "./types";

export const Search = ({
  value,
  onChange,
}: {
  value?: SearchResult;
  onChange: (result: SearchResult) => void;
}) => {
  const [dirty, setDirty] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, resetSuggestions] = useSearch(searchValue);
  const [activeIndex, setActiveIndex] = useState(-1);

  const reset = () => {
    if (suggestions.length) {
      resetSuggestions();
      return;
    }
    if (dirty && value) {
      if (hasQuery(value)) {
        setInputValue(value.query);
      } else {
        setInputValue(value.name);
      }
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    if (suggestions.length && activeIndex > -1) {
      setInputValue(suggestions[activeIndex].name);
    } else if (dirty) {
      setInputValue(searchValue);
    }
  }, [activeIndex, dirty, searchValue, suggestions]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (activeIndex > -1) {
      onChange(suggestions[activeIndex]);
    } else if (inputValue.trim().length >= 3) {
      onChange({ query: inputValue, results: suggestions });
    }
    resetSuggestions();
    setDirty(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "ArrowDown" && activeIndex < suggestions.length - 1) {
      event.preventDefault();
      setActiveIndex((activeIndex) => activeIndex + 1);
    } else if (event.key === "ArrowUp" && activeIndex > -1) {
      event.preventDefault();
      setActiveIndex((activeIndex) => activeIndex - 1);
    } else if (event.key === "Escape") {
      reset();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setActiveIndex(-1);
    setInputValue(e.target.value);
    setSearchValue(e.target.value);
    setDirty(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          placeholder="Suche nach Ortsname"
          role="combobox"
          aria-activedescendant={
            activeIndex > -1 ? `suggestion-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-controls="search-menu"
          aria-expanded={suggestions.length > 0}
          aria-haspopup="listbox"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full dark:bg-slate-700"
        />
        {suggestions.length > 0 && (
          <ul
            id="search-menu"
            role="listbox"
            className="shadow-sm rounded-sm bg-slate-50 dark:bg-slate-700 m-1"
          >
            {suggestions.map((item, index) => (
              <li key={item.id}>
                <button
                  tabIndex={-1}
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={handleSubmit}
                  className={classNames(
                    "w-full text-start p-2",
                    "hover:bg-whit dark:hover:bg-slate-600",
                    {
                      "bg-emerald-200 dark:bg-slate-600": index === activeIndex,
                    }
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};
