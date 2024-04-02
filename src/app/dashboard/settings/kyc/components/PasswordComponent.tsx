"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  initialState: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

const PasswordComponent: React.FC<Props> = ({ initialState, setState }) => {
  const inputs = useRef<HTMLInputElement[]>([]);
  console.log(inputs.current.map((input) => input.value));

  useEffect(() => {
    const handleKeyDown = (index: number) => (event: KeyboardEvent) => {
      const isNumberKey = /^[0-9]$/.test(event.key);

      if (event.key === "Backspace") {
        inputs.current[index].value = "";
        if (index !== 0) inputs.current[index - 1].focus();
      } else if (isNumberKey) {
        inputs.current[index].value = event.key;
        if (index !== inputs.current.length - 1)
          inputs.current[index + 1].focus();
        event.preventDefault();
      }

      // Update state
      setState(inputs.current.map((input) => input.value));
    };

    inputs.current.forEach((input, index) => {
      input.addEventListener("keydown", handleKeyDown(index));
    });

    return () => {
      inputs.current.forEach((input, index) => {
        input.removeEventListener("keydown", handleKeyDown(index));
      });
    };
  }, []);

  return (
    <div
      id="otp"
      className="flex flex-row justify-center text-center px-2 mt-5 text-black"
    >
      {initialState.map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputs.current[index] = el;
          }}
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="text"
          maxLength={1}
        />
      ))}
    </div>
  );
};
export default PasswordComponent;
