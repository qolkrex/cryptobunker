"use client";
import React, { useState, useRef, useEffect } from "react";

const TestPage: React.FC = () => {
  const inputs = useRef<HTMLInputElement[]>([]);
  console.log(inputs.current.map((input) => input.value));

  useEffect(() => {
    const handleKeyDown = (index: number) => (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        inputs.current[index].value = "";
        if (index !== 0) inputs.current[index - 1].focus();
      } else {
        if (
          index === inputs.current.length - 1 &&
          inputs.current[index].value !== ""
        ) {
          return true;
        } else if (
          (event.keyCode > 47 && event.keyCode < 58) ||
          (event.keyCode > 64 && event.keyCode < 91)
        ) {
          inputs.current[index].value = event.key;
          if (index !== inputs.current.length - 1)
            inputs.current[index + 1].focus();
          event.preventDefault();
        }
      }
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
      <input
        ref={(el) => {
          if (el) inputs.current[0] = el;
        }}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        id="first"
        maxLength={1}
      />
      <input
        ref={(el) => {
          if (el) inputs.current[1] = el;
        }}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        id="second"
        maxLength={1}
      />
      <input
        ref={(el) => {
          if (el) inputs.current[2] = el;
        }}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        id="third"
        maxLength={1}
      />
      <input
        ref={(el) => {
          if (el) inputs.current[3] = el;
        }}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        id="fourth"
        maxLength={1}
      />
      <input
        ref={(el) => {
          if (el) inputs.current[4] = el;
        }}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        id="fifth"
        maxLength={1}
      />
      <input
        ref={(el) => {
          if (el) inputs.current[5] = el;
        }}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        id="sixth"
        maxLength={1}
      />
    </div>
  );
};
export default TestPage;
