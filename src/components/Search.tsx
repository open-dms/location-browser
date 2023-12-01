import { fetchFrom } from "@/lib/fetch";
import { Feature, SearchResultItem } from "@/lib/osm";
import classNames from "classnames";
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "usehooks-ts";

type Suggestion = {
  id: Feature["id"];
  name: string;
};

type SubmitItem = Suggestion | Pick<Suggestion, "name">;

export const Search = ({
  onSubmit,
}: {
  onSubmit: (item: SubmitItem) => void;
}) => {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<Array<SearchResultItem>>([]);

  useEffect(() => {
    if (debouncedText.trim().length < 3) {
      return;
    }

    setActiveIndex(-1);

    fetchFrom<Array<SearchResultItem>>(
      `/location/search?q=${debouncedText}`
    ).then(setSuggestions);
  }, [debouncedText, setSuggestions]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (activeIndex > -1) {
      onSubmit(suggestions[activeIndex]);
      return;
    }
    if (text.trim().length < 3) {
      return;
    }
    onSubmit({ name: text });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "ArrowDown" && activeIndex < suggestions.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (event.key === "ArrowUp" && activeIndex > -1) {
      setActiveIndex(activeIndex - 1);
    }
    if (event.key == "Escape") {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          placeholder="Suche nach Ortsname"
          role="combobox"
          aria-activedescendant={
            activeIndex > -1 ? `suggestion-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-controls="search-menu"
          aria-expanded={suggestions.length > 0}
          aria-haspopup="listbox"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul id="search-menu" role="listbox">
            {suggestions.map((item, index) => (
              <li
                key={item.id}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => onSubmit(item)}
                className={classNames({
                  "bg-emerald-200": index === activeIndex,
                })}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};
