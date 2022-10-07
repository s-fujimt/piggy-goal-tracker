import React from "react";
import { GoalStep } from "../model";
import GoalStepRow from "./GoalStepRow";

interface GoalStepsListProps {
  steps: GoalStep[];
  setSteps: React.Dispatch<React.SetStateAction<GoalStep[]>>;
}

const GoalStepsList: React.FC<GoalStepsListProps> = ({ steps, setSteps }) => {
  return (
    <div>
      {steps.map((step) => (
        <GoalStepRow
          step={step}
          key={step.id}
          steps={steps}
          setSteps={setSteps}
        />
      ))}
    </div>
  );
};

export default GoalStepsList;
