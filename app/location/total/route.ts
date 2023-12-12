import { getTotal } from "@/lib/osm";

export async function GET(request: Request) {
  const data = await getTotal();
  return Response.json({ data });
}
