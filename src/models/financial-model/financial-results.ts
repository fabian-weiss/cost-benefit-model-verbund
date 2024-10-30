import { FinancialInputRanges } from "@/types/financials/financial-input-ranges";
import { FinancialResults } from "@/types/financials/financial-results";
import { generateCombinations } from "@/utils/financial-utils/generate-financial-combinations";
import { financialModel } from "./financial-model";
import { mean, std } from "mathjs";

export const financialResults = (
  inputRanges: FinancialInputRanges
): FinancialResults => {
  const inputCombinations = generateCombinations(inputRanges);

  // Run the model for each combination and store results
  const results = inputCombinations.map((inputs) => financialModel(inputs));
  console.log(`results are ${JSON.stringify(results)}`);

  const overallScores = results.map((result) => result.overallScore);
  const factorsScores = results.map((result) => result.singleFactors);

  // Perform sensitivity analysis
  const avgResult = mean(overallScores);
  const stdDevResult = std(overallScores);
  const avgCashflow = mean(
    results.map((result) => result.singleFactors.totalCashflow)
  );
  const avgPaybackPeriod = mean(
    results.map((result) => result.singleFactors.paybackPeriod)
  );
  const avgROI = mean(results.map((result) => result.singleFactors.ROI));
  const avgNPV = mean(results.map((result) => result.singleFactors.NPV));
  const avgEVA = mean(results.map((result) => result.singleFactors.EVA));

  const modelOutput = {
    results: overallScores,
    factorScores: factorsScores,
    overallScore: avgResult,
    stdDev: Number(stdDevResult),
    averages: {
      cashflow: avgCashflow,
      paybackPeriod: avgPaybackPeriod,
      ROI: avgROI,
      NPV: avgNPV,
      economicValueAdded: avgEVA,
    },
  };

  console.log(`financial model output is ${JSON.stringify(modelOutput)}`);

  return modelOutput;
};
