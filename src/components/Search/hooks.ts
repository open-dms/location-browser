import { fetchFrom } from "@/lib/fetch";
import { SearchResultItem } from "@/lib/osm";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { searchResultMapAtom } from "./atoms";

export function useSearch(
  query: string,
  delay = 500,
  threshold = 3
): [typeof result, typeof reset] {
  const searches = useAtomValue(searchResultMapAtom);
  const [result, setResult] = useState<Array<SearchResultItem>>([]);

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

    const timer = setTimeout(() => {
      if (searches.has(search)) {
        setResult(searches.get(search) || []);
        return;
      }

      fetchFrom<Array<SearchResultItem>>(`/location/search?q=${search}`).then(
        (_result) => {
          searches.set(search, _result);
          setResult(_result);
        }
      );
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, query, searches, threshold]);

  const reset = () => {
    setResult([]);
  };

  return [result, reset];
}
