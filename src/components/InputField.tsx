import { InputFieldType } from "@/types/input-field-type";
import "@/styles/input-field.css";

function InputField(props: InputFieldType) {
  return (
    <div className="fw-input-field-container">
      <div className="fw-input-field-header">
        {props.label && <label className="fw-label">{props.label}</label>}
        {props.actionWidget && <>{props.actionWidget}</>}
      </div>
      {props.description && (
        <p className="fw-fs12 fw-text-disabled">{props.description}</p>
      )}
      <div className="fw-input-wrapper">
        {props.prefix && (
          <div className="fw-prefix-suffix-wrapper">
            <p className="fw-text-disabled">{props.prefix}</p>
          </div>
        )}
        <input
          spellCheck={false}
          className={`fw-input`}
          type={props.type}
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          required={props.required}
        />
        {props.suffix && (
          <div className="fw-prefix-suffix-wrapper">
            <p className="fw-text-disabled">{props.suffix}</p>
          </div>
        )}
      </div>
      {props.error && (
        <p className="fw-fs12 fw-text-error fw-pt5">{props.error}</p>
      )}
    </div>
  );
}

export default InputField;
