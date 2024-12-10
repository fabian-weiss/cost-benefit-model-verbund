import { FinancialFactors } from "@/types/financials/financial-factors";
import { FinancialInputs } from "@/types/financials/financial-inputs";
import { calculateCashflow } from "@/utils/financial-utils/calculate-cashflow";
import { calculateDiscountedCashflow } from "@/utils/financial-utils/calculate-discounted-cashflow";
import { calculateEVA } from "@/utils/financial-utils/calculate-eva";
import { calculateIRR } from "@/utils/financial-utils/calculate-irr";
import { calculateNPV } from "@/utils/financial-utils/calculate-npv";
import { calculateROI } from "@/utils/financial-utils/calculate-roi";
import { mean, round } from "mathjs";

export const financialModel = (
  inputs: FinancialInputs
): { singleFactors: FinancialFactors; overallScore: number } => {
  const { initialInvestment, trainingCosts, projectDuration, discountRate } =
    inputs;

  const { totalCashflow, cashflows, paybackPeriod } = calculateCashflow(inputs);

  const discountedCashflow: number = calculateDiscountedCashflow(
    totalCashflow,
    discountRate,
    projectDuration
  );

  console.log("totalCashflow", totalCashflow);

  const ROI: number = calculateROI(totalCashflow, initialInvestment);

  const NPV: number = calculateNPV(initialInvestment, discountedCashflow);

  const EVA: number = calculateEVA(
    totalCashflow,
    discountRate,
    initialInvestment
  );

  const IRR: number | undefined = calculateIRR(
    cashflows,
    0.05,
    initialInvestment + trainingCosts
  );

  let IRRToWACC: number = 0;
  if (IRR) {
    IRRToWACC = IRR / discountRate;
  }

  return {
    singleFactors: {
      totalCashflow: round(totalCashflow, 2),
      discountedCashflow: round(discountedCashflow, 2),
      paybackPeriod: paybackPeriod,
      ROI: round(ROI, 2),
      NPV: round(NPV, 2),
      EVA: round(EVA, 2),
      IRR: IRR,
      IRRToWACC: IRRToWACC,
    },
    overallScore: mean([totalCashflow, paybackPeriod, ROI, NPV, EVA]),
  };
  // return {
  //   singleFactors: {
  //     cashflow: scaledCashflow,
  //     paybackPeriod: scaledPaybackPeriod,
  //     ROI: scaledROI,
  //     NPV: scaledNPV,
  //     economicValueAdded: scaledEVA,
  //   },
  //   overallScore: mean([
  //     scaledCashflow,
  //     scaledPaybackPeriod,
  //     scaledROI,
  //     scaledNPV,
  //     scaledEVA,
  //   ]),
  // };
};
