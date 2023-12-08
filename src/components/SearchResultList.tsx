import { SearchResultItem } from "@/lib/osm";
import classNames from "classnames";
import { useAtom } from "jotai";
import { selectedLocationAtom } from "./Search/atoms";

export const SearchResultList = ({
  value,
}: {
  value?: Array<SearchResultItem>;
}) => {
  const [selected, setSelected] = useAtom(selectedLocationAtom);

  if (!value) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-2 p-2" role="listbox">
      {value.map((item) => (
        <li
          key={item.id}
          tabIndex={0}
          role="option"
          aria-selected={item === selected}
        >
          <button
            className={classNames(
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
  );
};
