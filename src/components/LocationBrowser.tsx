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
    <div className="h-screen grid grid-cols-[250px_1fr]">
      <LocationContextProvider initialState={initialState}>
        <LocationList />
        <LocationMap />
      </LocationContextProvider>
    </div>
  );
};
