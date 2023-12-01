import { Feature } from "@/lib/osm";
import classNames from "classnames";
import { useAtomValue, useSetAtom } from "jotai";
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "usehooks-ts";
import { searchResultAtom, searchTermAtom } from "./atoms";

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
  const setSearchTerm = useSetAtom(searchTermAtom);
  const suggestions = useAtomValue(searchResultAtom);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (debouncedText.trim().length < 3) {
      return;
    }
    setActiveIndex(-1);
    setSearchTerm(debouncedText);
  }, [debouncedText, setSearchTerm]);

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
      setActiveIndex(-1);
      setSearchTerm("");
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
              <li key={item.id}>
                <button
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={classNames({
                    "bg-emerald-200": index === activeIndex,
                  })}
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
