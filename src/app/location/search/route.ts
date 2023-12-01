import { search } from "@/lib/osm";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("q") as string;
  const data = await search(query);
  return Response.json({ data });
}
