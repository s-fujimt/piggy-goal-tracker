import React, { useRef } from "react";

interface InputFieldProps {
  stepValue: string;
  setStepValue: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  stepValue,
  setStepValue,
  handleAdd,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter value"
        value={stepValue}
        onChange={(e) => setStepValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default InputField;
