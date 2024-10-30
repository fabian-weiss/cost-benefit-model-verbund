import { FinancialInputs } from "@/types/financials/financial-inputs";
import { adjustForRisk } from "../adjust-for-risk";
import { scaleNumber } from "../scale-number";

export const calculateNPV = (
  initialCosts: number,
  discountedCashflow: number
): number => {
  const NPV: number = discountedCashflow - initialCosts;

  return NPV;
};
