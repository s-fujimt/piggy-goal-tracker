import React, { useEffect } from "react";
import { useGoalSteps } from "../context/Context";
import Check from "../Icons/Check";
import Delete from "../Icons/Delete";
import Edit from "../Icons/Edit";
import Money from "../Icons/Money";
import Work from "../Icons/Work";
import { GoalStep } from "../model";

type GoalStepProps = {
  step: GoalStep;
};

const GoalStepRow: React.FC<GoalStepProps> = ({ step }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editValue, setEditValue] = React.useState<string>(
    step.stepValue.toString()
  );

  const { dispatch } = useGoalSteps();

  const handleDone = (step: GoalStep) => {
    dispatch({
      type: "EDIT_STEP",
      payload: {
        ...step,
        isDone: !step.isDone,
      },
    });
  };

  const handlePaid = (step: GoalStep) => {
    dispatch({
      type: "EDIT_STEP",
      payload: {
        ...step,
        isPaid: !step.isPaid,
      },
    });
  };

  const handleDelete = (id: number) => {
    dispatch({
      type: "DELETE_STEP",
      payload: id,
    });
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_STEP",
      payload: {
        ...step,
        stepValue: parseInt(editValue),
      },
    });
    setEdit(false);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form onSubmit={(e) => handleEdit(e, step.id)} className="gs-row">
      {edit ? (
        <input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      ) : (
        <div className="gs-details">
          <div>
            <span className="gs-date">
              {step.date.toLocaleDateString("ja-JP")}
            </span>
            {step.name ? <span className="gs-name">{step.name}</span> : ""}
          </div>
          <div>
            <span className="gs-value">{step.stepValue}</span>
            {step.unit}
          </div>
        </div>
      )}
      <span className="gs-actions">
        <span className="gs-done">
          <input
            type="checkbox"
            id="gs-done"
            checked={step.isDone}
            onChange={() => handleDone(step)}
          />
          <label htmlFor="gs-done">
            <Work />
            {step.isDone ? "完了" : "作業中"}
          </label>
          {step.isDone ? (
            <span className="gs-check">
              <Check />
            </span>
          ) : (
            ""
          )}
        </span>
        <span className="gs-paid">
          <input
            type="checkbox"
            id="gs-paid"
            checked={step.isPaid}
            onChange={() => handlePaid(step)}
          />
          <label htmlFor="gs-paid">
            <Money />
            {step.isPaid ? "入金済" : "未入金"}
          </label>
          {step.isPaid ? (
            <span className="gs-check">
              <Check />
            </span>
          ) : (
            ""
          )}
        </span>
        <span
          className="gs-edit"
          onClick={() => {
            if (!edit) {
              setEdit(!edit);
            }
          }}
        >
          <Edit />
          編集
        </span>
        <span className="gs-delete" onClick={() => handleDelete(step.id)}>
          <Delete />
          削除
        </span>
      </span>
    </form>
  );
};

export default GoalStepRow;
