"use client";

import {
  locationFeaturesAtom,
  locationSelectedAtom,
} from "@/lib/location/atoms";
import { Feature } from "@/lib/osm";
import classNames from "classnames";
import { useAtomValue } from "jotai";

export const LocationList = ({ className }: { className: string }) => {
  // const {
  //   state: { locations, total, selected, info, loadingState },
  //   dispatch,
  // } = useContext(LocationContext);
  const locations = useAtomValue(locationFeaturesAtom);
  const selected = useAtomValue(locationSelectedAtom);

  const showMap = (item: Feature) => {
    // dispatchFetchGeometry(dispatch, item.id);
  };

  // useEffect(() => {
  //   if (!info) {
  //     return;
  //   }
  //   dispatchFetchListQuery(dispatch, info);
  // }, [dispatch, info]);

  return (
    <div
      className={classNames(
        "flex flex-col h-full bg-slate-200 dark:bg-slate-800 shadow-xl z-10",
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
    </div>
  );
};
