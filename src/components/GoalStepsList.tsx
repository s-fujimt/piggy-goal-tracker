import React, { useEffect, useMemo } from "react";
import { useGoalSteps } from "../context/Context";
import GoalStepRow from "./GoalStepRow";

const GoalStepsList: React.FC = () => {
  const {
    state: { steps },
  } = useGoalSteps();

  const sortedSteps = useMemo(() => {
    return steps.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }, [steps]);

  return (
    <div className="gs-list">
      {sortedSteps.map((step) => (
        <GoalStepRow step={step} key={step.id} />
      ))}
    </div>
  );
};

export default GoalStepsList;
