"use client";
import { InputGroupType } from "@/types/input-group-type";
import React from "react";
import InputGroup from "./InputGroup";
import "@/styles/input-grid.css";
import DynamicInputGroup from "./DynamicInputGroup";
import { DynamicFinancialInput } from "@/types/financials/dynamic-financial-input";

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
          <div key={`${props.id}-${index}`}>
            {inputGroup.isDynamic ? (
              <DynamicInputGroup
                inputGroup={inputGroup}
                values={inputGroup.dynamicValues ?? []}
                removeCallback={(value: DynamicFinancialInput) =>
                  inputGroup.dynamicRemoveCallback!(value)
                }
              />
            ) : (
              <InputGroup
                inputGroup={inputGroup}
                // removeCallback={inputGroup.removeCallback}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputGrid;
