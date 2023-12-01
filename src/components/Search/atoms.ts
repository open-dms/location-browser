import { fetchFrom } from "@/lib/fetch";
import { SearchResultItem } from "@/lib/osm";
import { atom } from "jotai";
import { atomWithCache } from "jotai-cache";

export const searchTermAtom = atom("");
export const searchResultAtom = atomWithCache(async (get) => {
  const query = get(searchTermAtom);
  if (!query || query.trim().length < 3) {
    return [];
  }
  return fetchFrom<Array<SearchResultItem>>(`/location/search?q=${query}`);
});
