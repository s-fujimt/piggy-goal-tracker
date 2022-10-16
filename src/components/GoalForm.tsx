import React from "react";
import { db } from "../db";

interface GoalFormProps {
  setGoal: React.Dispatch<React.SetStateAction<number>>;
}

const GoalForm: React.FC<GoalFormProps> = ({ setGoal }) => {
  const handleSetGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("goal") as HTMLInputElement;
    const goal = Number(input.value);
    db.settings.put({ key: "goal", value: goal.toString() });
    setGoal(goal);
  };

  return (
    <div className="set-goal-popup">
      <div className="set-goal-inner">
        <div className="set-goal-title">目標を設定しよう！</div>
        <form onSubmit={handleSetGoal}>
          <input
            type="number"
            step="any"
            min="0"
            name="goal"
            id="goal"
            placeholder="目標金額（円）"
          />
          <button type="submit">設定</button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
