export type FinancialInputs = {
  budget: number;
  initialInvestment: number;
  annualOperatingCosts: number;
  annualMaintenanceCosts: number;
  annualTrainingCosts: number;
  annualRevenue: number;
  projectDuration: number; // in years
  riskFactor: 0 | 1 | 2 | 3 | 4 | 5; // 0 is low, 5 is high - this is a subjective value and displays the innovation aspect of the project
};
