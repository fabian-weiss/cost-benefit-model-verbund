import { FinancialInputs } from "@/types/financials/financial-inputs";

export const calculateCashflow = (
  inputs: FinancialInputs
): { totalCashflow: number; cashflows: number[]; paybackPeriod: number } => {
  // Calculate Cashflow: Cashflow = (Budget - Costs) over project duration
  const {
    initialInvestment, // initial investment
    annualOperatingCosts,
    annualOperatingCostsGrowthRate,
    annualMaintenanceCosts,
    annualMaintenanceCostsGrowthRate,
    trainingCosts, // only in the beginning
    projectDuration,
    annualRevenue,
    annualRevenueGrowthRate,
    firstRevenueGeneratingYear,
    annualCostSavings,
    annualCostSavingsGrowthRate,
    firstCostSavingYear,
  } = inputs;

  const cashflows: number[] = [];

  for (let year = 1; year < projectDuration; year++) {
    let revenue = 0;
    let costSavings = 0;
    const operatingCosts =
      annualOperatingCosts *
      Math.pow(1 + annualOperatingCostsGrowthRate, year - 1);
    const maintenanceCosts =
      annualMaintenanceCosts *
      Math.pow(1 + annualMaintenanceCostsGrowthRate, year - 1);

    // Check if the year is equal to or after the first revenue-generating year
    if (year >= firstRevenueGeneratingYear) {
      revenue =
        annualRevenue *
        Math.pow(
          1 + annualRevenueGrowthRate,
          year - firstRevenueGeneratingYear
        );
    }

    // Check if the year is equal to or after the first cost-saving year
    if (year >= firstCostSavingYear) {
      costSavings =
        annualCostSavings *
        Math.pow(1 + annualCostSavingsGrowthRate, year - firstCostSavingYear);
    }

    // Calculate the annual cash flow for this year
    const annualCashFlow =
      revenue + costSavings - operatingCosts - maintenanceCosts;

    // Add the annual cash flow to the cashFlow array
    cashflows.push(annualCashFlow);
  }

  // Get payback period
  const initialCost: number = initialInvestment + trainingCosts;
  let cumulativeCashFlow: number = 0;
  let paybackPeriod: number = -1; // Initialize to -1 to indicate not achieved yet

  for (let year = 0; year < projectDuration; year++) {
    cumulativeCashFlow += cashflows[year]; // Add the cash flow for the current year

    // Check if cumulative cash flow has reached the initial investment
    if (cumulativeCashFlow >= initialCost && paybackPeriod === -1) {
      paybackPeriod = year + 1; // +1 because years are typically 1-indexed
    }
  }

  const endcashflow = cashflows.reduce((acc, val) => acc + val, 0);
  return {
    totalCashflow: endcashflow,
    cashflows: cashflows,
    paybackPeriod: paybackPeriod,
  };
};
