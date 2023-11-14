"use client";

import { LocationContextProvider, LocationState } from "@/context/location";
import { LocationList } from "./LocationList";
import { LocationMap } from "./LocationMap";

export const LocationBrowser = ({
  initialState,
}: {
  initialState: LocationState;
}) => {
  return (
    <div className="h-full grid grid-cols-[minmax(250px,max-content)_1fr]">
      <LocationContextProvider initialState={initialState}>
        <LocationList />
        <LocationMap />
      </LocationContextProvider>
    </div>
  );
};
