import { fetchFrom } from "@/lib/fetch";
import { SearchResultItem } from "@/lib/osm";
import { atom } from "jotai";

export const locationsAtom = atom<Array<SearchResultItem>>([]);
export const searchesAtom = atom<Map<string, Array<SearchResultItem>>>(
  new Map()
);

export const searchTermAtom = atom("");

export const searchResultAtom = atom(async (get) => {
  const query = get(searchTermAtom);

  if (!query) {
    return [];
  }

  const searches = get(searchesAtom);

  if (searches.has(query)) {
    return searches.get(query);
  }

  const result = await fetchFrom<Array<SearchResultItem>>(
    `/location/search?q=${query}`
  );
  searches.set(query, result);
  return result;
});

interface SearchResultValue {
  query: string;
  results: Array<SearchResultItem>;
}

export const currentSearchResultAtom = atom<SearchResultValue | undefined>(
  undefined
);

export const selectedLocationAtom = atom<SearchResultItem | null>(null);
