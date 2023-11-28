import { LngLat, LngLatBounds, LngLatBoundsLike } from "maplibre-gl";
import { Collection, ObjectId, WithId } from "mongodb";
import { cache } from "react";
import { connect } from "./mongodb";

export interface Feature {
  id: string;
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: [number, number][][] };
  properties: {
    name: string;
  };
}

export interface MapInfo {
  bounds: LngLatBounds;
  center: LngLat;
  radius: number;
  zoom: number;
}

async function getCollection(): Promise<Collection<Feature>> {
  const client = await connect();
  return client.db("odms").collection<Feature>("osm");
}

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

function mapOr<V, R>(predicate: (value: V) => R) {
  return (value: V | null): null | R => {
    return value === null ? null : predicate(value);
  };
}

function withoutId<T>({ _id, ...item }: WithId<T>): T {
  return item as T;
}

function fromWithId<T>(item: WithId<T>): T & { id: string } {
  const { _id } = item;
  return { ...withoutId(item), id: _id.toString() };
}

export const getList = cache(
  async (
    bounds: LngLatBoundsLike,
    skip = 0,
    limit = 20
  ): Promise<Feature[]> => {
    const result = (await getCollection()).find(
      {
        geometry: {
          $geoIntersects: {
            $geometry: {
              type: "LineString",
              coordinates: LngLatBounds.convert(bounds).toArray(),
            },
          },
        },
      },
      {
        limit,
        skip,
        projection: { "properties.name": 1, "properties.adminLevel": 1 },
        sort: { "properties.adminLevel": 1 },
      }
    );
    return (await result.toArray()).filter(notNull).map(fromWithId);
  }
);

export const getGeometry = cache(
  async (id: string): Promise<Feature | null> => {
    return (await getCollection())
      .findOne(
        {
          _id: new ObjectId(id),
        },
        {
          projection: { geometry: 1 },
        }
      )
      .then(mapOr(fromWithId));
  }
);

export const getTotal = cache(async (query = {}): Promise<number> => {
  return (await getCollection()).countDocuments(query);
});
