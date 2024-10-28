import "@/styles/adjustment-button-row.css";
import { PiPlusMinus } from "react-icons/pi";

function AdjustmentButtonRow(props: {
  adjustments: number[];
  callback: (adjustment: number) => void;
  id: string;
  disabled?: boolean;
}) {
  return (
    <div className="fw-adjustment-button-row">
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
