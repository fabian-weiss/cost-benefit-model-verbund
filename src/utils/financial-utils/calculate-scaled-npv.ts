import { FinancialInputs } from "@/types/financials/financial-inputs";
import { adjustForRisk } from "../adjust-for-risk";
import { scaleNumber } from "../scale-number";

export const calculateScaledNPV = (
  inputs: FinancialInputs,
  annualCashflow: number
): number => {
  const { initialInvestment, projectDuration, riskFactor } = inputs;

  // Calculate NPV: Net Present Value, assuming discount rate is 5%
  const discountRate = 0.05;
  const NPV = Array.from({ length: projectDuration }).reduce(
    (acc: number, _, year) => {
      return acc + annualCashflow / Math.pow(1 + discountRate, year + 1);
    },
    -initialInvestment
  );
  const adjustedNPV = adjustForRisk(NPV, riskFactor);
  const scaledNPV = scaleNumber(adjustedNPV, -100000, 500000);
  return scaledNPV;
};
