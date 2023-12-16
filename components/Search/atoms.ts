import { SearchResultItem } from "@/lib/osm";
import { atom } from "jotai";

interface SearchResultValue {
  query: string;
  results: Array<SearchResultItem>;
}

export const searchResultMapAtom = atom<
  Map<string, Array<SearchResultItem> | Promise<Array<SearchResultItem>>>
>(new Map());

export const searchQueryAtom = atom("");

export const currentSearchResultAtom = atom<SearchResultValue | undefined>(
  undefined
);
