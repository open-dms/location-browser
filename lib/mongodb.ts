import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(process.env.MONGODB_URI || "", {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});
