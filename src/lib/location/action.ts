import { Dispatch } from "react";
import { Feature } from "../osm";
import { MapState } from "./reducer";

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

export type LocationAction =
  | { type: "add"; payload: Feature[] }
  | { type: "select"; payload: Feature }
  | {
      type: "info";
      payload: MapState;
    }
  | { type: "fetchStart" }
  | { type: "fetchSuccess"; payload: Feature[] }
  | { type: "fetchError"; payload: Error };

export async function dispatchFetchQuery(
  dispatch: Dispatch<LocationAction>,
  mapState: MapState,
  skip = 0
) {
  dispatch({ type: "fetchStart" });
  const result = await fetch(
    `locations?skip=${skip}&bounds=${mapState.bounds
      .toArray()
      .flat()
      .join(",")}`
  ).then<
    | {
        data: Feature[];
      }
    | { error: string }
  >((response) => response.json());
  if (isError(result)) {
    return dispatch({ type: "fetchError", payload: new Error(result.error) });
  }
  dispatch({ type: "fetchSuccess", payload: result.data });
}
