import { useLiveQuery } from "dexie-react-hooks";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../db";
import { ACTIONTYPE, initialState, STATE, stepReducer } from "./Reducers";

interface ProviderInterface {
  children: React.ReactNode;
}

const Context = createContext(
  {} as { state: STATE; dispatch: React.Dispatch<ACTIONTYPE> }
);

const Provider: React.FC<ProviderInterface> = ({ children }) => {
  const [state, dispatch] = useReducer(stepReducer, initialState);

  const steps = useLiveQuery(async () => {
    return db.steps.toArray();
  }, []);

  useEffect(() => {
    if (steps) {
      dispatch({
        type: "SET_STEPS",
        payload: steps,
      });
    }
  }, [steps]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export const useGoalSteps = () => useContext(Context);

export default Provider;
