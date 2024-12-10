import { InputGroupType } from "@/types/input-group-type";
import React from "react";
import InputField from "./InputField";
import "@/styles/dynamic-input-group.css";
import InputHeader from "./InputHeader";
import Dropdown from "./Dropdown";
import IconButton from "./IconButton";
import { PiChatTeardropText } from "react-icons/pi";
import { DynamicFinancialInput } from "@/types/financials/dynamic-financial-input";
import InputValueList from "./InputValueList";
import { ValueType } from "@/enums/ValueType";

function DynamicInputGroup(props: {
  inputGroup: InputGroupType;
  values: DynamicFinancialInput[];
  removeCallback: (value: DynamicFinancialInput) => void;
  //removeCallback: (value: number) => void;
}) {
  return (
    <div className="fw-dynamic-input-group-container">
      {!props.inputGroup.disableComments &&
        props.inputGroup.handleShowComments != undefined && (
          <IconButton
            className="fw-comment-button"
            onClick={() => props.inputGroup.handleShowComments!()}
            icon={<PiChatTeardropText size={12} />}
          />
        )}
      <InputHeader {...props.inputGroup} />
      <div className="fw-dynamic-input-group-inputs">
        {props.inputGroup.inputFields?.map((inputField) => (
          <div key={inputField.id} className="fw-dynamic-input-group-wrapper">
            <InputField
              // key={props.inputGroup.inputField.id}
              inputField={{ ...inputField }}
            />
          </div>
        ))}
      </div>
      {props.inputGroup.dropdownFields?.map((dropdownField) => (
        <Dropdown key={dropdownField.id} {...dropdownField} />
      ))}
      {props.inputGroup.submitLabel && props.inputGroup.submitCallback && (
        <div
          onClick={props.inputGroup.submitCallback}
          className="fw-dynamic-input-group-submit"
        >
          {props.inputGroup.submitLabel}
        </div>
      )}
      {props.values && (
        <InputValueList
          values={[]}
          dynamicValues={props.values}
          removeCallbackDynamic={(value: DynamicFinancialInput) =>
            props.removeCallback(value)
          }
          valueType={ValueType.CURRENCY}
          suffix={`in year`}
          //prefix={"€"}
        />
      )}
    </div>
  );
}

export default DynamicInputGroup;
