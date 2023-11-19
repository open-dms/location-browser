"use client";

import { LocationContext } from "@/lib/location/context";
import { Feature } from "@/lib/osm";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { MoreButton } from "./MoreButton";
import { dispatchFetchQuery } from "@/lib/location/action";
import { LoadingState } from "@/lib/location/reducer";

export const LocationList = ({ className }: { className: string }) => {
  const {
    state: { locations, total, selected, info, loadingState },
    dispatch,
  } = useContext(LocationContext);

  const showMap = (item: Feature) => {
    dispatch({ type: "select", payload: item });
  };

  const loadMore = async () => {
    if (!info) {
      return;
    }
    const skip = locations.length;
    dispatchFetchQuery(dispatch, info, skip);
  };

  useEffect(() => {
    if (!info) {
      return;
    }
    dispatchFetchQuery(dispatch, info);
  }, [dispatch, info]);

  return (
    <div
      className={classNames(
        "flex flex-col h-full bg-slate-200 dark:bg-slate-800 shadow-slate-950 shadow-lg",
        className
      )}
    >
      <ul className="flex-1 basis-0 overflow-y-auto">
        {Array.from(locations.values()).map((item) => (
          <li key={item.id}>
            <button
              onClick={() => showMap(item)}
              className={classNames(
                "hover:bg-white dark:hover:bg-emerald-500 px-4 py-2 w-full text-left",
                "select-none",
                { "bg-white dark:bg-emerald-500": selected?.id === item.id }
              )}
            >
              {item.properties.name}
            </button>
          </li>
        ))}
      </ul>
      {total > locations.length && (
        <div className="flex flex-col gap-2 px-4 py-2 text-center bg-slate-50 dark:bg-slate-900">
          <MoreButton
            onClick={loadMore}
            loading={loadingState === LoadingState.Loading}
          />
          <small className="italic">Total locations: {total}</small>
        </div>
      )}
    </div>
  );
};
