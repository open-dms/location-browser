import { MapLibreEvent } from "maplibre-gl";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { LocationAction } from "../location/action";
import { MapState } from "../location/reducer";

export function useMapInfoListener(dispatch: Dispatch<LocationAction>) {
  const [mapState, setMapState] = useState<MapState>();
  const debouncedState = useDebounce(mapState);

  const callback = useCallback((e: MapLibreEvent) => {
    const zoom = e.target.getZoom();
    const bounds = e.target.getBounds();
    const center = e.target.getCenter();
    const radius = center.distanceTo(bounds._ne);
    setMapState(() => ({ zoom, bounds, center, radius }));
  }, []);

  useEffect(() => {
    debouncedState && dispatch({ type: "info", payload: debouncedState });
  }, [dispatch, debouncedState]);

  return {
    onLoad: callback,
    onDragEnd: callback,
    onMoveEnd: callback,
    onZoomEnd: callback,
  };
}
