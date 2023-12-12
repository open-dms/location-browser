import { SearchResultItem } from "@/lib/osm";
import classNames from "classnames";
import { useState } from "react";
import { Search } from "./Search";
import { useSearch } from "./Search/hooks";
import { SearchResultList } from "./SearchResultList";

export const Sidebar = ({ className }: { className: string }) => {
  const [search, setSearch] = useState<SearchResultItem | string | undefined>(
    undefined
  );
  const query = typeof search === "string" ? search : "";
  const results = typeof search !== "string" ? search : undefined;
  const { result: queryResult } = useSearch(query, 0);
  return (
    <div
      className={classNames(
        "flex flex-col h-full bg-slate-200 dark:bg-slate-800 shadow-xl p-2 z-10",
        className
      )}
    >
      <Search value={search} onChange={setSearch} />
      <SearchResultList value={results ?? queryResult} />
    </div>
  );
};
