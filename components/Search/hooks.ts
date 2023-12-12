import { fetchFrom } from "@/lib/fetch";
import { SearchResultItem } from "@/lib/osm";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { searchResultMapAtom } from "./atoms";

export function useSearch(
  query: string,
  delay = 500,
  threshold = 3
): {
  result: typeof result;
  reset: typeof reset;
  loading: typeof loading;
  debouncing: typeof debouncing;
} {
  const searches = useAtomValue(searchResultMapAtom);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Array<SearchResultItem>>([]);
  const [debouncing, setDebouncing] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const search = query.trim();

    if (search.length < threshold) {
      setResult([]);
      return;
    }

    if (searches.has(search)) {
      setResult(searches.get(search) || []);
      return;
    }

    setDebouncing(true);

    timer.current = setTimeout(async () => {
      setDebouncing(false);

      if (searches.has(search)) {
        setResult(searches.get(search) || []);
        return;
      }

      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      fetchFrom<Array<SearchResultItem>>(`/location/search?q=${search}`).then(
        (_result) => {
          searches.set(search, _result);
          setResult(_result);
          setLoading(false);
        }
      );
    }, delay);

    return () => {
      clearTimeout(timer.current);
    };
  }, [delay, query, searches, threshold]);

  const reset = () => {
    setResult([]);
    clearTimeout(timer.current);
  };

  return { result, reset, loading, debouncing };
}
