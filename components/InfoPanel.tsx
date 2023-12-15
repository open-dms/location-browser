import clsx from "clsx";
import { useAtom } from "jotai";
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
          "rounded-sm shadow-md"
        )}
      >
        <div className="flex items-end border-r-[1px] border-slate-300 dark:border-slate-950 p-2">
          <button onClick={() => setOpen((open) => !open)}>
            <svg
              viewBox="0 0 100 100"
              className={clsx("w-[18px] transition-all", {
                "rotate-180": open,
              })}
            >
              <path
                d="M12,35 L50,75 L88,35"
                fill="none"
                stroke="currentColor"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          className={clsx("transition-all", {
            "h-9 overflow-hidden text-slate-400 dark:text-slate-600": !open,
            "h-fit max-h-96 overflow-y-auto": open,
          })}
        >
          {info && (
            <dl className="grid grid-cols-1 lg:grid-cols-[max-content_auto] gap-2 items-start p-2">
              <dt>Bounds</dt>
              <dd>
                {info?.bounds.toArray().flat().join(", ")}
                <Copy />
              </dd>
              <dt>Center</dt>
              <dd>
                {info.center.toArray().join(", ")}
                <Copy />
              </dd>
              <dt>Aprox. radius (m)</dt>
              <dd>
                {info.radius}
                <Copy />
              </dd>
              <dt>Zoom</dt>
              <dd>
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
