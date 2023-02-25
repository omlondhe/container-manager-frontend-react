import reducer, { initialState } from "./reducer";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { ContextAction, ContextType } from "./types";

const StateContext = createContext<[ContextType, Dispatch<ContextAction>]>([
  initialState,
  () => null,
]);

export const StateProvider = ({ children }: { children?: JSX.Element }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useContextValue = () => useContext(StateContext);
