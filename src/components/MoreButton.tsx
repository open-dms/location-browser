import { MouseEventHandler } from "react";

export const MoreButton = ({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    disabled={loading}
    className="bg-emerald-500 hover:enabled:bg-emerald-600 text-emerald-50 w-full rounded p-2 flex flex-col items-center"
    onClick={onClick}
  >
    {loading ? (
      <svg viewBox="0 0 100 100" className="w-4 animate-spin">
        <defs>
          <mask id="ring">
            <rect width="100%" height="100%" fill="white"></rect>
            <circle cx="50" cy="50" r="39" fill="black"></circle>{" "}
            <polygon
              points="50,50 65,0 100,0 100,100 65,100"
              fill="black"
              opacity=".5"
            ></polygon>
          </mask>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="currentColor"
          mask="url(#ring)"
        ></circle>
      </svg>
    ) : (
      <svg viewBox="0 0 100 100" className="w-4">
        <polygon points="1,25 99,25 50,75" fill="currentColor"></polygon>
      </svg>
    )}
  </button>
);
