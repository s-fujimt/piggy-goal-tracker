import React, { useRef, useState } from "react";
import { useGoalSteps } from "../context/Context";
import { db } from "../db";
import Calendar from "../Icons/Calendar";

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
        // TODO prevent input other than numbers
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
      <input
        ref={inputRef}
        type="number"
        // TODO add comma
        placeholder="例）32999"
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
    </form>
  );
};

export default AddGoalStep;
