import { GoalStep } from "../model";

export type STATE = {
  steps: GoalStep[];
};
export type ACTIONTYPE =
  | { type: "ADD_STEP"; payload: GoalStep }
  | { type: "EDIT_STEP"; payload: GoalStep }
  | { type: "DELETE_STEP"; payload: number };

export const initialState: STATE = {
  steps: [],
};

export const stepReducer = (state: STATE, action: ACTIONTYPE): STATE => {
  switch (action.type) {
    case "ADD_STEP": {
      return {
        ...state,
        steps: [...state.steps, action.payload],
      };
    }
    case "EDIT_STEP":
      return {
        ...state,
        steps: state.steps.map((step: GoalStep) =>
          step.id === action.payload.id ? action.payload : step
        ),
      };
    case "DELETE_STEP":
      return {
        ...state,
        steps: state.steps.filter(
          (step: GoalStep) => step.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
