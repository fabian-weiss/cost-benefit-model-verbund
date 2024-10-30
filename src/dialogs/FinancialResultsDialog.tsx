"use client";
import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import ResultEntry from "@/components/ResultEntry";
import { ResultInterpretation } from "@/enums/ResultInterpretation";
import { useFinancialModel } from "@/providers/financial-model-provider";
import { FinancialResults } from "@/types/financials/financial-results";
import { formatToEuro } from "@/utils/format-to-euro";
import { formatToPercent } from "@/utils/format-to-percent";
import { mean } from "mathjs";
import React from "react";

function FinancialResultsDialog() {
  const financialModelContext = useFinancialModel();
  return (
    <DialogContainer
      title="Financial Model Results"
      body="The financial model creates all combinations of the given inputs. These results are the averages across all combinations."
    >
      {financialModelContext.modelResults && (
        <div>
          <ResultEntry
            factor="Total Cashflow"
            value={formatToEuro(
              financialModelContext.modelResults?.averages.totalCashflow
            )}
            resultInterpretation={
              financialModelContext.modelResults?.averages.totalCashflow > 0
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
          <ResultEntry
            factor="Discounted Cashflow"
            value={formatToEuro(
              financialModelContext.modelResults?.averages.discountedCashflow
            )}
            resultInterpretation={
              financialModelContext.modelResults?.averages.discountedCashflow >
              0
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
          <ResultEntry
            factor="Payback Period"
            value={`${financialModelContext.modelResults?.averages.paybackPeriod.toFixed(
              0
            )} years`}
            resultInterpretation={
              financialModelContext.modelResults?.averages.paybackPeriod > 0
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
          <ResultEntry
            factor="ROI"
            value={formatToPercent(
              financialModelContext.modelResults?.averages.ROI
            )}
            resultInterpretation={
              financialModelContext.modelResults?.averages.ROI > 0
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
          <ResultEntry
            factor="NPV"
            value={formatToEuro(
              financialModelContext.modelResults?.averages.NPV
            )}
            resultInterpretation={
              financialModelContext.modelResults?.averages.NPV > 0
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
          <ResultEntry
            factor="EVA"
            value={formatToEuro(
              financialModelContext.modelResults?.averages.EVA
            )}
            resultInterpretation={
              financialModelContext.modelResults?.averages.EVA > 0
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
          <ResultEntry
            factor="IRR"
            value={formatToPercent(
              financialModelContext.modelResults?.averages.IRR
            )}
            resultInterpretation={
              financialModelContext.modelResults?.averages.IRR ??
              -1 > mean(financialModelContext.financialInputRanges.discountRate)
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
          <ResultEntry
            factor="IRR to WACC"
            value={financialModelContext.modelResults?.averages.IRRToWACC.toFixed(
              2
            )}
            resultInterpretation={
              financialModelContext.modelResults?.averages.IRRToWACC > 1
                ? ResultInterpretation.POSITIVE
                : ResultInterpretation.NEGATIVE
            }
          />
        </div>
      )}
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
