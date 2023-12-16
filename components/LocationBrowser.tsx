"use client";

import { Provider } from "jotai";
import { useEffect } from "react";
import { InfoPanel } from "./InfoPanel";
import { Sidebar } from "./Sidebar";
import { LocationMap } from "./LocationMap";

export const LocationBrowser = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/maptile-cache.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  return (
    <div className="relative h-full">
      <Provider>
        <Sidebar />
        <InfoPanel />
        <LocationMap />
      </Provider>
    </div>
  );
};
