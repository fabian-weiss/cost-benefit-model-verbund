import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";

export const mapKeyToInputRangeEnum = (
  key: string
): FinancialInputRangesEnum | null => {
  const keyToEnumMap: { [key: string]: FinancialInputRangesEnum } = {
    initialInvestment: FinancialInputRangesEnum.INITIAL_INVESTMENT,
    projectDuration: FinancialInputRangesEnum.PROJECT_DURATION,
    discountRate: FinancialInputRangesEnum.DISCOUNT_RATE,
    annualOperatingCosts: FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
    annualOperatingCostsGrowthRate:
      FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE,
    firstAnnualOperatingCostsYear:
      FinancialInputRangesEnum.FIRST_ANNUAL_OPERATING_COST_YEAR,
    annualMaintenanceCosts: FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
    annualMaintenanceCostsGrowthRate:
      FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE,
    firstAnnualMaintenanceCostsYear:
      FinancialInputRangesEnum.FIRST_ANNUAL_MAINTENANCE_COST_YEAR,
    trainingCosts: FinancialInputRangesEnum.TRAINING_COSTS,
    annualRevenue: FinancialInputRangesEnum.ANNUAL_REVENUE,
    annualRevenueGrowthRate:
      FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE,
    firstRevenueGeneratingYear:
      FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR,
    annualCostSavings: FinancialInputRangesEnum.ANNUAL_COST_SAVINGS,
    annualCostSavingsGrowthRate:
      FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE,
    firstCostSavingYear: FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR,
  };

  return keyToEnumMap[key] || null;
};
