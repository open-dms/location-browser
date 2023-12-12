import { useAtom } from "jotai";
import { MapLibreEvent } from "maplibre-gl";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { mapInfoAtom } from "./atoms";
import { MapInfo } from "./typings";

export function useMapInfoListener() {
  const [mapInfo, setMapInfo] = useAtom(mapInfoAtom);
  const [state, setState] = useState<MapInfo>();
  const debouncedState = useDebounce(state);

  const callback = useCallback((e: MapLibreEvent) => {
    const zoom = e.target.getZoom();
    const bounds = e.target.getBounds();
    const center = e.target.getCenter();
    const radius = center.distanceTo(bounds._ne);
    setState(() => ({ zoom, bounds, center, radius }));
  }, []);

  useEffect(() => {
    debouncedState && setMapInfo(debouncedState);
  }, [debouncedState, setMapInfo]);

  return {
    onLoad: callback,
    onDragEnd: callback,
    onMoveEnd: callback,
    onZoomEnd: callback,
  };
}
