import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import RioResultsList from "@/components/result-lists/RioResultsList";
import React from "react";

function RioResultsDialog() {
  return (
    <DialogContainer
      title="RIO Model Results"
      body="The RIO model allows a user to input risk, innovation and opportunity factors on a scale from -2 to 2. These results are then multiplied by their weights."
    >
      <RioResultsList />
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() => console.log("Download rio model as pdf")}
      />
    </DialogContainer>
  );
}

export default RioResultsDialog;
