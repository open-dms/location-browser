"use client";

import { LocationContextProvider, LocationState } from "@/context/location";
import { useEffect } from "react";
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
    <div className="h-full grid grid-cols-[minmax(250px,max-content)_1fr]">
      <LocationContextProvider initialState={initialState}>
        <LocationList />
        <LocationMap />
      </LocationContextProvider>
    </div>
  );
};
