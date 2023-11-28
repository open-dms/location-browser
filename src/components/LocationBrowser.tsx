"use client";

import { totalState } from "@/lib/location/atoms";
import { locationListState } from "@/lib/location/selectors";
import { Feature } from "@/lib/osm";
import { useEffect } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { InfoPanel } from "./InfoPanel";
import { LocationList } from "./LocationList";
import { LocationMap } from "./LocationMap";

export const LocationBrowser = ({
  initialState,
}: {
  initialState: { locations: Array<Feature>; total: number };
}) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/maptile-cache.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  const initializeState = ({ set }: MutableSnapshot) => {
    set(locationListState, initialState.locations);
    set(totalState, initialState.total);
  };

  return (
    <div className="h-full grid grid-cols-[350px_1fr] grid-rows-[1fr_auto]">
      <RecoilRoot initializeState={initializeState}>
        <LocationList className="row-span-2" />
        <LocationMap />
        <InfoPanel />
      </RecoilRoot>
    </div>
  );
};
