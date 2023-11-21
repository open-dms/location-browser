import { getList } from "@/lib/osm";
import { LngLatBounds, LngLatBoundsLike } from "maplibre-gl";

function isLngLatBoundsArray(
  bounds?: unknown[]
): bounds is [number, number, number, number] {
  return Array.isArray(bounds) && bounds.length === 4;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const bounds = params.get("bounds")?.split(",").map(parseFloat);

  if (!isLngLatBoundsArray(bounds)) {
    return Response.json({ error: "bounds required" });
  }

  const skip = params.has("skip") ? parseInt(params.get("skip")!) : 0;
  const limit = params.has("limit") ? parseInt(params.get("limit")!) : 20;

  const data = await getList(LngLatBounds.convert(bounds), skip, limit);
  return Response.json({ data });
}
