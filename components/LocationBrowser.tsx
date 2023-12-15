"use client";

import { Provider } from "jotai";
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
    <div className="h-full">
      <Provider>
        <Sidebar />
        <InfoPanel />
        <LocationMap />
      </Provider>
    </div>
  );
};
