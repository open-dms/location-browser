import { Feature } from "@/lib/osm";
import { LngLat, LngLatBounds } from "maplibre-gl";
import { Reducer } from "react";
import { LocationAction } from "./action";

export interface LocationState {
  locations: Feature[];
  total: number;
  selected?: Feature;
  info?: MapState;
  loadingState?: LoadingState;
  error?: Error;
}

export interface MapState {
  bounds: LngLatBounds;
  zoom: number;
  center: LngLat;
  radius: number;
}

export enum LoadingState {
  Loading = 1,
  Success = 2,
  Error = 3,
}

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
        selected: state.locations.find(
          ({ id }) =>
            id ===
            (typeof action.payload === "string"
              ? action.payload
              : action.payload.id)
        ),
      };
      break;
    case "info":
      state = {
        ...state,
        info: action.payload,
      };
      break;
    case "fetchStart":
      state = {
        ...state,
        loadingState: LoadingState.Loading,
      };
      break;
    case "fetchSuccess":
      state = {
        ...state,
        loadingState: LoadingState.Success,
        locations: action.payload,
      };
      break;
    case "fetchGeometrySuccess":
      state = {
        ...state,
        loadingState: LoadingState.Success,
        locations: state.locations.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
      break;
    case "fetchError":
      state = {
        ...state,
        loadingState: LoadingState.Error,
        error: action.payload,
      };
      break;
  }

  return state;
};
