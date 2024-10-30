export type FinancialInputRanges = {
  budget: number[];
  initialInvestment: number[];
  annualOperatingCosts: number[];
  annualOperatingCostsGrowthRate: number[];
  annualMaintenanceCosts: number[];
  annualMaintenanceCostsGrowthRate: number[];
  trainingCosts: number[];
  annualRevenue: number[];
  annualRevenueGrowthRate: number[];
  annualCostSavings: number[];
  annualCostSavingsGrowthRate: number[];
  firstCostSavingYear: number[];
  firstRevenueGeneratingYear: number[];
  projectDuration: number[]; // in years
  riskFactor: number[]; // in percent
  discountRate: number[]; // in percent
};
