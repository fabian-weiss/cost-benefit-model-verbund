"use client";
import { InputGroupType } from "@/types/input-group-type";
import React from "react";
import InputGroup from "./InputGroup";
import "@/styles/input-grid.css";
import InputField from "./InputField";

/** @ param id is "financial" | "societal" | "environmental"  */

function InputGrid(props: {
  inputGroups: InputGroupType[];
  id: string;
  header?: string;
}) {
  return (
    <div>
      {props.header && <h4 className="fw-input-grid-header">{props.header}</h4>}
      <div className="fw-input-grid">
        {props.inputGroups.map((inputGroup, index) => (
          <InputGroup
            inputGroup={{ ...inputGroup }}
            key={`${props.id}-${index}`}
            // removeCallback={inputGroup.removeCallback}
          />
        ))}
      </div>
    </div>
  );
}

export default InputGrid;
