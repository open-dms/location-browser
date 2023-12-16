import { useAtomValue } from "jotai";
import { LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl/maplibre";
import {
  locationDetailsAtom,
  selectedLocationAtom,
} from "../SearchResult/atoms";
import { useMapInfoListener } from "./hooks";
import { layerStyle } from "./layerStyles";

export const LocationMap = () => {
  const details = useAtomValue(locationDetailsAtom);
  const current = useAtomValue(selectedLocationAtom);
  const selected = (() => {
    if (!current || !details || !details.has(current.id)) {
      return;
    }
    const item = details.get(current.id);
    if (item instanceof Promise) {
      return;
    }
    return item;
  })();

  const bounds = useMemo(
    () =>
      selected?.bounds
        ? new LngLatBounds(...selected.bounds)
        : new LngLatBounds([
            5.98865807458, 47.3024876979, 15.0169958839, 54.983104153,
          ]),
    [selected]
  );

  const mapRef = useRef<MapRef>(null);

  const geojson = selected && {
    type: "FeatureCollection",
    features: [selected],
  };

  useEffect(() => {
    mapRef.current?.fitBounds(bounds, { padding: 100, speed: 3 });
  }, [mapRef, bounds]);

  return (
    <div className="w-full h-full">
      <Map
        ref={mapRef}
        reuseMaps
        initialViewState={{
          bounds,
        }}
        maxBounds={[0, 45, 20, 58]}
        style={{ width: "100%", height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/openstreetmap/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
        {...useMapInfoListener()}
      >
        {geojson && (
          <Source id="boundary" type="geojson" data={geojson}>
            <Layer {...layerStyle.stroke} />
            <Layer {...layerStyle.fill} />
          </Source>
        )}
      </Map>
      <a
        href="https://www.maptiler.com"
        className="absolute left-2 bottom-2 z-10"
        target="_blank"
      >
        <Image
          src="https://api.maptiler.com/resources/logo.svg"
          alt="MapTiler logo"
          width="67"
          height="20"
        />
      </a>
    </div>
  );
};
