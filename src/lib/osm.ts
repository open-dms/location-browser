import { MapState } from "@/lib/location/reducer";
import { Collection } from "mongodb";
import { cache } from "react";
import { connect } from "./mongodb";
import { LngLatBounds, LngLatBoundsLike } from "maplibre-gl";

export interface Feature {
  id: string;
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: [number, number][][] };
  properties: {
    name: string;
  };
}

async function getCollection(): Promise<Collection<Feature>> {
  const client = await connect();
  return client.db("odms").collection<Feature>("osm");
}

export const getList = cache(
  async (
    bounds: LngLatBoundsLike,
    skip = 0,
    limit = 20
  ): Promise<Feature[]> => {
    const data = await (
      await getCollection()
    )
      .find(
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
      )
      .toArray();
    return data.map(({ _id, ...item }) => ({ ...item, id: _id.toJSON() }));
  }
);

export const getTotal = cache(async (query = {}): Promise<number> => {
  return (await getCollection()).countDocuments(query);
});
