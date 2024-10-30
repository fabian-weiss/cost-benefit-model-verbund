import { InputHeaderType } from "@/types/input-header-type";
import "@/styles/input-header.css";
import AdjustmentButtonRow from "./AdjustmentButtonRow";

function InputHeader(props: InputHeaderType) {
  return (
    <div className="fw-input-header-container">
      <div className="fw-input-header-info-wrapper">
        <label className="fw-label">{props.label}</label>
        {props.description && (
          <p className="fw-fs12 fw-text-disabled">{props.description}</p>
        )}
      </div>
      {props.adjustmentButtonRow && (
        <AdjustmentButtonRow {...props.adjustmentButtonRow} />
      )}
    </div>
  );
}

export default InputHeader;
