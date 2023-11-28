import { infoState } from "@/lib/location/atoms";
import { MapInfo } from "@/lib/osm";
import { MapLibreEvent } from "maplibre-gl";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useDebounce } from "usehooks-ts";

export function useMapInfoListener() {
  const [_, setInfo] = useRecoilState(infoState);
  const [mapState, setMapState] = useState<MapInfo>();
  const debouncedState = useDebounce(mapState);

  const callback = useCallback((e: MapLibreEvent) => {
    const zoom = e.target.getZoom();
    const bounds = e.target.getBounds();
    const center = e.target.getCenter();
    const radius = center.distanceTo(bounds._ne);
    setMapState(() => ({ zoom, bounds, center, radius }));
  }, []);

  useEffect(() => {
    debouncedState && setInfo(debouncedState);
  }, [debouncedState, setInfo]);

  return {
    onLoad: callback,
    onDragEnd: callback,
    onMoveEnd: callback,
    onZoomEnd: callback,
  };
}
