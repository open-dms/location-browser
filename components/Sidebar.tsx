import { SearchResultItem } from "@/lib/osm";
import { useState } from "react";
import { Search } from "./Search";
import { useSearch } from "./Search/hooks";
import { SearchResult } from "./SearchResult/SearchResult";

export const Sidebar = () => {
  const [search, setSearch] = useState<SearchResultItem | string | undefined>(
    undefined
  );
  const query = typeof search === "string" ? search : "";
  const results = typeof search !== "string" ? search : undefined;
  const { result: queryResult, loading } = useSearch(query, 0);
  return (
    <div className="absolute flex flex-col gap-4 max-h-full w-full sm:max-w-sm p-4 pb-11 z-10">
      <Search value={search} onChange={setSearch} />
      <SearchResult value={results ?? queryResult} loading={loading} />
    </div>
  );
};
