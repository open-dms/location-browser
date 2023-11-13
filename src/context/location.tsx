import { Feature } from "@/lib/location";
import {
  Dispatch,
  PropsWithChildren,
  Reducer,
  createContext,
  useReducer,
} from "react";

export interface LocationState {
  locations: Feature[];
  total: number;
  selected?: Feature;
}
type LocationAction =
  | { type: "add"; payload: Feature[] }
  | { type: "select"; payload: Feature };

const reducer: Reducer<LocationState, LocationAction> = (state, action) => {
  switch (action.type) {
    case "add":
      state = {
        ...state,
        locations: state.locations.concat(action.payload),
      };
      break;
    case "select":
      state = {
        ...state,
        selected: action.payload,
      };
      break;
  }
  return state;
};

const defaultContext: {
  state: LocationState;
  dispatch: Dispatch<LocationAction>;
} = {
  state: {
    locations: [],
    total: 0,
    selected: undefined,
  },
  dispatch: () => undefined,
};

export const LocationContext = createContext(defaultContext);

export const LocationContextProvider = ({
  children,
  initialState,
}: PropsWithChildren & { initialState: LocationState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};
