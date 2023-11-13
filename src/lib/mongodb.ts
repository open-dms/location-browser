import { MongoClient, ServerApiVersion } from "mongodb";

const credentials = process.env.MONGO_CERT;

let client: MongoClient;

export async function connect(): Promise<MongoClient> {
  if (client) {
    return client;
  }
  return (client = await new MongoClient(process.env.MONGO_URI || "", {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1,
  }).connect());
}
