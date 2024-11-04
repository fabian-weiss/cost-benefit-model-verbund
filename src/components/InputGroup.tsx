import { InputGroupType } from "@/types/input-group-type";
import React from "react";
import InputField from "./InputField";
import "@/styles/input-group.css";
import InputHeader from "./InputHeader";
import Dropdown from "./Dropdown";

function InputGroup(props: {
  inputGroup: InputGroupType;
  //removeCallback: (value: number) => void;
}) {
  return (
    <div className="fw-input-group-container">
      <InputHeader {...props.inputGroup.inputHeader} />
      {props.inputGroup.inputFields?.map((inputField) => (
        <div key={inputField.id} className="fw-input-group-wrapper">
          <InputField
            // key={props.inputGroup.inputField.id}
            inputField={{ ...inputField }}
          />
        </div>
      ))}
      {props.inputGroup.dropdownFields?.map((dropdownField) => (
        <Dropdown key={dropdownField.id} {...dropdownField} />
      ))}
    </div>
  );
}

export default InputGroup;
