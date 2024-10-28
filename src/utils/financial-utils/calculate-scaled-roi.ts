import { adjustForRisk } from "../adjust-for-risk";
import { scaleNumber } from "../scale-number";

export const calculateScaledROI = (
  totalCashflow: number,
  initialInvestment: number,
  riskFactor: number
): number => {
  const ROI = (totalCashflow - initialInvestment) / initialInvestment;
  const adjustedROI = adjustForRisk(ROI, riskFactor);
  const scaledROI = scaleNumber(adjustedROI, -1, 2);
  return scaledROI;
};
