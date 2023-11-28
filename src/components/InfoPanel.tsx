import { infoState } from "@/lib/location/atoms";
import classNames from "classnames";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Copy } from "./Copy";

export const InfoPanel = () => {
  const [open, setOpen] = useState(false);
  const info = useRecoilValue(infoState);

  return (
    <div
      className={classNames(
        "grid grid-cols-[min-content_auto]",
        "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-light text-sm"
      )}
    >
      <div className="border-r-[1px] border-slate-300 dark:border-slate-950 p-2">
        <button onClick={() => setOpen((open) => !open)}>
          <svg
            viewBox="0 0 100 100"
            className={classNames("w-4 transition-all", {
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
        className={classNames("p-2 transition-all", {
          "h-6 overflow-hidden text-slate-400 dark:text-slate-600": !open,
          "h-fit max-h-96 overflow-y-auto": open,
        })}
      >
        {info && (
          <dl className="grid grid-cols-[max-content_auto] gap-x-2 items-start">
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
  );
};
