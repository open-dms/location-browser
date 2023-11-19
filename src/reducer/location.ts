import { Feature } from "@/lib/osm";
import { LngLat, LngLatBounds } from "maplibre-gl";
import { Reducer } from "react";

interface MapInfoPayload {
  bounds: LngLatBounds;
  zoom: number;
  center: LngLat;
  radius: number;
}

export interface LocationState {
  locations: Feature[];
  total: number;
  selected?: Feature;
  info?: MapInfoPayload;
}

export type LocationAction =
  | { type: "add"; payload: Feature[] }
  | { type: "select"; payload: Feature }
  | {
      type: "info";
      payload: MapInfoPayload;
    };

export const reducer: Reducer<LocationState, LocationAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "add":
      state = {
        ...state,
        locations: state.locations.concat(
          action.payload.filter(
            (item) => !state.locations.find(({ id }) => id === item.id)
          )
        ),
      };
      break;
    case "select":
      state = {
        ...state,
        selected: action.payload,
      };
      break;
    case "info":
      state = {
        ...state,
        info: action.payload,
      };
      break;
  }

  return state;
};
