import { FinancialFactors } from "@/types/financials/financial-factors";
import { FinancialInputs } from "@/types/financials/financial-inputs";
import { calculateCashflow } from "@/utils/financial-utils/calculate-cashflow";
import { calculateDiscountedCashflow } from "@/utils/financial-utils/calculate-discounted-cashflow";
import { calculateEVA } from "@/utils/financial-utils/calculate-eva";
import { calculateIRR } from "@/utils/financial-utils/calculate-irr";
import { calculateNPV } from "@/utils/financial-utils/calculate-npv";
import { calculateROI } from "@/utils/financial-utils/calculate-roi";
import { mean } from "mathjs";

export const financialModel = (
  inputs: FinancialInputs
): { singleFactors: FinancialFactors; overallScore: number } => {
  const {
    initialInvestment,
    // trainingCosts,
    /*projectDuration,*/ discountRate,
  } = inputs;

  const { totalCashflow, cashflows, paybackPeriod, cumulativeCosts } =
    calculateCashflow(inputs);

  const discountedCashflow: number = calculateDiscountedCashflow(
    cashflows,
    discountRate
    // projectDuration
  );

  // console.log("totalCashflow", totalCashflow);

  const ROI: number = calculateROI(
    totalCashflow,
    initialInvestment,
    cumulativeCosts
  );

  const NPV: number = calculateNPV(initialInvestment, discountedCashflow);

  const EVA: number = calculateEVA(
    cashflows,
    discountRate,
    23 / 100, // tax rate Austria
    initialInvestment
  );

  const IRR: number | undefined = calculateIRR(
    [-initialInvestment, ...cashflows],
    0.1
    // initialInvestment + trainingCosts
  );

  console.log(`IRR: ${IRR}`);

  let IRRToWACC: number = 0;
  if (IRR) {
    IRRToWACC = IRR / discountRate;
  }

  // console.log(`roit: ${parseFloat(ROI.toFixed(2))}`);

  return {
    singleFactors: {
      totalCashflow: parseFloat(totalCashflow.toFixed(4)),
      discountedCashflow: parseFloat(discountedCashflow.toFixed(4)),
      paybackPeriod: paybackPeriod,
      ROI: parseFloat(ROI.toFixed(4)),
      NPV: parseFloat(NPV.toFixed(4)),
      EVA: parseFloat(EVA.toFixed(4)),
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
