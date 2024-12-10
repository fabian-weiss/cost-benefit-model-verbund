import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import EnvironmentalResultsList from "@/components/result-lists/EnvironmentalResultsList";
import TableContainer from "@/components/TableContainer";
import { downloadAsPdf } from "@/utils/download-as-pdf";
import React from "react";

function EnvironmentalResultsDialog(props: { closeDialog: () => void }) {
  return (
    <DialogContainer closeDialog={props.closeDialog} fullscreen>
      <TableContainer id="environmental-results-table">
        <EnvironmentalResultsList />
      </TableContainer>
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() =>
          downloadAsPdf("environmental-results-table", "environmental-model")
        }
      />
    </DialogContainer>
  );
}

export default EnvironmentalResultsDialog;
