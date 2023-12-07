import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { searchTermAtom } from "./atoms";

export function useDebouncedSearchText(
  initialState: string
): [string, typeof setText, typeof resetText] {
  const [text, setText] = useState(initialState);
  const debouncedText = useDebounce(text);
  const setSearchTerm = useSetAtom(searchTermAtom);

  const resetText = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (debouncedText.trim().length < 3) {
      setSearchTerm("");
      return;
    }
    setSearchTerm(debouncedText.trim());
  }, [debouncedText, setSearchTerm]);

  return [text, setText, resetText];
}
