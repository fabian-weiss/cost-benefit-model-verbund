export type FinancialFactors = {
  totalCashflow: number;
  discountedCashflow: number;
  paybackPeriod: number;
  ROI: number;
  NPV: number;
  EVA: number;
  IRR: number | undefined;
  WACCToIRR: number;
};
