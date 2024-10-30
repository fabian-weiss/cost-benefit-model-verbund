import { FinancialInputRanges } from "@/types/financials/financial-input-ranges";
import { FinancialResults } from "@/types/financials/financial-results";
import { generateCombinations } from "@/utils/financial-utils/generate-financial-combinations";
import { financialModel } from "./financial-model";
import { MathNumericType, mean, std } from "mathjs";
import { FinancialFactors } from "@/types/financials/financial-factors";

export const financialResults = (
  inputRanges: FinancialInputRanges
): FinancialResults => {
  const inputCombinations = generateCombinations(inputRanges);

  // Run the model for each combination and store results
  const results = inputCombinations.map((inputs) => financialModel(inputs));
  //console.log(`results are ${JSON.stringify(results)}`);

  const overallScores: number[] = results.map((result) => result.overallScore);
  const factorsScores: FinancialFactors[] = results.map(
    (result) => result.singleFactors
  );

  // Perform sensitivity analysis
  const avgResult: number = mean(overallScores);
  const stdDevResult: MathNumericType[] = std(overallScores);
  const avgCashflow: number = mean(
    results.map((result) => result.singleFactors.totalCashflow)
  );
  const avgPaybackPeriod: number = mean(
    results.map((result) => result.singleFactors.paybackPeriod)
  );
  const avgROI: number = mean(
    results.map((result) => result.singleFactors.ROI)
  );
  const avgNPV: number = mean(
    results.map((result) => result.singleFactors.NPV)
  );
  const avgEVA: number = mean(
    results.map((result) => result.singleFactors.EVA)
  );
  const avgDiscountedCashflow: number = mean(
    results.map((result) => result.singleFactors.discountedCashflow)
  );
  const avgIRR = mean(results.map((result) => result.singleFactors.IRR ?? 0));
  const avgIRRToWACC: number = mean(
    results.map((result) => result.singleFactors.IRRToWACC)
  );

  const modelOutput: FinancialResults = {
    results: overallScores,
    factorScores: factorsScores,
    overallScore: avgResult,
    stdDev: Number(stdDevResult),
    averages: {
      totalCashflow: avgCashflow,
      discountedCashflow: avgDiscountedCashflow,
      paybackPeriod: avgPaybackPeriod,
      ROI: avgROI,
      NPV: avgNPV,
      EVA: avgEVA,
      IRR: avgIRR,
      IRRToWACC: avgIRRToWACC,
    },
  };

  //console.log(`financial model output is ${JSON.stringify(modelOutput)}`);

  return modelOutput;
};
