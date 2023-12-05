"use client";

import { locationFeaturesAtom, locationTotalAtom } from "@/lib/location/atoms";
import { Feature } from "@/lib/osm";
import { Provider, createStore } from "jotai";
import { useEffect } from "react";
import { InfoPanel } from "./InfoPanel";
import { Sidebar } from "./Sidebar";
import { LocationMap } from "./LocationMap";

export const LocationBrowser = ({
  initialState,
}: {
  initialState: { total: number; locations: Array<Feature> };
}) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/maptile-cache.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  const store = createStore();
  store.set(locationTotalAtom, initialState.total);
  store.set(locationFeaturesAtom, initialState.locations);

  return (
    <div className="h-full grid grid-cols-[350px_1fr] grid-rows-[1fr_auto]">
      <Provider store={store}>
        <Sidebar className="row-span-2" />
        <LocationMap />
        <InfoPanel />
      </Provider>
    </div>
  );
};
