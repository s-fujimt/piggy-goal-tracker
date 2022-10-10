import React, { createContext, useContext, useReducer } from "react";
import { ACTIONTYPE, initialState, STATE, stepReducer } from "./Reducers";

interface ProviderInterface {
  children: React.ReactNode;
}

const Context = createContext(
  {} as { state: STATE; dispatch: React.Dispatch<ACTIONTYPE> }
);

const Provider: React.FC<ProviderInterface> = ({ children }) => {
  const [state, dispatch] = useReducer(stepReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export const useGoalSteps = () => useContext(Context);

export default Provider;
