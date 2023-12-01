import { Collection, Document, MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient;

export async function connect(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  console.log(`Connecting to MongoDB "${process.env.MONGODB_URI}"`);

  return (client = await new MongoClient(process.env.MONGODB_URI || "", {
    serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
    },
  }).connect());
}

export async function getCollection<T extends Document>(
  dbName: string,
  collectionName: string
): Promise<Collection<T>> {
  const client = await connect();
  return client.db(dbName).collection<T>(collectionName);
}
