import { InputGroupType } from "@/types/input-group-type";
import React from "react";
import InputField from "./InputField";
import "@/styles/input-group.css";
import InputHeader from "./InputHeader";
import Dropdown from "./Dropdown";
import IconButton from "./IconButton";
import { PiChatTeardropText } from "react-icons/pi";

function InputGroup(props: {
  inputGroup: InputGroupType;
  //removeCallback: (value: number) => void;
}) {
  return (
    <div className="fw-input-group-container">
      {!props.inputGroup.disableComments &&
        props.inputGroup.handleShowComments != undefined && (
          <IconButton
            className="fw-comment-button"
            onClick={() => props.inputGroup.handleShowComments!()}
            icon={<PiChatTeardropText size={12} />}
          />
        )}
      <InputHeader {...props.inputGroup} />
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
