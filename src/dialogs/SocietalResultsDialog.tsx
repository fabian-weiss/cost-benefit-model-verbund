import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import SocietalResultsList from "@/components/result-lists/SocietalResultsList";
import TableContainer from "@/components/TableContainer";
import { downloadAsPdf } from "@/utils/download-as-pdf";
import React from "react";

function SocietalResultsDialog(props: { closeDialog: () => void }) {
  return (
    <DialogContainer closeDialog={props.closeDialog} fullscreen>
      <TableContainer id="societal-results-table">
        <SocietalResultsList />
      </TableContainer>
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() =>
          downloadAsPdf("societal-results-table", "societal-model")
        }
      />
    </DialogContainer>
  );
}

export default SocietalResultsDialog;
