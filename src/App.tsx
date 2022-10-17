import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Settings from "./components/Settings";
import GoalOverview from "./components/GoalOverview";
import InputField from "./components/InputField";
import GoalStepsList from "./components/GoalStepsList";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState<number>(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const initialGoal = useLiveQuery(async () => {
    return (await db.settings.get("goal")) || { value: 0 };
  }, []);

  useEffect(() => {
    if (initialGoal == null) {
      setLoading(true);
    } else {
      if (initialGoal.value) {
        setGoal(Number(initialGoal.value));
      } else {
        setIsSettingsOpen(true);
      }
      setLoading(false);
    }
  }, [initialGoal]);

  return (
    <div className="App">
      <Header openSettings={() => setIsSettingsOpen(true)} />
      <main className="container mx-auto max-w-2xl">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {isSettingsOpen ? (
              <Settings
                setGoal={setGoal}
                goal={goal}
                closeSettings={() => setIsSettingsOpen(false)}
              />
            ) : (
              <>
                <GoalOverview goal={goal} />
                <InputField />
                <GoalStepsList />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
