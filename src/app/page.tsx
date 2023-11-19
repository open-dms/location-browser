import { LocationBrowser } from "@/components/LocationBrowser";
import { Feature, getList, getTotal } from "@/lib/osm";
import { LngLatBounds } from "maplibre-gl";

export default async function Page() {
  const initialBounds = new LngLatBounds([
    4.692273083596632, 47.30248769790106, 16.31338087488578, 54.98310415300074,
  ]);
  const locations: Feature[] = await getList(initialBounds);
  const total = await getTotal();
  return <LocationBrowser initialState={{ locations, total }} />;
}
