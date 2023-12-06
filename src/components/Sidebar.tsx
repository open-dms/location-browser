"use client";

import classNames from "classnames";
import { Search } from "./Search";

export const Sidebar = ({ className }: { className: string }) => {
  return (
    <div
      className={classNames(
        "flex flex-col h-full bg-slate-200 dark:bg-slate-800 shadow-xl z-10",
        className
      )}
    >
      <Search onSubmit={(item) => alert(JSON.stringify(item))} />
    </div>
  );
};
