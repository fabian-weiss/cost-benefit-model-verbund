import { FinancialFactors } from "@/types/financials/financial-factors";
import { FinancialInputs } from "@/types/financials/financial-inputs";
import { adjustForRisk } from "@/utils/adjust-for-risk";
import { calculateCashflow } from "@/utils/financial-utils/calculate-cashflow";
import { calculateDiscountedCashflow } from "@/utils/financial-utils/calculate-discounted-cashflow";
import { calculateEVA } from "@/utils/financial-utils/calculate-eva";
import { calculateIRR } from "@/utils/financial-utils/calculate-irr";
import { calculateNPV } from "@/utils/financial-utils/calculate-npv";
import { calculateROI } from "@/utils/financial-utils/calculate-roi";
import { scaleNumber } from "@/utils/scale-number";
import { mean, round } from "mathjs";

export const financialModel = (
  inputs: FinancialInputs
): { singleFactors: FinancialFactors; overallScore: number } => {
  const {
    budget,
    initialInvestment,
    annualOperatingCosts,
    annualOperatingCostsGrowthRate,
    annualMaintenanceCosts,
    annualMaintenanceCostsGrowthRate,
    trainingCosts,
    projectDuration,
    annualRevenue,
    annualRevenueGrowthRate,
    firstRevenueGeneratingYear,
    annualCostSavings,
    annualCostSavingsGrowthRate,
    firstCostSavingYear,
    riskFactor,
    discountRate,
  } = inputs;

  const { totalCashflow, cashflows, paybackPeriod } = calculateCashflow(inputs);

  const discountedCashflow: number = calculateDiscountedCashflow(
    totalCashflow,
    discountRate,
    projectDuration
  );

  const ROI: number = calculateROI(
    totalCashflow,
    initialInvestment,
    riskFactor
  );

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

  let WACCToIRR: number = 0;
  if (IRR) {
    WACCToIRR = discountRate / IRR;
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
      WACCToIRR: WACCToIRR,
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
