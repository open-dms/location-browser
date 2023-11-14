import { getList } from "@/lib/osm";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const skip = params.has("skip") ? parseInt(params.get("skip")!) : 0;
  const limit = params.has("limit") ? parseInt(params.get("limit")!) : 20;
  const data = await getList(skip, limit);
  return Response.json({ data });
}
