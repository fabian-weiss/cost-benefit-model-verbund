export type FinancialFactors = {
  //[x: string]: any;
  totalCashflow: number;
  discountedCashflow: number;
  paybackPeriod: number;
  ROI: number;
  NPV: number;
  EVA: number;
  IRR: number | undefined;
  IRRToWACC: number;
};
