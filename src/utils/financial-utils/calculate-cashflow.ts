import { DynamicInputEnum } from "@/enums/DynamicInputEnum";
import { DynamicFinancialInput } from "@/types/financials/dynamic-financial-input";
import { FinancialInputs } from "@/types/financials/financial-inputs";

export const calculateCashflow = (
  inputs: FinancialInputs
): {
  totalCashflow: number;
  cashflows: number[];
  paybackPeriod: number;
  cumulativeCosts: number;
} => {
  // Calculate Cashflow: Cashflow = (Budget - Costs) over project duration
  const {
    initialInvestment, // initial investment
    annualOperatingCosts,
    annualOperatingCostsGrowthRate,
    firstAnnualOperatingCostsYear,
    annualMaintenanceCosts,
    annualMaintenanceCostsGrowthRate,
    firstAnnualMaintenanceCostsYear,
    trainingCosts, // only in the beginning
    projectDuration,
    annualRevenue,
    annualRevenueGrowthRate,
    firstRevenueGeneratingYear,
    annualCostSavings,
    annualCostSavingsGrowthRate,
    firstCostSavingYear,
    dynamicFinancialInputs,
  } = inputs;

  let dynamicRevenues: DynamicFinancialInput[] = [];
  let dynamicCosts: DynamicFinancialInput[] = [];
  let cumulativeCosts: number = 0;

  if (dynamicFinancialInputs) {
    dynamicRevenues = dynamicFinancialInputs?.filter(
      (value) => value.type === DynamicInputEnum.REVENUES
    );
    dynamicCosts = dynamicFinancialInputs?.filter(
      (value) => value.type === DynamicInputEnum.COSTS
    );
  }

  console.log(`dynamic revenues: ${JSON.stringify(dynamicRevenues)}`);
  console.log(`dynamic costs: ${JSON.stringify(dynamicCosts)}`);

  console.log(
    `first annual operating cost year: ${firstAnnualOperatingCostsYear}`
  );
  console.log(
    `first annual maintenance cost year: ${firstAnnualMaintenanceCostsYear}`
  );

  const cashflows: number[] = [];

  for (let year = 1; year <= projectDuration; year++) {
    let revenue = 0;
    let costSavings = 0;
    let operatingCosts = 0;
    let maintenanceCosts = 0;
    let dRevenues = 0;
    let dCosts = 0;
    const tCosts = year === 1 ? trainingCosts : 0;

    // Check if the year is equal to or after the first annual operating cost year
    if (year >= firstAnnualOperatingCostsYear) {
      operatingCosts =
        annualOperatingCosts *
        Math.pow(
          1 + annualOperatingCostsGrowthRate,
          year - firstAnnualOperatingCostsYear
        );
    }

    // Check if the year is equal to or after the first annual maintenance cost year
    if (year >= firstAnnualMaintenanceCostsYear) {
      maintenanceCosts =
        annualMaintenanceCosts *
        Math.pow(
          1 + annualMaintenanceCostsGrowthRate,
          year - firstAnnualMaintenanceCostsYear
        );
    }

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

    // Check for dynamic revenues
    for (const r of dynamicRevenues) {
      if (year == r.year) {
        dRevenues += r.amount;
      }
    }

    console.log(`dRevenues: ${dRevenues}`);

    // Check for dynamic costs
    for (const c of dynamicCosts) {
      if (year == c.year) {
        dCosts += c.amount;
      }
    }

    const annualRevenues = revenue + costSavings + dRevenues;
    const annualCosts = dCosts + operatingCosts + maintenanceCosts + tCosts;

    // Calculate the annual cash flow for this year
    const annualCashFlow = annualRevenues - annualCosts;
    cumulativeCosts += annualCosts;

    // console.log(
    //   `annual cashflow in year ${year}: ${annualCashFlow} because revenue is ${revenue}, costSavings is ${costSavings}, dRevenues is ${dRevenues}, dCosts is ${dCosts}, operatingCosts is ${operatingCosts}, maintenanceCosts is ${maintenanceCosts}, tCosts is ${tCosts}`
    // );

    // Add the annual cash flow to the cashFlow array
    cashflows.push(annualCashFlow);
  }

  // console.log(`cashflows: ${cashflows}`);

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
    cumulativeCosts: cumulativeCosts,
  };
};
