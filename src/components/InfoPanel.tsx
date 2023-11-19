import { LocationContext } from "@/context/location";
import classNames from "classnames";
import { useContext, useState } from "react";

export const InfoPanel = () => {
  const [open, setOpen] = useState(false);
  const {
    state: { info },
  } = useContext(LocationContext);
  return (
    <div
      className={classNames(
        "grid grid-cols-[min-content_auto]",
        "bg-slate-200 dark:bg-slate-800 text-slate-400 font-light text-sm"
      )}
    >
      <div className="border-r-[1px] border-slate-950 p-2">
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
        className={classNames(
          "p-2 h-6 overflow-hidden text-slate-600 transition-all",
          {
            "h-fit max-h-96 overflow-y-auto text-inherit": open,
          }
        )}
      >
        {info && (
          <dl className="grid grid-cols-[max-content_auto] gap-x-2">
            <dt>Bounds</dt>
            <dd>{info?.bounds.toString()}</dd>
            <dt>Center</dt>
            <dd>{info.center.toString()}</dd>
            <dt>Zoom</dt>
            <dd>{info.zoom}</dd>
          </dl>
        )}
      </div>
    </div>
  );
};
