import "@/styles/adjustment-button-row.css";
import { AdjustmentButtonRowType } from "@/types/adjustment-button-row-type";
import { PiPlusMinus } from "react-icons/pi";

function AdjustmentButtonRow(props: AdjustmentButtonRowType) {
  return (
    <div className="fw-adjustment-button-row">
      <PiPlusMinus
        className={`${props.disabled ? "disabled" : ""}`}
        size={12}
      />
      {props.adjustments.map((adjustment, index) => (
        <div
          key={`adjustment-button-row-${props.id}-${index}`}
          onClick={() => {
            if (props.disabled === false) {
              props.callback(adjustment);
            }
          }}
          className={`fw-adjustment-button ${props.disabled ? "disabled" : ""}`}
        >
          <p>{adjustment}%</p>
        </div>
      ))}
    </div>
  );
}

export default AdjustmentButtonRow;
