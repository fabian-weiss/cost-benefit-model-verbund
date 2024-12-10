"use client";

import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import InputField from "@/components/InputField";
import { useState } from "react";

function CommentDialog(props: {
  comment?: string;
  submitComment: (comment?: string) => void;
  closeDialog: () => void;
}) {
  const [comment, setComment] = useState<string>(props.comment ?? "");

  //   useEffect(() => {
  //     setComment(props.comment ?? "");
  //   }, [props.comment]);

  return (
    <DialogContainer
      closeDialog={props.closeDialog}
      title="Add a comment"
      body="Comments will be added to the overall report to clarify why certain inputs have been selected."
    >
      <InputField
        inputField={{
          id: "comment-dialog-input",
          onTextAreaChange(event) {
            setComment(event.target.value);
          },
          value: comment,
          isTextArea: true,
        }}
      />
      <ActionButton
        fullWidth
        label="Save"
        fillType="solid"
        onClick={() => props.submitComment(comment)}
      />
    </DialogContainer>
  );
}

export default CommentDialog;
