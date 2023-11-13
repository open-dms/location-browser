import { getTotal } from "@/lib/location";

export async function GET(request: Request) {
  const data = await getTotal();
  return Response.json({ data });
}
