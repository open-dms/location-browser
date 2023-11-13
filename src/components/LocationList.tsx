"use client";

import { LocationContext } from "@/context/location";
import { Feature } from "@/lib/location";
import { useContext } from "react";

export const LocationList = () => {
  const {
    state: { locations, total },
    dispatch,
  } = useContext(LocationContext);

  const showMap = (item: Feature) => {
    dispatch({ type: "select", payload: item });
  };

  const loadMore = async () => {
    const skip = locations.length;
    const { data } = await fetch(`locations?skip=${skip}`).then<{
      data: Feature[];
    }>((response) => response.json());
    dispatch({ type: "add", payload: data });
  };

  return (
    <div className="h-full overflow-y-auto">
      <ul>
        {Array.from(locations.values()).map((item) => (
          <li key={item.id}>
            <button onClick={() => showMap(item)}>
              {item.properties.name}
            </button>
          </li>
        ))}
      </ul>
      {total > locations.length && (
        <button className="bg-teal-400" onClick={() => loadMore()}>
          Mehr..
        </button>
      )}
    </div>
  );
};
