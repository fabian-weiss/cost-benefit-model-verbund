"use client";
import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { FinancialCategory } from "@/enums/FinancialCategory";
import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";
import { ValueType } from "@/enums/ValueType";
import { financialResults } from "@/models/financial-model/financial-results";
import { useFinancialModel } from "@/providers/financial-model-provider";
import "@/styles/model-section.css";
import { InputGroupType } from "@/types/input-group-type";
import { isBetweenOneAndHundred } from "@/utils/is-between-one-and-hundred";
import { round } from "mathjs";

import { useState } from "react";

function FinancialSection() {
  const financialModelContext = useFinancialModel();
  const [budget, setBudget] = useState<number>();
  const [initialInvestment, setInitialInvestment] = useState<number>();
  const [annualOperatingCosts, setAnnualOperatingCosts] = useState<number>();
  const [annualOperatingCostsGrowthRate, setAnnualOperatingCostsGrowthRate] =
    useState<number>();
  const [annualMaintenanceCosts, setAnnualMaintenanceCosts] =
    useState<number>();
  const [
    annualMaintenanceCostsGrowthRate,
    setAnnualMaintenanceCostsGrowthRate,
  ] = useState<number>();
  const [trainingCosts, setTrainingCosts] = useState<number>();
  const [annualRevenue, setAnnualRevenue] = useState<number>();
  const [annualRevenueGrowthRate, setAnnualRevenueGrowthRate] =
    useState<number>();
  const [firstRevenueGeneratingYear, setFirstRevenueGeneratingYear] =
    useState<number>();
  const [annualCostSavings, setAnnualCostSavings] = useState<number>();
  const [annualCostSavingsGrowthRate, setAnnualCostSavingsGrowthRate] =
    useState<number>();
  const [firstCostSavingYear, setFirstCostSavingYear] = useState<number>();
  const [projectDuration, setProjectDuration] = useState<number>();
  const [riskFactor, setRiskFactor] = useState<number>();
  const [discountRate, setDiscountRate] = useState<number>();
  const [errors, setErrors] = useState<any>({
    budget: "",
    initialInvestment: "",
    annualOperatingCosts: "",
    annualOperatingCostsGrowthRate: "",
    annualMaintenanceCosts: "",
    annualMaintenanceCostsGrowthRate: "",
    trainingCosts: "",
    annualRevenue: "",
    annualRevenueGrowthRate: "",
    firstRevenueGeneratingYear: "",
    annualCostSavings: "",
    annualCostSavingsGrowthRate: "",
    firstCostSavingYear: "",
    projectDuration: "",
    riskFactor: "",
    discountRate: "",
  });

  const [modelResults, setModelResults] = useState<any>();

  const clearErrors = () => {
    setErrors({
      budget: "",
      initialInvestment: "",
      annualOperatingCosts: "",
      annualOperatingCostsGrowthRate: "",
      annualMaintenanceCosts: "",
      annualMaintenanceCostsGrowthRate: "",
      trainingCosts: "",
      annualRevenue: "",
      annualRevenueGrowthRate: "",
      firstRevenueGeneratingYear: "",
      annualCostSavings: "",
      annualCostSavingsGrowthRate: "",
      firstCostSavingYear: "",
      projectDuration: "",
      riskFactor: "",
      discountRate: "",
    });
  };

  const handleAdjustment = (
    adjustment: number,
    factorType: FinancialInputRangesEnum
  ) => {
    if (isNaN(adjustment)) return;
    const vs: number[] = [];
    switch (factorType) {
      case FinancialInputRangesEnum.BUDGET:
        financialModelContext.financialInputRanges.budget.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.BUDGET,
          vs
        );
        break;
      case FinancialInputRangesEnum.INITIAL_INVESTMENT:
        financialModelContext.financialInputRanges.initialInvestment.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.INITIAL_INVESTMENT,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS:
        financialModelContext.financialInputRanges.annualOperatingCosts.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS:
        financialModelContext.financialInputRanges.annualMaintenanceCosts.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
          vs
        );
        break;
      case FinancialInputRangesEnum.TRAINING_COSTS:
        financialModelContext.financialInputRanges.trainingCosts.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.TRAINING_COSTS,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_REVENUE:
        financialModelContext.financialInputRanges.annualRevenue.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_REVENUE,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_COST_SAVINGS:
        financialModelContext.financialInputRanges.annualCostSavings.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_COST_SAVINGS,
          vs
        );
        break;
    }
  };

  const inputGroups: InputGroupType[] = [
    // Budget
    {
      category: FinancialCategory.MAIN,
      id: "budget",
      inputHeader: {
        label: "Budget",
        adjustmentButtonRow: {
          adjustments: [10, 20, 30],
          callback: (adjustment: number) =>
            handleAdjustment(adjustment, FinancialInputRangesEnum.BUDGET),
          id: "budget",
          disabled:
            financialModelContext.financialInputRanges.budget.length === 0,
        },
      },
      inputFields: [
        {
          id: "budget",
          value: budget?.toString() ?? "",
          description: "At least 1 - Click 'Enter' to add",
          // label: "Budget",
          // description: "At least 1 - Click 'Enter' to add",
          error: errors.budget,
          type: "number",
          prefix: "€",
          values: financialModelContext.financialInputRanges.budget,
          valueType: ValueType.CURRENCY,
          rangeAdjustments: [10, 20, 30],
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.BUDGET,
              value
            ),
          onChange: (e) => {
            setBudget(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              budget ?? 0,
              () => {
                const b = Number(budget);
                if (!isNaN(b)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.BUDGET,
                    [b]
                  );
                  setBudget(undefined);
                }
              },
              financialModelContext.financialInputRanges.budget
            ),
        },
      ],
    },
    // Initial Investment
    {
      category: FinancialCategory.MAIN,
      id: "initial-investment",
      inputHeader: {
        label: "Initial Investment",

        adjustmentButtonRow: {
          adjustments: [10, 20, 30],
          callback: (adjustment: number) =>
            handleAdjustment(
              adjustment,
              FinancialInputRangesEnum.INITIAL_INVESTMENT
            ),
          id: "initial-investment",
          disabled:
            financialModelContext.financialInputRanges.initialInvestment
              .length === 0,
        },
      },
      inputFields: [
        {
          id: "initial-investment",
          value: initialInvestment?.toString() ?? "",
          // label: "Initial Investment",
          // description: "At least 1 - Click 'Enter' to add",
          description: "At least 1 - Click 'Enter' to add",
          error: errors.initialInvestment,
          type: "number",
          prefix: "€",
          values: financialModelContext.financialInputRanges.initialInvestment,
          rangeAdjustments: [10, 20, 30],
          valueType: ValueType.CURRENCY,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.INITIAL_INVESTMENT,
              value
            ),
          onChange: (e) => {
            setInitialInvestment(Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              initialInvestment ?? 0,
              () => {
                const iI = Number(initialInvestment);
                if (!isNaN(iI)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.INITIAL_INVESTMENT,
                    [iI]
                  );
                  setInitialInvestment(undefined);
                }
              },
              financialModelContext.financialInputRanges.initialInvestment
            ),
        },
      ],
    },
    // Annual Operating Costs
    {
      category: FinancialCategory.COSTS,
      id: "annual-operating-costs",
      inputHeader: {
        label: "Annual Operating Costs",

        adjustmentButtonRow: {
          adjustments: [10, 20, 30],
          callback: (adjustment: number) =>
            handleAdjustment(
              adjustment,
              FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS
            ),
          id: "annual-operating-costs",
          disabled:
            financialModelContext.financialInputRanges.annualOperatingCosts
              .length === 0,
        },
      },
      inputFields: [
        {
          id: "annual-operating-costs",
          value: annualOperatingCosts?.toString() ?? "",
          error: errors.annualOperatingCosts,
          description: "At least 1 - Click 'Enter' to add",
          type: "number",
          prefix: "€",
          values:
            financialModelContext.financialInputRanges.annualOperatingCosts,
          rangeAdjustments: [10, 20, 30],
          valueType: ValueType.CURRENCY,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
              value
            ),
          onChange: (e) => {
            setAnnualOperatingCosts(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualOperatingCosts ?? 0,
              () => {
                const oc = Number(annualOperatingCosts);
                if (!isNaN(oc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
                    [oc]
                  );
                  setAnnualOperatingCosts(undefined);
                }
              },
              financialModelContext.financialInputRanges.annualOperatingCosts
            ),
        },
        {
          id: "annual-operating-costs-growth-rate",
          value: annualOperatingCostsGrowthRate?.toString() ?? "",
          //error: errors.annualOperatingCosts,
          // label: "Annual Growth Rate",
          error: errors.annualOperatingCostsGrowthRate,
          description:
            "Annual growth rate - Negative if decreasing (default is 0%)",
          type: "number",
          suffix: "%",
          valueLabelSuffix: "%",
          valueType: ValueType.PERCENTAGE,
          values:
            financialModelContext.financialInputRanges
              .annualOperatingCostsGrowthRate,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE,
              value
            ),
          onChange: (e) => {
            setAnnualOperatingCostsGrowthRate(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualOperatingCostsGrowthRate ?? 0,
              () => {
                const oc = Number(annualOperatingCostsGrowthRate);
                if (!isNaN(oc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE,
                    [oc / 100]
                  );
                  setAnnualOperatingCostsGrowthRate(undefined);
                }
              },
              financialModelContext.financialInputRanges
                .annualOperatingCostsGrowthRate
            ),
        },
      ],
    },
    // Annual Maintenance Costs
    {
      category: FinancialCategory.COSTS,
      id: "annual-maintenance-costs",
      inputHeader: {
        label: "Annual Maintenance Costs",

        adjustmentButtonRow: {
          adjustments: [10, 20, 30],
          callback: (adjustment: number) =>
            handleAdjustment(
              adjustment,
              FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS
            ),
          id: "annual-maintenance-costs",
          disabled:
            financialModelContext.financialInputRanges.annualMaintenanceCosts
              .length === 0,
        },
      },
      inputFields: [
        {
          id: "annual-maintenance-costs",
          value: annualMaintenanceCosts?.toString() ?? "",
          // label: "Annual Maintenance Costs",
          // description: "At least 1 - Click 'Enter' to add",
          description: "At least 1 - Click 'Enter' to add",
          error: errors.annualMaintenanceCosts,
          type: "number",
          prefix: "€",
          values:
            financialModelContext.financialInputRanges.annualMaintenanceCosts,
          rangeAdjustments: [10, 20, 30],
          valueType: ValueType.CURRENCY,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
              value
            ),
          onChange: (e) => {
            setAnnualMaintenanceCosts(Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualMaintenanceCosts ?? 0,
              () => {
                const mc = Number(annualMaintenanceCosts);
                if (!isNaN(mc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
                    [mc]
                  );
                  setAnnualMaintenanceCosts(undefined);
                }
              },
              financialModelContext.financialInputRanges.annualMaintenanceCosts
            ),
        },
        {
          id: "annual-maintenance-costs-growth-rate",
          value: annualMaintenanceCostsGrowthRate?.toString() ?? "",
          description:
            "Annual growth rate - negative if decreasing (default is 0%)",
          type: "number",
          suffix: "%",
          valueLabelSuffix: "%",
          valueType: ValueType.PERCENTAGE,
          error: errors.annualMaintenanceCostsGrowthRate,
          values:
            financialModelContext.financialInputRanges
              .annualMaintenanceCostsGrowthRate,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE,
              value
            ),
          onChange: (e) => {
            setAnnualMaintenanceCostsGrowthRate(Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualMaintenanceCostsGrowthRate ?? 0,
              () => {
                const mc = Number(annualMaintenanceCostsGrowthRate);
                if (!isNaN(mc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE,
                    [mc / 100]
                  );
                  setAnnualMaintenanceCostsGrowthRate(undefined);
                }
              },
              financialModelContext.financialInputRanges
                .annualMaintenanceCostsGrowthRate
            ),
        },
      ],
    },
    // Annual Training Costs
    {
      category: FinancialCategory.COSTS,
      id: "annual-training-costs",
      inputHeader: {
        label: "Training Costs",
        adjustmentButtonRow: {
          adjustments: [10, 20, 30],
          callback: (adjustment: number) =>
            handleAdjustment(
              adjustment,
              FinancialInputRangesEnum.TRAINING_COSTS
            ),
          id: "annual-training-costs",
          disabled:
            financialModelContext.financialInputRanges.trainingCosts.length ===
            0,
        },
      },
      inputFields: [
        {
          id: "training-costs",
          value: trainingCosts?.toString() ?? "",
          // label: "Training Costs",
          // description: "At least 1 - Click 'Enter' to add",
          description: "At least 1 - Click 'Enter' to add",
          error: errors.trainingCosts,
          type: "number",
          prefix: "€",
          values: financialModelContext.financialInputRanges.trainingCosts,
          rangeAdjustments: [10, 20, 30],
          valueType: ValueType.CURRENCY,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.TRAINING_COSTS,
              value
            ),
          onChange: (e) => {
            setTrainingCosts(Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              trainingCosts ?? 0,
              () => {
                const tc = Number(trainingCosts);
                if (!isNaN(tc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.TRAINING_COSTS,
                    [tc]
                  );
                  setTrainingCosts(undefined);
                }
              },
              financialModelContext.financialInputRanges.trainingCosts
            ),
        },
      ],
    },
    // Annual Revenue
    {
      category: FinancialCategory.REVENUE,
      id: "annual-revenue",
      inputHeader: {
        label: "Annual Revenue",
        adjustmentButtonRow: {
          adjustments: [10, 20, 30],
          callback: (adjustment: number) =>
            handleAdjustment(
              adjustment,
              FinancialInputRangesEnum.ANNUAL_REVENUE
            ),
          id: "annual-revenue",
          disabled:
            financialModelContext.financialInputRanges.annualRevenue.length ===
            0,
        },
      },
      inputFields: [
        {
          id: "annual-revenue",
          value: annualRevenue?.toString() ?? "",
          // label: "Annual Revenue",
          // description: "At least 1 - Click 'Enter' to add",
          description: "At least 1 - Click 'Enter' to add",
          error: errors.annualRevenue,
          type: "number",
          prefix: "€",
          values: financialModelContext.financialInputRanges.annualRevenue,
          rangeAdjustments: [10, 20, 30],
          valueType: ValueType.CURRENCY,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_REVENUE,
              value
            ),
          onChange: (e) => {
            setAnnualRevenue(Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualRevenue ?? 0,
              () => {
                const ar = Number(annualRevenue);
                if (!isNaN(ar)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_REVENUE,
                    [ar]
                  );
                  setAnnualRevenue(undefined);
                }
              },

              financialModelContext.financialInputRanges.annualRevenue
            ),
        },
        {
          id: "annual-revenue-growth-rate",
          value: annualRevenueGrowthRate?.toString() ?? "",
          // label: "Annual Revenue",
          // description: "At least 1 - Click 'Enter' to add",
          description: "Annual growth rate - default is 0%",
          //error: errors.annualRevenue,
          error: errors.annualRevenueGrowthRate,
          type: "number",
          suffix: "%",
          valueLabelSuffix: "%",
          valueType: ValueType.PERCENTAGE,
          values:
            financialModelContext.financialInputRanges.annualRevenueGrowthRate,

          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE,
              value
            ),
          onChange: (e) => {
            setAnnualRevenueGrowthRate(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualRevenueGrowthRate ?? 0,
              () => {
                const ar = Number(annualRevenueGrowthRate);
                if (!isNaN(ar)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE,
                    [ar / 100]
                  );
                  setAnnualRevenueGrowthRate(undefined);
                }
              },
              financialModelContext.financialInputRanges.annualRevenueGrowthRate
            ),
        },
        {
          id: "first-revenue-generating-year",
          value: firstRevenueGeneratingYear?.toString() ?? "",
          // label: "Annual Revenue",
          // description: "At least 1 - Click 'Enter' to add",
          description: "First year of revenue generation - default is 1",
          error: errors.firstRevenueGeneratingYear,
          type: "number",
          prefix: "year",
          valueLabelPrefix: "year",
          valueType: ValueType.NUMBER,
          values:
            financialModelContext.financialInputRanges
              .firstRevenueGeneratingYear,

          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR,
              value
            ),
          onChange: (e) => {
            setFirstRevenueGeneratingYear(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              firstRevenueGeneratingYear ?? 0,
              () => {
                const ar = Number(firstRevenueGeneratingYear);
                if (!isNaN(ar)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR,
                    [ar]
                  );
                  setFirstRevenueGeneratingYear(undefined);
                }
              },
              financialModelContext.financialInputRanges
                .firstRevenueGeneratingYear
            ),
        },
      ],
    },
    // Annual Cost Savings
    {
      category: FinancialCategory.REVENUE,
      id: "annual-cost-savings",
      inputHeader: {
        label: "Annual Cost Savings",
        description: "At least 1 - Click 'Enter' to add",
        adjustmentButtonRow: {
          adjustments: [10, 20, 30],
          callback: (adjustment: number) =>
            handleAdjustment(
              adjustment,
              FinancialInputRangesEnum.ANNUAL_COST_SAVINGS
            ),
          id: "annual-cost-savings",
          disabled:
            financialModelContext.financialInputRanges.annualCostSavings
              .length === 0,
        },
      },
      inputFields: [
        {
          id: "annual-cost-savings",
          value: annualCostSavings?.toString() ?? "",
          // label: "Annual Cost Savings",
          // description: "At least 1 - Click 'Enter' to add",
          error: errors.annualCostSavings,
          type: "number",
          prefix: "€",
          values: financialModelContext.financialInputRanges.annualCostSavings,
          rangeAdjustments: [10, 20, 30],
          valueType: ValueType.CURRENCY,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_COST_SAVINGS,
              value
            ),
          onChange: (e) => {
            setAnnualCostSavings(Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualCostSavings ?? 0,
              () => {
                const as = Number(annualCostSavings);
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_COST_SAVINGS,
                    [as]
                  );
                  setAnnualCostSavings(undefined);
                }
              },

              financialModelContext.financialInputRanges.annualCostSavings
            ),
        },
        {
          id: "annual-cost-savings-growth-rate",
          value: annualCostSavingsGrowthRate?.toString() ?? "",
          // label: "Annual Cost Savings",
          // description: "At least 1 - Click 'Enter' to add",
          error: errors.annualCostSavingsGrowthRate,
          description: "Annual growth rate - default is 0%",
          type: "number",
          suffix: "%",
          valueLabelSuffix: "%",
          valueType: ValueType.PERCENTAGE,
          values:
            financialModelContext.financialInputRanges
              .annualCostSavingsGrowthRate,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE,
              value
            ),
          onChange: (e) => {
            setAnnualCostSavingsGrowthRate(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              annualCostSavingsGrowthRate ?? 0,
              () => {
                const as = Number(annualCostSavingsGrowthRate);
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE,
                    [as / 100]
                  );
                  setAnnualCostSavingsGrowthRate(undefined);
                }
              },

              financialModelContext.financialInputRanges
                .annualCostSavingsGrowthRate
            ),
        },
        {
          id: "first-cost-saving-year",
          value: firstCostSavingYear?.toString() ?? "",
          // label: "Annual Cost Savings",
          description: "First year of cost savings - default is 1",
          error: errors.firstCostSavingYear,
          type: "number",
          prefix: "year",
          valueLabelPrefix: "year",
          valueType: ValueType.NUMBER,
          values:
            financialModelContext.financialInputRanges.firstCostSavingYear,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR,
              value
            ),
          onChange: (e) => {
            setAnnualCostSavings(Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              firstCostSavingYear ?? 0,
              () => {
                const as = Number(firstCostSavingYear);
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR,
                    [as]
                  );
                  setFirstCostSavingYear(undefined);
                }
              },

              financialModelContext.financialInputRanges.firstCostSavingYear
            ),
        },
      ],
    },
    // Project Duration
    {
      category: FinancialCategory.MAIN,
      id: "project-duration",
      inputHeader: {
        label: "Project Duration",
        description: "At least 1 - Click 'Enter' to add",
      },
      inputFields: [
        {
          id: "project-duration",
          value: projectDuration?.toString() ?? "",
          // label: "Project Duration",
          // description: "At least 1 - Click 'Enter' to add",
          error: errors.projectDuration,
          type: "number",
          suffix: "years",
          valueLabelSuffix: "years",
          valueType: ValueType.NUMBER,
          values: financialModelContext.financialInputRanges.projectDuration,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.PROJECT_DURATION,
              value
            ),
          onChange: (e) => {
            setProjectDuration(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              projectDuration ?? 0,
              () => {
                const pd = Number(projectDuration);
                if (!isNaN(pd)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.PROJECT_DURATION,
                    [pd]
                  );
                  setProjectDuration(undefined);
                }
              },
              financialModelContext.financialInputRanges.projectDuration
            ),
        },
      ],
    },
    // Risk Factor
    {
      category: FinancialCategory.MAIN,
      id: "risk-factor",
      inputHeader: {
        label: "Risk Factor",
        description: "At least 1 - between 0 and 100 - 'Enter' to add",
      },
      inputFields: [
        {
          id: "risk-factor",
          value: riskFactor?.toString() ?? "",
          // label: "Risk Factor",
          suffix: "%",
          valueLabelSuffix: "%",
          valueType: ValueType.PERCENTAGE,
          values: financialModelContext.financialInputRanges.riskFactor,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.RISK_FACTOR,
              value
            ),
          error: errors.riskFactor,
          // description: "At least 1 - between 0 and 100 - 'Enter' to add",
          type: "number",
          onChange: (e) => {
            setRiskFactor(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isBetweenOneAndHundred(riskFactor)) {
              addRangeInput(
                e,
                riskFactor ?? 0,
                () => {
                  const rf = Number(riskFactor);
                  if (!isNaN(rf)) {
                    financialModelContext.addFinancialInput(
                      FinancialInputRangesEnum.RISK_FACTOR,
                      [rf / 100]
                    );
                    setRiskFactor(undefined);
                  }
                },
                financialModelContext.financialInputRanges.riskFactor
              );
            } else if (e.key === "Enter" || e.key === "Tab") {
              setErrors((prev: any) => ({
                ...prev,
                riskFactor: "Risk factor must be between 0 and 100",
              }));
            }
          },
        },
      ],
    },
    // Discount Rate
    {
      category: FinancialCategory.MAIN,
      id: "discount-rate",
      inputHeader: {
        label: "Discount Rate",
      },
      inputFields: [
        {
          id: "discount-ratte",
          value: discountRate?.toString() ?? "",
          // label: "Risk Factor",
          description: "WACC recommended - 'Enter' to add",
          error: errors.discountRate,
          suffix: "%",
          valueLabelSuffix: "%",
          valueType: ValueType.PERCENTAGE,
          values: financialModelContext.financialInputRanges.discountRate,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.DISCOUNT_RATE,
              value
            ),
          // description: "At least 1 - between 0 and 100 - 'Enter' to add",
          type: "number",
          onChange: (e) => {
            setDiscountRate(Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isBetweenOneAndHundred(discountRate)) {
              addRangeInput(
                e,
                discountRate ?? 0,
                () => {
                  const rf = Number(discountRate);
                  if (!isNaN(rf)) {
                    financialModelContext.addFinancialInput(
                      FinancialInputRangesEnum.DISCOUNT_RATE,
                      [rf / 100]
                    );
                    setDiscountRate(undefined);
                  }
                },
                financialModelContext.financialInputRanges.discountRate
              );
            } else if (e.key === "Enter" || e.key === "Tab") {
              setErrors((prev: any) => ({
                ...prev,
                discountRate: "Discount rate must be between 0 and 100",
              }));
            }
          },
        },
      ],
    },
  ];

  const handleModelSubmit = () => {
    clearErrors();
    let hasErrors = false;
    if (financialModelContext.financialInputRanges.budget.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        budget: "Set at least one expected budget",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.initialInvestment.length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        initialInvestment: "Set a least one expected initial investment",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualOperatingCosts.length ===
      0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualOperatingCosts: "Set at least one expected annual operating cost",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualOperatingCostsGrowthRate
        .length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualOperatingCostsGrowthRate:
          "Set at least one expected annual operating costs growth rate",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualMaintenanceCosts
        .length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualMaintenanceCosts:
          "Set at least one expected annual maintenance cost",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges
        .annualMaintenanceCostsGrowthRate.length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualMaintenanceCostsGrowthRate:
          "Set at least one expected annual maintenance cost growth rate",
      }));
      hasErrors = true;
    }
    if (financialModelContext.financialInputRanges.trainingCosts.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        trainingCosts: "Set at least one expected annual training cost",
      }));
      hasErrors = true;
    }
    if (financialModelContext.financialInputRanges.annualRevenue.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualRevenue: "Set at least one expected annual revenue",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualRevenueGrowthRate
        .length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualRevenueGrowthRate:
          "Set at least one expected annual revenue growth rate",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.firstRevenueGeneratingYear
        .length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        firstRevenueGeneratingYear:
          "Set at least one first revenue generating year",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.projectDuration.length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        projectDuration: "Set at least one expected project duration",
      }));
      hasErrors = true;
    }
    if (financialModelContext.financialInputRanges.riskFactor.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        riskFactor: "Set at least one expected risk factor",
      }));
      hasErrors = true;
    }
    if (financialModelContext.financialInputRanges.discountRate.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        discountRate: "Set at least one expected discount rate",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualCostSavings.length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualCostSavings: "Set at least one expected cost savings value",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualCostSavingsGrowthRate
        .length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualCostSavingsGrowthRate:
          "Set at least one expected cost savings growth rate",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.firstCostSavingYear.length ===
      0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        firstCostSavingYear: "Set at least one first cost saving year",
      }));
      hasErrors = true;
    }
    if (!hasErrors) {
      console.log(
        `Fincancial ranges are: ${JSON.stringify(
          financialModelContext.financialInputRanges
        )}`
      );
      //return;
      const r = financialResults(financialModelContext.financialInputRanges);
      setModelResults(r);
    } else if (modelResults != undefined) {
      setModelResults(undefined);
    }
  };

  const addRangeInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    input: number,
    callback: (input: number) => void,
    currentRange: number[]
  ) => {
    if (event.key === "Enter" || event.key === "Tab") {
      if (!currentRange.includes(input) && !isNaN(input)) {
        callback(input);
      }
    }
  };

  const getInputGroupBasedOnCategory = (category: FinancialCategory) => {
    switch (category) {
      case FinancialCategory.MAIN:
        return inputGroups.filter(
          (inputGroup) => inputGroup.category === FinancialCategory.MAIN
        );
      case FinancialCategory.COSTS:
        return inputGroups.filter(
          (inputGroup) => inputGroup.category === FinancialCategory.COSTS
        );
      case FinancialCategory.REVENUE:
        return inputGroups.filter(
          (inputGroup) => inputGroup.category === FinancialCategory.REVENUE
        );
    }
  };

  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="Financial"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelSubmit()}
      />
      <InputGrid
        inputGroups={getInputGroupBasedOnCategory(FinancialCategory.MAIN)}
        id={"financial-main"}
        header="General"
      />
      <InputGrid
        inputGroups={getInputGroupBasedOnCategory(FinancialCategory.COSTS)}
        id={"financial-costs"}
        header="Costs"
      />
      <InputGrid
        inputGroups={getInputGroupBasedOnCategory(FinancialCategory.REVENUE)}
        id={"financial-revenue"}
        header="Revenue"
      />
      {modelResults && <p>{JSON.stringify(modelResults)}</p>}
    </SectionContainer>
  );
}

export default FinancialSection;
