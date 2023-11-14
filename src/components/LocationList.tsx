"use client";

import { LocationContext } from "@/context/location";
import { Feature } from "@/lib/osm";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { MoreButton } from "./MoreButton";

export const LocationList = () => {
  const {
    state: { locations, total, selected },
    dispatch,
  } = useContext(LocationContext);
  const [loading, setLoading] = useState(false);

  const showMap = (item: Feature) => {
    dispatch({ type: "select", payload: item });
  };

  const loadMore = async () => {
    setLoading(true);
    const skip = locations.length;
    const { data } = await fetch(`locations?skip=${skip}`).then<{
      data: Feature[];
    }>((response) => response.json());
    dispatch({ type: "add", payload: data });
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-200">
      <ul className="flex-1 basis-0 overflow-y-auto">
        {Array.from(locations.values()).map((item) => (
          <li key={item.id}>
            <button
              onClick={() => showMap(item)}
              className={classNames(
                "hover:bg-white px-4 py-2 w-full text-left",
                "select-none",
                { "bg-white": selected?.id === item.id }
              )}
            >
              {item.properties.name}
            </button>
          </li>
        ))}
      </ul>
      {total > locations.length && (
        <div className="flex flex-col gap-2 px-4 py-2 text-center bg-slate-50">
          <MoreButton onClick={loadMore} loading={loading} />
          <small className="italic">Total locations: {total}</small>
        </div>
      )}
    </div>
  );
};
