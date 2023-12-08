import { fetchFrom } from "@/lib/fetch";
import { SearchResultItem } from "@/lib/osm";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { searchResultMapAtom } from "./atoms";

export function useSearch(
  query: string,
  threshold = 3,
  delay = 500
): [typeof result, typeof reset] {
  const searches = useAtomValue(searchResultMapAtom);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [result, setResult] = useState<Array<SearchResultItem>>([]);

  useEffect(() => {
    if (query.trim().length < threshold) {
      return;
    }
    const timer = setTimeout(() => setDebouncedValue(query.trim()), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, query, threshold]);

  useEffect(() => {
    if (!debouncedValue) {
      setResult([]);
      return;
    }

    if (searches.has(debouncedValue)) {
      setResult(searches.get(debouncedValue) || []);
      return;
    }

    fetchFrom<Array<SearchResultItem>>(
      `/location/search?q=${debouncedValue}`
    ).then((_result) => {
      searches.set(debouncedValue, _result);
      setResult(_result);
    });
  }, [debouncedValue, searches]);

  const reset = () => {
    setDebouncedValue("");
  };

  return [result, reset];
}
