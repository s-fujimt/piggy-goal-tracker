import React, { useEffect } from "react";
import { GoalStep } from "../model";

type GoalStepProps = {
  step: GoalStep;
  steps: GoalStep[];
  setSteps: React.Dispatch<React.SetStateAction<GoalStep[]>>;
};

const GoalStepRow: React.FC<GoalStepProps> = ({ step, steps, setSteps }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editValue, setEditValue] = React.useState<string>(
    step.stepValue.toString()
  );

  const handleDone = (id: number) => {
    setSteps(
      steps.map((s) => {
        if (s.id === id) {
          return { ...s, isDone: !s.isDone };
        }
        return s;
      })
    );
  };

  const handlePaid = (id: number) => {
    setSteps(
      steps.map((s) => {
        if (s.id === id) {
          return { ...s, isPaid: !s.isPaid };
        }
        return s;
      })
    );
  };

  const handleDelete = (id: number) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setSteps(
      steps.map((s) => {
        if (s.id === id) {
          return { ...s, stepValue: parseFloat(editValue) || 0 };
        }
        return s;
      })
    );
    setEdit(false);
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form onSubmit={(e) => handleEdit(e, step.id)}>
      {edit ? (
        <input
          ref={inputRef}
          type="input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      ) : (
        <span>
          {step.stepValue}
          {step.unit}
        </span>
      )}
      <input
        type="checkbox"
        checked={step.isDone}
        onChange={() => handleDone(step.id)}
      />
      Done
      <input
        type="checkbox"
        checked={step.isPaid}
        onChange={() => handlePaid(step.id)}
      />
      Paid
      <span
        onClick={() => {
          if (!edit) {
            setEdit(!edit);
          }
        }}
      >
        Edit
      </span>
      <span onClick={() => handleDelete(step.id)}>Delete</span>
    </form>
  );
};

export default GoalStepRow;
