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

export const getList = cache(
  async (skip = 0, limit = 20): Promise<Feature[]> => {
    const coll = (await connect()).db("odms").collection<Feature>("locality");
    const data = await coll
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
  const coll = (await connect()).db("odms").collection<Feature>("locality");
  return coll.countDocuments(query);
});
