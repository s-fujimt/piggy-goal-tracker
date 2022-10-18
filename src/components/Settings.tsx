import React from "react";
import { db } from "../db";

interface SettingsProps {
  setGoal: React.Dispatch<React.SetStateAction<number>>;
  goal: number;
  closeSettings: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  setGoal,
  goal,
  closeSettings,
}) => {
  const [newGoal, setNewGoal] = React.useState(goal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGoal(Number(e.target.value));
  };

  const handleSetGoal = (e: React.FormEvent) => {
    e.preventDefault();
    db.settings.put({ key: "goal", value: newGoal.toString() });
    setGoal(newGoal);
    closeSettings();
  };

  const handleRemoveAllSteps = () => {
    db.steps.clear();
    closeSettings();
  };

  const handleResetSettings = () => {
    db.settings.clear();
    setGoal(0);
    closeSettings();
  };

  return (
    <div className="set-goal-popup">
      <div className="set-goal-inner">
        {goal ? (
          <>
            <div className="set-goal-title">設定</div>
            <form onSubmit={handleSetGoal}>
              <label htmlFor="goal" className="set-goal-label">
                新しい目標金額（円）
              </label>
              <input
                onChange={handleChange}
                type="number"
                step="any"
                min="0"
                name="goal"
                id="goal"
                value={newGoal}
                placeholder="新しい目標金額（円）"
              />
              <button type="submit">目標を変更</button>
            </form>
            <hr />
            <div onClick={handleRemoveAllSteps}>Remove all steps</div>
            <div onClick={handleResetSettings}>Reset everything</div>
          </>
        ) : (
          <>
            <div className="set-goal-title">目標を設定しよう！</div>
            <form onSubmit={handleSetGoal}>
              <input
                onChange={handleChange}
                type="number"
                step="any"
                min="0"
                name="goal"
                id="goal"
                placeholder="目標金額（円）"
              />
              <button type="submit">設定</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
