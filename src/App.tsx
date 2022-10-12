import React, { useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalStepsList from "./components/GoalStepsList";
import InputField from "./components/InputField";
import { useGoalSteps } from "./context/Context";
import Pig from "./Icons/Pig";
import { GoalStep } from "./model";

const App: React.FC = () => {
  const [goal, setGoal] = useState<number>(0);
  const {
    state: { steps },
  } = useGoalSteps();

  //todo dont calculate multiple times
  const calculateTotal = (steps: GoalStep[]) => {
    return steps.reduce((acc, cur) => acc + cur.stepValue, 0);
  };
  const calculatePercentage = (total: number, goal: number) => {
    return Math.round((total / goal) * 100);
  };

  return (
    <div className="App">
      <header>
        <span className="h-8 w-8 mr-2 fill-dark bg-light p-1 rounded-lg">
          <Pig />
        </span>
        PiggyGoals
      </header>
      <main>
        {goal ? (
          <>
            <div>目標: {goal}円</div>
            <div>現在: {calculateTotal(steps)}円</div>
            <div>
              達成率: {calculatePercentage(calculateTotal(steps), goal)}%
            </div>
            {/* todo add pig */}
            {/* todo animate */}
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="100"
            height="100"
          >
            <linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopOpacity="1" stopColor="royalblue" />
              <stop
                offset={calculatePercentage(calculateTotal(steps), goal) + "%"}
                stopOpacity="1"
                stopColor="royalblue"
              />
              <stop
                offset={calculatePercentage(calculateTotal(steps), goal) + "%"}
                stopOpacity="0"
                stopColor="royalblue"
              />
              <stop offset="100%" stopOpacity="0" stopColor="royalblue" />
            </linearGradient>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="url(#lg)"
              stroke="crimson"
              stroke-width="5"
            />
          </svg> */}
            <InputField />
            <GoalStepsList />
          </>
        ) : (
          <GoalForm setGoal={setGoal} />
        )}
      </main>
    </div>
  );
};

export default App;
