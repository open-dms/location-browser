import { LocationAction, LocationState, reducer } from "@/reducer/location";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";

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
