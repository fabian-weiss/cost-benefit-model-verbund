import { FinancialFactors } from "@/types/financials/financial-factors";
import { FinancialInputs } from "@/types/financials/financial-inputs";
import { adjustForRisk } from "@/utils/adjust-for-risk";
import { scaleNumber } from "@/utils/scale-number";
import { mean } from "mathjs";

export const financialModel = (
  inputs: FinancialInputs
): { singleFactors: FinancialFactors; overallScore: number } => {
  const {
    budget,
    initialInvestment,
    annualOperatingCosts,
    annualMaintenanceCosts,
    annualTrainingCosts,
    projectDuration,
    annualRevenue,
    riskFactor,
  } = inputs;

  const annualCashflow =
    annualRevenue -
    (annualOperatingCosts + annualMaintenanceCosts + annualTrainingCosts);
  const totalCashflow = -initialInvestment + annualCashflow * projectDuration;
  const adjustedCashflow = adjustForRisk(totalCashflow, riskFactor);
  const scaledCashflow = scaleNumber(adjustedCashflow, -100000, 500000);

  const paybackPeriod =
    annualCashflow > 0 ? initialInvestment / annualCashflow : Infinity;
  const adjustedPaybackPeriod = adjustForRisk(paybackPeriod, riskFactor);
  const scaledPaybackPeriod = scaleNumber(
    adjustedPaybackPeriod,
    1,
    projectDuration
  );

  const ROI = (totalCashflow - initialInvestment) / initialInvestment;
  const adjustedROI = adjustForRisk(ROI, riskFactor);
  const scaledROI = scaleNumber(adjustedROI, -1, 2);

  const discountRate = 0.05;
  const NPV = Array.from({ length: projectDuration }).reduce(
    (acc: number, _, year) => {
      return acc + annualCashflow / Math.pow(1 + discountRate, year + 1);
    },
    -initialInvestment
  );
  const adjustedNPV = adjustForRisk(NPV, riskFactor);
  const scaledNPV = scaleNumber(adjustedNPV, -100000, 500000);

  const capital =
    initialInvestment +
    (annualOperatingCosts + annualMaintenanceCosts) * projectDuration;
  const costOfCapital = 0.1;
  const NOPAT = annualCashflow * (1 - costOfCapital);
  const EVA = NOPAT - capital * costOfCapital;
  const adjustedEVA = adjustForRisk(EVA, riskFactor);
  const scaledEVA = scaleNumber(adjustedEVA, -100000, 500000);

  return {
    singleFactors: {
      cashflow: adjustedCashflow,
      paybackPeriod: adjustedPaybackPeriod,
      ROI: adjustedROI,
      NPV: adjustedNPV,
      economicValueAdded: adjustedEVA,
    },
    overallScore: mean([
      adjustedCashflow,
      adjustedPaybackPeriod,
      adjustedROI,
      adjustedNPV,
      adjustedEVA,
    ]),
  };
  return {
    singleFactors: {
      cashflow: scaledCashflow,
      paybackPeriod: scaledPaybackPeriod,
      ROI: scaledROI,
      NPV: scaledNPV,
      economicValueAdded: scaledEVA,
    },
    overallScore: mean([
      scaledCashflow,
      scaledPaybackPeriod,
      scaledROI,
      scaledNPV,
      scaledEVA,
    ]),
  };
};
