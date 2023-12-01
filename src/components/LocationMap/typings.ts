import { LngLat, LngLatBounds } from "maplibre-gl";

export interface MapInfo {
  bounds: LngLatBounds;
  zoom: number;
  center: LngLat;
  radius: number;
}
