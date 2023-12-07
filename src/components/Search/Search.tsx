"use client";

import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { currentSearchResultAtom, searchResultAtom } from "./atoms";
import { useDebouncedSearchText } from "./hooks";

export const Search = () => {
  const [value, setValue] = useAtom(currentSearchResultAtom);
  const [inputValue, setInputValue] = useState("");

  const [search, setSearch, resetSearch] = useDebouncedSearchText("");
  const suggestions = useAtomValue(searchResultAtom);
  const [activeIndex, setActiveIndex] = useState(-1);

  const dirty = useMemo(() => {
    if (!value) {
      return inputValue !== "";
    } else {
      return inputValue !== value.query;
    }
  }, [inputValue, value]);

  const reset = () => {
    if (value && value.query) {
      setInputValue(value.query);
    } else {
      setInputValue(search);
    }
    setActiveIndex(-1);
    resetSearch();
  };

  useEffect(() => {
    if (!dirty) {
      setActiveIndex(-1);
    }
  }, [dirty]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    if (activeIndex > -1) {
      setInputValue(suggestions[activeIndex].name);
    } else if (dirty) {
      setInputValue(search);
    }
  }, [activeIndex, suggestions, search, dirty]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (dirty) {
      if (activeIndex > -1) {
        const result = suggestions[activeIndex];
        setValue({ query: result.name, results: [result] });
        setInputValue(result.name);

        console.log("setInputValue", result.name);
      } else if (inputValue.trim().length >= 3) {
        setValue({ query: inputValue, results: suggestions });
      }
    }
    setActiveIndex(-1);
    resetSearch();
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
    setSearch(e.target.value);
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
          onBlur={() => reset()}
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
