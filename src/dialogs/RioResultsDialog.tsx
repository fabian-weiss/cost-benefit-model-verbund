import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import RioResultsList from "@/components/result-lists/RioResultsList";
import TableContainer from "@/components/TableContainer";
import { downloadAsPdf } from "@/utils/download-as-pdf";
import React from "react";

function RioResultsDialog(props: { closeDialog: () => void }) {
  return (
    <DialogContainer closeDialog={props.closeDialog} fullscreen>
      <TableContainer id="rio-results-table">
        <RioResultsList />
      </TableContainer>

      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        // onClick={() => downloadAsPdf(rioResultsRef, "rio-results.pdf")}
        onClick={() => downloadAsPdf("rio-results-table", "rio-model")}
      />
    </DialogContainer>
  );
}

export default RioResultsDialog;
