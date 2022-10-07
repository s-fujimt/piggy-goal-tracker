import React, { useState } from "react";
import "./App.css";
import GoalStepsList from "./components/GoalStepsList";
import InputField from "./components/InputField";
import { GoalStep } from "./model";

const App: React.FC = () => {
  const [stepValue, setStepValue] = useState<string>("");
  const [steps, setSteps] = useState<GoalStep[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (stepValue) {
      setSteps([
        ...steps,
        {
          id: Date.now(),
          name: "",
          // TODO prevent input other than numbers
          stepValue: parseFloat(stepValue) || 0,
          //TODO add unit selection
          unit: "Yen",
          isDone: false,
          isPaid: false,
          date: new Date(),
        },
      ]);
      setStepValue("");
    }
    console.log(steps);
  };

  return (
    <div className="App">
      <header>Goal Tracker</header>
      <InputField
        stepValue={stepValue}
        setStepValue={setStepValue}
        handleAdd={handleAdd}
      />
      <GoalStepsList steps={steps} setSteps={setSteps} />
    </div>
  );
};

export default App;
