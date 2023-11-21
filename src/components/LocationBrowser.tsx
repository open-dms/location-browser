"use client";

import { LocationContextProvider } from "@/lib/location/context";
import { LocationState } from "@/lib/location/reducer";
import { useEffect } from "react";
import { InfoPanel } from "./InfoPanel";
import { LocationList } from "./LocationList";
import { LocationMap } from "./LocationMap";

export const LocationBrowser = ({
  initialState,
}: {
  initialState: LocationState;
}) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/maptile-cache.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);
  return (
    <div className="h-full grid grid-cols-[350px_1fr] grid-rows-[1fr_auto]">
      <LocationContextProvider initialState={initialState}>
        <LocationList className="row-span-2" />
        <LocationMap />
        <InfoPanel />
      </LocationContextProvider>
    </div>
  );
};
