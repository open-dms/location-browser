"use client";

import {
  infoState,
  locationState,
  selectedState,
  totalState,
} from "@/lib/location/atoms";
import { locationListState } from "@/lib/location/selectors";
import classNames from "classnames";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { MoreButton } from "./MoreButton";

export const LocationList = ({ className }: { className: string }) => {
  const info = useRecoilValue(infoState);
  const [selected, setSelected] = useRecoilState(selectedState);
  const total = useRecoilValue(totalState);

  const locationsLoadable = useRecoilValueLoadable(locationListState);
  const locations = locationsLoadable.valueMaybe() || [];

  const loadMore = async () => {
    if (!info) {
      return;
    }
    const skip = locations.length;

    // TODO implement using recoil
    // dispatchFetchListQuery(dispatch, info, skip);
  };

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
              onClick={() => setSelected(item)}
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
            loading={locationsLoadable.state === "loading"}
          />
          <small className="italic">Total locations: {total}</small>
        </div>
      )}
    </div>
  );
};
