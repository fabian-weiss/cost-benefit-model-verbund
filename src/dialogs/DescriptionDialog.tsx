"use client";

import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import { DescriptionDialogType } from "@/types/description-dialog-type";

function DescriptionDialog(props: {
  description: DescriptionDialogType;
  closeDialog: () => void;
}) {
  //   useEffect(() => {
  //     setComment(props.comment ?? "");
  //   }, [props.comment]);

  return (
    <DialogContainer closeDialog={props.closeDialog} title="Factor description">
      <p className="fw-text-bold">{props.description.header}</p>
      <div>
        {props.description.descriptionRows.map((desc, index) => (
          <p key={`dialog-description-row-${index}`}>{desc}</p>
        ))}
      </div>
      <ActionButton
        fullWidth
        label="Close"
        fillType="solid"
        onClick={() => props.closeDialog()}
      />
    </DialogContainer>
  );
}

export default DescriptionDialog;
