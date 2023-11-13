import { MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient;

export async function connect(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  return (client = await new MongoClient(process.env.MONGODB_URI || "", {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }).connect());
}
