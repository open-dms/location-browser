"use client";

import { LocationContext } from "@/context/location";
import { toBounds } from "@/lib/geojson";
import {
  FillLayerSpecification,
  LineLayerSpecification,
  LngLatBounds,
  MapLibreEvent,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext, useEffect, useMemo, useRef } from "react";
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

export const LocationMap = () => {
  const {
    state: { selected },
    dispatch,
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

  function sendMapInfo(e: MapLibreEvent) {
    const zoom = e.target.getZoom();
    const bounds = e.target.getBounds();
    const center = e.target.getCenter();
    dispatch({ type: "info", payload: { zoom, bounds, center } });
  }

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
        onLoad={sendMapInfo}
        onDragEnd={sendMapInfo}
        onMoveEnd={sendMapInfo}
        onZoomEnd={sendMapInfo}
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
      >
        <img
          src="https://api.maptiler.com/resources/logo.svg"
          alt="MapTiler logo"
        />
      </a>
    </div>
  );
};
