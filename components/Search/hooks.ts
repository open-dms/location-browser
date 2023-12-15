import { fetchFrom } from "@/lib/fetch";
import { SearchResultItem } from "@/lib/osm";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const controller = useRef<AbortController>();

  useEffect(() => {
    const search = query.trim();

    if (search.length < threshold) {
      setResult([]);
      return;
    }

    if (searches.has(search)) {
      const _result = searches.get(search) || [];
      if (!(_result instanceof Promise)) {
        setResult(_result);
        return;
      }
    }

    setDebouncing(true);

    timer.current = setTimeout(async () => {
      setDebouncing(false);
      setLoading(true);

      if (controller.current) {
        controller.current.abort("query changed");
      }

      controller.current = new AbortController();

      const p = fetchFrom<Array<SearchResultItem>>(
        `/location/search?q=${search}`,
        { signal: controller.current.signal }
      );

      searches.set(search, p);

      try {
        const _result = await p;
        searches.set(search, _result);
        setResult(_result);
      } catch (err) {
        searches.delete(search);
        if (err instanceof DOMException && err.name !== "AbortError") {
          throw err;
        }
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timer.current);
    };
  }, [delay, query, searches, threshold]);

  const reset = () => {
    clearTimeout(timer.current);
    setLoading(false);
    setDebouncing(false);
    setResult([]);
    if (controller.current) {
      controller.current.abort("reset search");
    }
  };

  return { result, reset, loading, debouncing };
}
