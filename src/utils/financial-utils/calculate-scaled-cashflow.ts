import { FinancialInputs } from "@/types/financials/financial-inputs";
import { adjustForRisk } from "../adjust-for-risk";
import { scaleNumber } from "../scale-number";

export const calculateScaledCashflow = (inputs: FinancialInputs): number => {
  // Calculate Cashflow: Cashflow = (Budget - Costs) over project duration
  const {
    budget,
    annualOperatingCosts,
    annualMaintenanceCosts,
    annualTrainingCosts,
    projectDuration,
    riskFactor,
  } = inputs;

  const annualCashflow: number =
    budget -
    (annualOperatingCosts + annualMaintenanceCosts + annualTrainingCosts);
  const totalCashflow: number = annualCashflow * projectDuration;
  const adjustedCashflow: number = adjustForRisk(totalCashflow, riskFactor);
  const scaledCashflow: number = scaleNumber(adjustedCashflow, -100000, 500000);
  return scaledCashflow;
};
