"use client";

import { toBounds } from "@/lib/geojson";
import { useMapInfoListener } from "@/lib/hooks/useMapInfoListener";
import {
  FillLayerSpecification,
  LineLayerSpecification,
  LngLatBounds,
} from "maplibre-gl";
import { selectedGeoState } from "@/lib/location/selectors";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl/maplibre";

const layerStyle: {
  stroke: LineLayerSpecification;
  fill: FillLayerSpecification;
} = {
  stroke: {
    id: "stroke",
    source: "osm",
    type: "line",
    paint: {
      "line-color": "rgb(42, 77, 208, .8)",
      "line-width": 3,
    },
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
  },
  fill: {
    id: "fill",
    source: "osm",
    type: "fill",
    paint: {
      "fill-color": "rgb(42, 77, 208, .4)",
    },
  },
};
import { useRecoilValueLoadable } from "recoil";

export const LocationMap = () => {
  const selected = useRecoilValueLoadable(selectedGeoState).valueMaybe();

  const geojson = selected && {
    type: "FeatureCollection",
    features: [selected],
  };

  const bounds = useMemo(() => {
    if (!selected) {
      return new LngLatBounds([
        5.98865807458, 47.3024876979, 15.0169958839, 54.983104153,
      ]);
    }
    return toBounds(selected);
  }, [selected]);

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!bounds) {
      return;
    }
    mapRef.current?.fitBounds(bounds, { padding: 100, speed: 3 });
  }, [mapRef, bounds]);

  return (
    <div className="relative">
      <Map
        ref={mapRef}
        reuseMaps
        initialViewState={{
          bounds,
        }}
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
