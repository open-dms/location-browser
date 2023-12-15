import { SearchResultItem } from "@/lib/osm";
import clsx from "clsx";
import { useAtom } from "jotai";
import { selectedLocationAtom } from "./Search/atoms";

export const SearchResultList = ({
  value,
}: {
  value?: SearchResultItem | Array<SearchResultItem>;
}) => {
  const [selected, setSelected] = useAtom(selectedLocationAtom);

  if (!value) {
    return null;
  }

  return (
    <div className="bg-white rounded shadow-lg">
      <ul className="flex flex-col gap-2 p-2" role="listbox">
        {(Array.isArray(value) ? value : [value]).map((item) => (
          <li
            key={item.id}
            tabIndex={0}
            role="option"
            aria-selected={item === selected}
          >
            <button
              className={clsx(
                "w-full text-start rounded-md dark:border-slate-600 border-[1px] p-4",
                "dark:hover:bg-slate-700",
                { "dark:bg-slate-700": item === selected }
              )}
              onClick={() => setSelected(item)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
