"use client";
import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import FinancialResultsList from "@/components/result-lists/FinancialResultsList";
import React from "react";

function FinancialResultsDialog() {
  return (
    <DialogContainer
      title="Financial Model Results"
      body="The financial model creates all combinations of the given inputs. These results are the averages across all combinations."
    >
      <FinancialResultsList />
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
        onClick={() => console.log("Download financial model as pdf")}
      />
    </DialogContainer>
  );
}

export default FinancialResultsDialog;
