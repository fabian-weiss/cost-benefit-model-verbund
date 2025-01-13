"use client";
import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import FinancialResultsList from "@/components/result-lists/FinancialResultsList";
import TableContainer from "@/components/TableContainer";
import { downloadAsPdf } from "@/utils/download-as-pdf";
import React from "react";

function FinancialResultsDialog(props: { closeDialog: () => void }) {
  return (
    <DialogContainer fullscreen closeDialog={props.closeDialog}>
      <TableContainer id="financial-results-table">
        <FinancialResultsList />
      </TableContainer>
      {/* <div>
        {financialModelContext.modelResults &&
          Object.keys(financialModelContext.modelResults.averages).map(
            (key) => {
              return (
                <p key={`financial-dialog-${key}`}>
                  <span>{`${key}:`}</span>
                  {` ${financialModelContext.modelResults?.averages[key]}`}
                </p>
              );
            }
          )}
      </div> */}
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() =>
          downloadAsPdf("financial-results-table", `financial-model`)
        }
      />
    </DialogContainer>
  );
}

export default FinancialResultsDialog;
