import { FillLayerSpecification, LineLayerSpecification } from "maplibre-gl";

export const layerStyle: {
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
