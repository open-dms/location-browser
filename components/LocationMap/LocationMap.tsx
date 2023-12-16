import { Feature } from "@/lib/osm";
import { useAtomValue } from "jotai";
import { LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { LngLatLike } from "react-map-gl";
import Map, { Layer, MapRef, Source } from "react-map-gl/maplibre";
import {
  locationDetailsAtom,
  selectedLocationAtom,
} from "../SearchResult/atoms";
import { useMapInfoListener } from "./hooks";
import { layerStyle } from "./layerStyles";

export const LocationMap = () => {
  const mapRef = useRef<MapRef>(null);
  const details = useAtomValue(locationDetailsAtom);
  const current = useAtomValue(selectedLocationAtom);
  const [focused, setFocused] = useState<Feature>();

  useEffect(() => {
    if (!current || !details || !details.has(current.id)) {
      return;
    }
    const item = details.get(current.id);
    if (item instanceof Promise) {
      return;
    }
    setFocused(item);
  }, [current, details]);

  const bounds = useMemo(
    () =>
      focused?.bounds
        ? new LngLatBounds(
            ...focused.bounds.map<LngLatLike>(([lng, lat]) => [lng - 0.02, lat])
          )
        : new LngLatBounds([
            3.4365658477748298, 44.00000000000017, 18.693075093532144, 57,
          ]),
    [focused]
  );

  useEffect(() => {
    mapRef.current?.fitBounds(bounds, { padding: 100, speed: 3 });
  }, [mapRef, bounds]);

  const geojson = focused && {
    type: "FeatureCollection",
    features: [focused],
  };

  return (
    <div className="w-full h-full">
      <Map
        ref={mapRef}
        reuseMaps
        initialViewState={{
          bounds,
        }}
        maxBounds={[0, 44, 20, 57]}
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
