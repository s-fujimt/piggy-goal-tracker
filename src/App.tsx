import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import GoalForm from "./components/GoalForm";
import GoalOverview from "./components/GoalOverview";
import InputField from "./components/InputField";
import GoalStepsList from "./components/GoalStepsList";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState<number>(0);

  const initialGoal = useLiveQuery(async () => {
    return (await db.settings.get("goal")) || { value: 0 };
  }, []);

  useEffect(() => {
    if (initialGoal == null) {
      setLoading(true);
    } else {
      setGoal(Number(initialGoal.value));
      setLoading(false);
    }
  }, [initialGoal]);

  return (
    <div className="App">
      <Header />
      <main>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {goal ? (
              <>
                <GoalOverview goal={goal} />
                <InputField />
                <GoalStepsList />
              </>
            ) : (
              <GoalForm setGoal={setGoal} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
