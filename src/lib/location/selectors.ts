import { fetchFrom } from "@/lib/fetch";
import { Feature } from "@/lib/osm";
import { selector } from "recoil";
import { infoState, locationState, selectedState } from "./atoms";

function isError<R>(
  response:
    | {
        data: R;
      }
    | {
        error: string;
      }
): response is { error: string } {
  return "error" in response;
}

export const locationListState = selector({
  key: "locationList",
  get: async ({ get }) => {
    const info = get(infoState);

    if (!info) {
      return [];
    }

    const result = await fetchFrom<Feature[]>(
      `location?&bounds=${info.bounds.toArray().flat().join(",")}`
    );

    if (isError(result)) {
      throw new Error(result.error);
    }

    return result.data;
  },
  set: ({ set }, newValue) => {
    set(locationState, newValue);
  },
});

export const selectedGeoState = selector({
  key: "selectedGeo",
  get: async ({ get }) => {
    const selected = get(selectedState);

    if (!selected) {
      return null;
    }

    const result = await fetchFrom<Pick<Feature, "id" | "geometry">>(
      `location/geometry/${selected.id}`
    );

    if (isError(result)) {
      throw new Error(result.error);
    }

    return result.data;
  },
});
