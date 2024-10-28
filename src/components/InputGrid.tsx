"use client";
import { InputGroupType } from "@/types/input-group-type";
import React from "react";
import InputGroup from "./InputGroup";
import "@/styles/input-grid.css";

/** @ param id is "financial" | "societal" | "environmental"  */

function InputGrid(props: {
  inputGroups: InputGroupType[];
  id: "financial" | "societal" | "environmental";
}) {
  return (
    <div className="fw-input-grid">
      {props.inputGroups.map((inputGroup, index) => (
        <InputGroup
          key={`${props.id}-${index}`}
          inputGroup={inputGroup}
          removeCallback={inputGroup.removeCallback}
        />
      ))}
    </div>
  );
}

export default InputGrid;
