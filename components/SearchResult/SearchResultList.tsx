import { fetchFrom } from "@/lib/fetch";
import { Feature, SearchResultItem } from "@/lib/osm";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { Loader } from "../Loader";
import { locationDetailsAtom, selectedLocationAtom } from "./atoms";

export const SearchResultList = ({
  value,
  loading = false,
}: {
  value?: SearchResultItem | Array<SearchResultItem>;
  loading?: boolean;
}) => {
  const [selected, setSelected] = useAtom(selectedLocationAtom);
  const [details, setDetails] = useAtom(locationDetailsAtom);

  const valuesArr = value
    ? Array.isArray(value)
      ? value
      : [value]
    : undefined;

  useEffect(() => {
    if (!selected) {
      return;
    }

    if (details.has(selected.id)) {
      return;
    }

    const p = fetchFrom<Feature>(`location/geometry/${selected.id}`);
    details.set(selected.id, p);
    setDetails(new Map(details));
    p.then((data) => {
      details.set(selected.id, data);
      setDetails(new Map(details));
    }).catch((err) => {
      details.delete(selected.id);
      setDetails(new Map(details));
      throw err;
    });
  }, [details, selected, setDetails]);

  if (!loading && (!valuesArr || !valuesArr.length)) {
    return null;
  }

  const selectedDetail = selected ? details.get(selected.id) : undefined;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-auto">
      {loading && <Loader className="flex py-6 justify-center" />}
      {value && (
        <ul className="flex flex-col" role="listbox">
          {valuesArr?.map((item) => (
            <li key={item.id} className="border-b last:border-b-0">
              <button
                role="option"
                aria-selected={item === selected}
                onClick={() => setSelected(item)}
                className={clsx(
                  "grid grid-cols-[1fr,auto]",
                  "text-start w-full p-4",
                  "-outline-offset-2",
                  "hover:bg-slate-100",
                  {
                    "bg-slate-100": item === selected,
                  }
                )}
              >
                <span>{item.name}</span>
                {item === selected && selectedDetail instanceof Promise && (
                  <Loader />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
