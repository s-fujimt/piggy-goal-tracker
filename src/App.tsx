import React, { useState } from "react";
import Header from "./components/Header";
import GoalForm from "./components/GoalForm";
import GoalOverview from "./components/GoalOverview";
import InputField from "./components/InputField";
import GoalStepsList from "./components/GoalStepsList";

const App: React.FC = () => {
  const [goal, setGoal] = useState<number>(0);

  return (
    <div className="App">
      <Header />
      <main>
        {goal ? (
          <>
            <GoalOverview goal={goal} />
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
