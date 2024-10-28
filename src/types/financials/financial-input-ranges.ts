export type FinancialInputRanges = {
  budget: number[];
  initialInvestment: number[];
  annualOperatingCosts: number[];
  annualMaintenanceCosts: number[];
  annualTrainingCosts: number[];
  annualRevenue: number[];
  projectDuration: number[]; // in years
  riskFactor: number[]; // 0 is low, 5 is high - this is a subjective value and displays the innovation aspect of the project
};
