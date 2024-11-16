"use client";
import "@/styles/input-header.css";
import AdjustmentButtonRow from "./AdjustmentButtonRow";
import { InputGroupType } from "@/types/input-group-type";
import { useDescriptionDialog } from "@/providers/description-dialog-provider";

function InputHeader(props: InputGroupType) {
  const descriptionDialogContext = useDescriptionDialog();

  const handleShowDescription = () => {
    if (descriptionDialogContext && props.detailedDescription) {
      descriptionDialogContext.handleShowDialog(
        true,
        props.detailedDescription
      );
    }
  };
  return (
    <div className="fw-input-header-container">
      <div className="fw-input-header-info-wrapper">
        <label className="fw-label">{props.inputHeader.label}</label>
        {props.inputHeader.description && (
          <p className="fw-fs12 fw-text-disabled">
            {`${props.inputHeader.description} `}
            {props.detailedDescription && (
              <span
                onClick={() => handleShowDescription()}
                className="fw-fs12 fw-show-description"
              >
                {"View detailed description"}
              </span>
            )}
          </p>
        )}
      </div>
      {props.inputHeader.adjustmentButtonRow && (
        <AdjustmentButtonRow {...props.inputHeader.adjustmentButtonRow} />
      )}
    </div>
  );
}

export default InputHeader;
