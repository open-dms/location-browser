import { LocationBrowser } from "@/components/LocationBrowser";
import { getTotal, getList, Feature } from "@/lib/location";

export default async function Page() {
  const locations: Feature[] = await getList();
  const total = await getTotal();
  return <LocationBrowser initialState={{ locations, total }} />;
}
