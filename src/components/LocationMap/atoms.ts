import { atom } from "jotai";
import { MapInfo } from "./typings";

export const mapInfoAtom = atom<MapInfo | undefined>(undefined);
