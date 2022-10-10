import React, { useEffect } from "react";
import { useGoalSteps } from "../context/Context";
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

  // add edit for each
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
            </svg>
            {step.isDone ? "完了" : "作業中"}
          </label>
          {step.isDone ? (
            <span className="gs-check">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64H64V352zm64-208c0 35.3-28.7 64-64 64V144h64zM512 304v64H448c0-35.3 28.7-64 64-64zM448 96h64v64c-35.3 0-64-28.7-64-64z" />
            </svg>
            {step.isPaid ? "入金済" : "未入金"}
          </label>
          {step.isPaid ? (
            <span className="gs-check">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
          </svg>
          編集
        </span>
        <span className="gs-delete" onClick={() => handleDelete(step.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
          削除
        </span>
      </span>
    </form>
  );
};

export default GoalStepRow;
