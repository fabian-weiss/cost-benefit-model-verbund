import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import SocietalResultsList from "@/components/result-lists/SocietalResultsList";
import React from "react";

function SocietalResultsDialog(props: { closeDialog: () => void }) {
  return (
    <DialogContainer
      closeDialog={props.closeDialog}
      title="Societal Model Results"
      body="The societal model allows a user to input societal factors on a scale from -2 to 2. These results are then multiplied by their weights."
    >
      <SocietalResultsList />
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() => console.log("Download financial model as pdf")}
      />
    </DialogContainer>
  );
}

export default SocietalResultsDialog;
