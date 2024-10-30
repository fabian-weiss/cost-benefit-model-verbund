import { adjustForRisk } from "../adjust-for-risk";
import { scaleNumber } from "../scale-number";

export const calculateScaledPaybackPeriod = (
  annualCashflow: number,
  riskFactor: number,
  projectDuration: number,
  initialInvestment: number
): number => {
  const paybackPeriod =
    annualCashflow > 0 ? initialInvestment / annualCashflow : Infinity;
  const adjustedPaybackPeriod = adjustForRisk(paybackPeriod, riskFactor);
  const scaledPaybackPeriod = scaleNumber(
    adjustedPaybackPeriod,
    1,
    projectDuration
  );
  return scaledPaybackPeriod;
};
