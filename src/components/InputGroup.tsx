import { InputGroupType } from "@/types/input-group-type";
import React from "react";
import InputField from "./InputField";
import "@/styles/input-group.css";
import InputValueList from "./InputValueList";

function InputGroup(props: {
  inputGroup: InputGroupType;
  removeCallback: (value: number) => void;
}) {
  return (
    <div className="fw-input-group-container">
      {/* <label className="fw-label">{props.inputGroup.label}</label> */}
      <div className="fw-input-group-wrapper">
        <InputField
          key={props.inputGroup.inputField.id}
          {...props.inputGroup.inputField}
        />
        <InputValueList
          values={props.inputGroup.values}
          removeCallback={(value: number) => props.removeCallback(value)}
          isCurrency={props.inputGroup.isCurrency}
          suffix={props.inputGroup.suffix}
        />
      </div>
    </div>
  );
}

export default InputGroup;
