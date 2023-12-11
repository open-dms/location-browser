import classNames from "classnames";
import { useState } from "react";
import { Search } from "./Search";
import { SearchResult, hasQuery } from "./Search/types";
import { SearchResultList } from "./SearchResultList";
import { useSearch } from "./Search/hooks";

export const Sidebar = ({ className }: { className: string }) => {
  const [search, setSearch] = useState<SearchResult | undefined>(undefined);
  const query = search ? (hasQuery(search) ? search.query : search?.name) : "";
  const [results] = useSearch(query, 0);
  return (
    <div
      className={classNames(
        "flex flex-col h-full bg-slate-200 dark:bg-slate-800 shadow-xl z-10",
        className
      )}
    >
      <Search value={search} onChange={setSearch} />
      <SearchResultList value={results} />
    </div>
  );
};
