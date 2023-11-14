import { Collection } from "mongodb";
import { connect } from "./mongodb";
import { cache } from "react";

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
  async (skip = 0, limit = 20): Promise<Feature[]> => {
    const data = await (
      await getCollection()
    )
      .find(
        {},
        {
          limit,
          skip,
        }
      )
      .toArray();
    return data.map(({ _id, ...item }) => ({ ...item, id: _id.toJSON() }));
  }
);

export const getTotal = cache(async (query = {}): Promise<number> => {
  return (await getCollection()).countDocuments(query);
});
