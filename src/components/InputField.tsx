"use client";
import { InputFieldType } from "@/types/input-field-type";
import "@/styles/input-field.css";
import InputValueList from "./InputValueList";

function InputField(props: { inputField: InputFieldType }) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (
      document.activeElement === e.target &&
      props.inputField.type === "number"
    ) {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.blur();
      }
    }
  };

  return (
    <div className="fw-input-field-container">
      <div className="fw-input-field-header">
        {props.inputField.label && (
          <label className="fw-label">{props.inputField.label}</label>
        )}
        {props.inputField.actionWidget && <>{props.inputField.actionWidget}</>}
      </div>
      {props.inputField.description && (
        <p className="fw-fs12 fw-text-disabled">
          {props.inputField.description}
        </p>
      )}
      <div className="fw-input-wrapper">
        {props.inputField.prefix && (
          <div className="fw-prefix-suffix-wrapper">
            <p className="fw-text-disabled">{props.inputField.prefix}</p>
          </div>
        )}
        {props.inputField.isTextArea ? (
          <textarea
            rows={6}
            className="fw-input"
            id={props.inputField.id}
            value={props.inputField.value}
            placeholder={props.inputField.placeholder}
            onChange={props.inputField.onTextAreaChange}
          />
        ) : (
          <input
            spellCheck={false}
            className={`fw-input`}
            type={props.inputField.type}
            id={props.inputField.id}
            value={props.inputField.value}
            placeholder={props.inputField.placeholder}
            onChange={props.inputField.onChange}
            onKeyDown={props.inputField.onKeyDown}
            required={props.inputField.required}
            onWheel={handleWheel}
            onBlur={props.inputField.onBlur}
          />
        )}
        {props.inputField.suffix && (
          <div className="fw-prefix-suffix-wrapper">
            <p className="fw-text-disabled">{props.inputField.suffix}</p>
          </div>
        )}
      </div>
      {props.inputField.error && (
        <p className="fw-fs12 fw-text-error fw-pt5">{props.inputField.error}</p>
      )}
      {props.inputField.values &&
        props.inputField.values.length > 0 &&
        props.inputField.valueType && (
          <InputValueList
            values={props.inputField.values}
            removeCallback={(value: number) =>
              props.inputField.removeCallback &&
              props.inputField.removeCallback(value)
            }
            valueType={props.inputField.valueType}
            suffix={props.inputField.valueLabelSuffix}
            prefix={props.inputField.valueLabelPrefix}
          />
        )}
    </div>
  );
}

export default InputField;
