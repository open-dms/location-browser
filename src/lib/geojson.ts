import {
  Feature,
  Geometry,
  GeometryCollection,
  Point,
  Position,
} from "geojson";
import { LngLatBounds, LngLatLike } from "maplibre-gl";

function isPosition(
  coord: Position | Position[] | Position[][] | Position[][][]
): coord is Position {
  return !Array.isArray(coord[0]);
}

// Function to recursively flatten an array of coordinates
function flattenCoordinates(
  coordinates: Position | Position[] | Position[][] | Position[][][]
): Position[] {
  if (isPosition(coordinates)) {
    return [coordinates];
  }
  return coordinates.reduce((flattened: Position[], coord): Position[] => {
    if (isPosition(coord)) {
      return [...flattened, coord];
    } else {
      return flattened.concat(flattenCoordinates(coord));
    }
  }, []);
}

function isGeometryCollection(
  geometry: Geometry
): geometry is GeometryCollection {
  return geometry.type === "GeometryCollection";
}

function isPoint(geometry: Geometry): geometry is Point {
  return geometry.type === "Point";
}

// Function to calculate bounds from a flattened array of coordinates
export function toBounds(feature: Feature | Pick<Feature, "geometry">) {
  let coordinates: LngLatLike[] = [];
  const { geometry } = feature;

  if (isGeometryCollection(geometry)) {
    return;
  } else if (isPoint(geometry)) {
    return new LngLatBounds(geometry.coordinates as LngLatLike);
  }

  coordinates = flattenCoordinates(geometry.coordinates) as LngLatLike[];

  return coordinates.reduce((bounds, coord) => {
    return bounds.extend(coord);
  }, new LngLatBounds(coordinates[0], coordinates[0]));
}
