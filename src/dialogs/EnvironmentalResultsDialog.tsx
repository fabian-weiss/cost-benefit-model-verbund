import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import EnvironmentalResultsList from "@/components/result-lists/EnvironmentalResultsList";
import React from "react";

function EnvironmentalResultsDialog(props: { closeDialog: () => void }) {
  return (
    <DialogContainer
      closeDialog={props.closeDialog}
      title="Environmental Model Results"
      body="The environmental model allows a user to input societal factors on a scale from -2 to 2. These results are then multiplied by their weights."
    >
      <EnvironmentalResultsList />
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() => console.log("Download financial model as pdf")}
      />
    </DialogContainer>
  );
}

export default EnvironmentalResultsDialog;
