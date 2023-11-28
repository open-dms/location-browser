import { atom } from "recoil";
import { Feature, MapInfo } from "@/lib/osm";

export const locationState = atom<Array<Feature>>({
  key: "locations",
  default: [],
});

export const totalState = atom<number>({
  key: "total",
  default: 0,
});

export const selectedState = atom<Feature | null>({
  key: "selected",
  default: null,
});

export const infoState = atom<MapInfo | null>({
  key: "info",
  default: null,
});
