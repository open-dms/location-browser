import { Feature } from "@/lib/osm";
import { atom } from "jotai";

export const locationTotalAtom = atom(0);

export const locationFeaturesAtom = atom<Array<Feature>>([]);

export const locationSelectedAtom = atom<Feature | undefined>(undefined);
