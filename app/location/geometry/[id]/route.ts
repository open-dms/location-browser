import { getGeometry } from "@/lib/osm";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getGeometry(params.id);
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
