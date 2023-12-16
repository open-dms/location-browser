import { Feature, SearchResultItem } from "@/lib/osm";
import { atom } from "jotai";

export const selectedLocationAtom = atom<SearchResultItem | undefined>(
  undefined
);

export const locationDetailsAtom = atom<
  Map<Feature["id"], Feature | Promise<Feature>>
>(new Map());
