import { DynamicFinancialInput } from "./dynamic-financial-input";

export type FinancialInputs = {
  budget: number;
  initialInvestment: number;
  annualOperatingCosts: number;
  annualOperatingCostsGrowthRate: number;
  firstAnnualOperatingCostsYear: number;
  annualMaintenanceCosts: number;
  annualMaintenanceCostsGrowthRate: number;
  firstAnnualMaintenanceCostsYear: number;
  trainingCosts: number;
  annualRevenue: number;
  annualRevenueGrowthRate: number;
  firstRevenueGeneratingYear: number;
  annualCostSavings: number;
  annualCostSavingsGrowthRate: number;
  firstCostSavingYear: number;
  projectDuration: number; // in years
  riskFactor: number; // in percent
  discountRate: number; // in percent
  dynamicFinancialInputs: DynamicFinancialInput[];
};
