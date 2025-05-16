"use client";
import { ResultInterpretation } from "@/enums/ResultInterpretation";
import { formatToEuro } from "@/utils/format-to-euro";
import { formatToPercent } from "@/utils/format-to-percent";
import { mean } from "mathjs";
import React from "react";
import { resultToColor } from "@/utils/result-to-color";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import { normalizeCamelCase } from "@/utils/normalize-camel-case";
import { useFinancialStore } from "@/stores/useFinancialStore";

function FinancialResultsList() {
  const financialModelContext = useFinancialStore();

  const title: string = "Financial Model Results";
  const body: string =
    "The Financial Model allows a user to input expected financial outcomes. These results are then calculated and displayed.";

  const getResultInterpretation = (
    result: number,
    counterValue?: number
  ): ResultInterpretation => {
    if (counterValue) {
      return valueToResultInterpretation(result - counterValue);
    } else {
      return valueToResultInterpretation(result);
    }
  };

  const getFormattedResult = (result: number, resultKey: string): string => {
    switch (resultKey) {
      case "IRR":
      case "ROI":
        return formatToPercent(result);
      case "paybackPeriod":
        return `${result} year${result === 1 ? "" : "s"}`;
      case "IRRToWACC":
        return `${result.toFixed(2)}`;
      default:
        return formatToEuro(result);
    }
  };

  return (
    <>
      {financialModelContext.modelResults ? (
        <>
          <tr>
            <th colSpan={6} className="fw-dialog-title">
              {title}
            </th>
          </tr>
          {/* Subtitle Row */}
          <tr>
            <th colSpan={6} className="fw-dialog-subtitle">
              {body}
            </th>
          </tr>
          <tr className="fw-results-list-table-row__header">
            <th colSpan={3}>KPI</th>
            <th colSpan={3}>Result</th>
          </tr>
          {Object.entries(financialModelContext.modelResults.averages).map(
            ([resultKey, result], index) => (
              <tr
                key={index}
                style={{
                  color: resultToColor(
                    getResultInterpretation(
                      result ?? 0,
                      resultKey === "IRRToWACC"
                        ? mean(
                            financialModelContext.financialInputRanges
                              .discountRate
                          )
                        : undefined
                    )
                  ),
                }}
                className="fw-results-list-table-row__data"
              >
                <td colSpan={3}>{normalizeCamelCase(resultKey)}</td>
                <td colSpan={3}>
                  {getFormattedResult(result ?? 0, resultKey)}
                </td>
              </tr>
            )
          )}
          <tr>
            <td colSpan={6} className="fw-dialog-subtitle fw-table-spacer"></td>
          </tr>
          {/* <ResultEntry
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
            value={`${
              financialModelContext.modelResults?.averages.paybackPeriod > 0
                ? financialModelContext.modelResults?.averages.paybackPeriod.toFixed(
                    0
                  )
                : "Infinite"
            } ${
              financialModelContext.modelResults?.averages.paybackPeriod === 1
                ? "year"
                : "years"
            }`}
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
          /> */}
        </>
      ) : (
        <p className="fw-text-error">
          {"Invalid financial inputs. Couldn't calculate financials."}
        </p>
      )}
    </>
  );
}

export default FinancialResultsList;
