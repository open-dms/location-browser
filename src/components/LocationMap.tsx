"use client";

import Map, { Layer, MapRef, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Feature,
  FillLayerSpecification,
  LineLayerSpecification,
  LngLatBounds,
  LngLatLike,
} from "maplibre-gl";
import { useContext, useEffect, useMemo, useRef } from "react";
import { LocationContext } from "@/context/location";
import { toBounds } from "@/lib/geojson";

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

export const LocationMap = () => {
  const {
    state: { selected },
  } = useContext(LocationContext);

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
    <Map
      ref={mapRef}
      reuseMaps
      initialViewState={{
        bounds,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={`https://api.maptiler.com/maps/openstreetmap/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
    >
      {geojson && (
        <Source id="boundary" type="geojson" data={geojson}>
          <Layer {...layerStyle.stroke} />
          <Layer {...layerStyle.fill} />
        </Source>
      )}
    </Map>
  );
};
