"use client";

import { Provider, createStore } from "jotai";
import { useEffect } from "react";
import { InfoPanel } from "./InfoPanel";
import { LocationMap } from "./LocationMap";
import { Sidebar } from "./Sidebar";

export const LocationBrowser = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/maptile-cache.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  return (
    <div className="h-full grid grid-cols-[350px_1fr] grid-rows-[1fr_auto]">
      <Provider>
        <Sidebar className="row-span-2" />
        <LocationMap />
        <InfoPanel />
      </Provider>
    </div>
  );
};
