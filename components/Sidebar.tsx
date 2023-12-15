import { SearchResultItem } from "@/lib/osm";
import { useState } from "react";
import { Search } from "./Search";
import { useSearch } from "./Search/hooks";
import { SearchResultList } from "./SearchResultList";

export const Sidebar = () => {
  const [search, setSearch] = useState<SearchResultItem | string | undefined>(
    undefined
  );
  const query = typeof search === "string" ? search : "";
  const results = typeof search !== "string" ? search : undefined;
  const { result: queryResult } = useSearch(query, 0);
  return (
    <div className="absolute flex flex-col gap-4 w-full sm:max-w-sm p-4 z-10">
      <Search value={search} onChange={setSearch} />
      <SearchResultList value={results ?? queryResult} />
    </div>
  );
};
