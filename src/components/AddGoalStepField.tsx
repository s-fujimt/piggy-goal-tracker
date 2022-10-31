import React, { useRef, useState } from "react";
import { useGoalSteps } from "../context/Context";
import { db } from "../db";
import Calendar from "../Icons/Calendar";
import Plus from "../Icons/Plus";

const AddGoalStep: React.FC = () => {
  const [stepValue, setStepValue] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const { dispatch } = useGoalSteps();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (stepValue) {
      const newStep = {
        id: Date.now(),
        name: "",
        stepValue: parseFloat(stepValue) || 0,
        //TODO add unit selection
        unit: "円",
        isDone: false,
        isPaid: false,
        date,
      };

      db.steps.add(newStep).then(() => {
        dispatch({
          type: "ADD_STEP",
          payload: newStep,
        });
      });

      setStepValue("");
    }
  };

  return (
    <form
      className="add-step-form"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      {/* TODO add unit */}
      <input
        ref={inputRef}
        type="number"
        placeholder="例）10000"
        value={stepValue}
        onChange={(e) => setStepValue(e.target.value)}
      />
      <label
        className="flex flex-col items-center justify-center cursor-pointer mr-3 leading-none"
        htmlFor="date"
        onClick={() => {
          dateRef.current?.showPicker();
        }}
      >
        <span className="flex items-center justify-center w-6 h-6 mb-1">
          <Calendar />
        </span>
        <time style={{ fontSize: "10px" }} className="whitespace-nowrap mt-px">
          {date.toLocaleDateString("ja-JP", {
            month: "long",
            day: "numeric",
          })}
        </time>
        <input
          type="date"
          id="date"
          ref={dateRef}
          className="opacity-0 h-0 w-0"
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </label>
      <button type="submit">
        <Plus />
      </button>
    </form>
  );
};

export default AddGoalStep;
