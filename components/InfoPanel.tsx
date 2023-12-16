import clsx from "clsx";
import { useAtom } from "jotai";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { Copy } from "./Copy";
import { mapInfoAtom } from "./LocationMap/atoms";

export const InfoPanel = () => {
  const [open, setOpen] = useState(false);
  const [info] = useAtom(mapInfoAtom);
  return (
    <div className="absolute flex w-full z-10 bottom-7 p-4 justify-end pointer-events-none">
      <div
        className={clsx(
          "sm:w-1/2 xl:w-1/3 pointer-events-auto",
          "grid grid-cols-[min-content_auto]",
          "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-light text-sm",
          "rounded-lg shadow-md"
        )}
      >
        <div className="flex items-end border-r-[1px] border-slate-300 dark:border-slate-950 px-2 pb-[10px]">
          <button onClick={() => setOpen((open) => !open)}>
            <ChevronUp
              className={clsx("transition-all", {
                "rotate-180": open,
              })}
            />
          </button>
        </div>
        <div
          className={clsx("m-3 transition-all", {
            "h-5 overflow-hidden text-slate-400 dark:text-slate-600": !open,
            "h-fit max-h-96 overflow-y-auto": open,
          })}
        >
          {info && (
            <dl className="grid grid-cols-1 lg:grid-cols-[max-content_auto] gap-2 items-start">
              <dt>Bounds</dt>
              <dd className="flex flex-row items-baseline justify-between">
                {info?.bounds.toArray().flat().join(", ")}
                <Copy />
              </dd>
              <dt>Center</dt>
              <dd className="flex flex-row items-baseline justify-between">
                {info.center.toArray().join(", ")}
                <Copy />
              </dd>
              <dt>Aprox. radius (m)</dt>
              <dd className="flex flex-row items-baseline justify-between">
                {info.radius}
                <Copy />
              </dd>
              <dt>Zoom</dt>
              <dd className="flex flex-row items-baseline justify-between">
                {info.zoom}
                <Copy />
              </dd>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};
