import React from "react";
import { useGoalSteps } from "../context/Context";
import GoalStepRow from "./GoalStepRow";

const GoalStepsList: React.FC = () => {
  const {
    state: { steps },
  } = useGoalSteps();

  return (
    <div className="gs-list">
      {steps.map((step) => (
        <GoalStepRow step={step} key={step.id} />
      ))}
    </div>
  );
};

export default GoalStepsList;
