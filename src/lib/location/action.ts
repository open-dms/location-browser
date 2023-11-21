import { Dispatch } from "react";
import { Feature } from "../osm";
import { MapState } from "./reducer";
import { fetchFrom } from "../fetch";

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
  | { type: "select"; payload: Feature | Feature["id"] }
  | {
      type: "info";
      payload: MapState;
    }
  | { type: "fetchStart" }
  | { type: "fetchSuccess"; payload: Feature[] }
  | {
      type: "fetchGeometrySuccess";
      payload: Pick<Feature, "id" | "geometry">;
    }
  | { type: "fetchError"; payload: Error };

export async function dispatchFetchListQuery(
  dispatch: Dispatch<LocationAction>,
  mapState: MapState,
  skip = 0
): Promise<void> {
  dispatch({ type: "fetchStart" });
  const result = await fetchFrom<Feature[]>(
    `location?skip=${skip}&bounds=${mapState.bounds.toArray().flat().join(",")}`
  );
  if (isError(result)) {
    return dispatch({ type: "fetchError", payload: new Error(result.error) });
  }
  dispatch({ type: "fetchSuccess", payload: result.data });
}

export async function dispatchFetchGeometry(
  dispatch: Dispatch<LocationAction>,
  id: Feature["id"]
): Promise<void> {
  dispatch({ type: "fetchStart" });
  const result = await fetchFrom<Pick<Feature, "id" | "geometry">>(
    `location/geometry/${id}`
  );
  if (isError(result)) {
    return dispatch({ type: "fetchError", payload: new Error(result.error) });
  }
  dispatch({ type: "fetchGeometrySuccess", payload: result.data });
  dispatch({ type: "select", payload: id });
}
