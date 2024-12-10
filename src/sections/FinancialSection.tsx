/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { DynamicInputEnum } from "@/enums/DynamicInputEnum";
import { FinancialCategory } from "@/enums/FinancialCategory";
import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";
import { ValueType } from "@/enums/ValueType";
import { financialResults } from "@/models/financial-model/financial-results";
import { useFinancialModel } from "@/providers/financial-model-provider";
import { useResultDialog } from "@/providers/model-result-provider";
import "@/styles/model-section.css";
import { InputGroupType } from "@/types/input-group-type";
import { isBetweenOneAndHundred } from "@/utils/is-between-one-and-hundred";
import { v4 } from "uuid";
import { round } from "mathjs";

import { useEffect, useState } from "react";
import { DynamicFinancialInput } from "@/types/financials/dynamic-financial-input";

function FinancialSection() {
  const financialModelContext = useFinancialModel();
  const resultsDialogContext = useResultDialog();

  const [financialInputs, setFinancialInputs] = useState<{
    [key: string]: number | undefined;
  }>({
    initialInvestment: undefined,
    projectDuration: undefined,
    discountRate: undefined,
    annualOperatingCosts: undefined,
    annualOperatingCostsGrowthRate: undefined,
    firstAnnualOperatingCostsYear: undefined,
    annualMaintenanceCosts: undefined,
    annualMaintenanceCostsGrowthRate: undefined,
    firstAnnualMaintenanceCostsYear: undefined,
    trainingCosts: undefined,
    dynamicCosts: undefined,
    dynamicCostsYear: undefined,
    annualRevenue: undefined,
    annualRevenueGrowthRate: undefined,
    firstRevenueGeneratingYear: undefined,
    annualCostSavings: undefined,
    annualCostSavingsGrowthRate: undefined,
    firstCostSavingYear: undefined,
    dynamicRevenue: undefined,
    dynamicRevenueYear: undefined,
  });

  const handleInputChange = (field: string, value?: number) => {
    setFinancialInputs((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

  //const [budget, setBudget] = useState<number>();
  // const [initialInvestment, setInitialInvestment] = useState<number>();
  // const [annualOperatingCosts, setAnnualOperatingCosts] = useState<number>();
  // const [annualOperatingCostsGrowthRate, setAnnualOperatingCostsGrowthRate] =
  //   useState<number>();
  // const [firstAnnualOperatingCostsYear, setFirstAnnualOperatingCostsYear] =
  //   useState<number>();
  // const [annualMaintenanceCosts, setAnnualMaintenanceCosts] =
  //   useState<number>();
  // const [
  //   annualMaintenanceCostsGrowthRate,
  //   setAnnualMaintenanceCostsGrowthRate,
  // ] = useState<number>();
  // const [firstAnnualMaintenanceCostYear, setFirstAnnualMaintenanceCostYear] =
  //   useState<number>();
  // const [trainingCosts, setTrainingCosts] = useState<number>();
  // const [annualRevenue, setAnnualRevenue] = useState<number>();
  // const [annualRevenueGrowthRate, setAnnualRevenueGrowthRate] =
  //   useState<number>();
  // const [firstRevenueGeneratingYear, setFirstRevenueGeneratingYear] =
  //   useState<number>();
  // const [annualCostSavings, setAnnualCostSavings] = useState<number>();
  // const [annualCostSavingsGrowthRate, setAnnualCostSavingsGrowthRate] =
  //   useState<number>();
  // const [firstCostSavingYear, setFirstCostSavingYear] = useState<number>();
  // const [projectDuration, setProjectDuration] = useState<number>();
  // //const [riskFactor, setRiskFactor] = useState<number>();
  // const [discountRate, setDiscountRate] = useState<number>();
  // const [dynamicCosts, setDynamicCosts] = useState<number>();
  // const [dynamicCostsYear, setDynamicCostsYear] = useState<number>();
  // const [dynamicRevenue, setDynamicRevenue] = useState<number>();
  // const [dynamicRevenueYear, setDynamicRevenueYear] = useState<number>();
  const errors = financialModelContext.errors;
  const [executeModel, setExecuteModel] = useState<boolean>(false);

  const handleAdjustment = (
    adjustment: number,
    factorType: FinancialInputRangesEnum
  ) => {
    if (isNaN(adjustment)) return;
    const vs: number[] = [];
    switch (factorType) {
      // case FinancialInputRangesEnum.BUDGET:
      //   financialModelContext.financialInputRanges.budget.forEach(
      //     (value: number) => {
      //       const upper: number = round(value * (1 + adjustment / 100), 2);
      //       const lower: number = round(value * (1 - adjustment / 100), 2);
      //       if (!vs.includes(upper)) {
      //         vs.push(upper);
      //       }
      //       if (!vs.includes(lower)) {
      //         vs.push(lower);
      //       }
      //     }
      //   );
      //   financialModelContext.addFinancialInput(
      //     FinancialInputRangesEnum.BUDGET,
      //     vs
      //   );
      //   break;
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
    // {
    //   financialCategory: FinancialCategory.MAIN,
    //   id: "budget",
    //   inputHeader: {
    //     label: "Budget",
    //     adjustmentButtonRow: {
    //       adjustments: [10, 20, 30],
    //       callback: (adjustment: number) =>
    //         handleAdjustment(adjustment, FinancialInputRangesEnum.BUDGET),
    //       id: "budget",
    //       disabled:
    //         financialModelContext.financialInputRanges.budget.length === 0,
    //     },
    //   },
    //   inputFields: [
    //     {
    //       id: "budget",
    //       value: budget?.toString() ?? "",
    //       description: "At least 1 - Click 'Enter' to add",
    //       // label: "Budget",
    //       // description: "At least 1 - Click 'Enter' to add",
    //       error: errors.budget,
    //       type: "number",
    //       prefix: "€",
    //       values: financialModelContext.financialInputRanges.budget,
    //       valueType: ValueType.CURRENCY,
    //       rangeAdjustments: [10, 20, 30],
    //       removeCallback: (value: number) =>
    //         financialModelContext.removeFinancialInput(
    //           FinancialInputRangesEnum.BUDGET,
    //           value
    //         ),
    //       onChange: (e) => {
    //         setBudget(Number(e.target.value.trim()));
    //       },
    //       onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
    //         addRangeInput(
    //           e,
    //           budget ?? 0,
    //           () => {
    //             const b = Number(budget);
    //             if (!isNaN(b)) {
    //               financialModelContext.addFinancialInput(
    //                 FinancialInputRangesEnum.BUDGET,
    //                 [b]
    //               );
    //               setBudget(undefined);
    //             }
    //           },
    //           financialModelContext.financialInputRanges.budget
    //         ),
    //     },
    //   ],
    // },
    // Initial Investment
    {
      financialCategory: FinancialCategory.MAIN,
      id: FinancialInputRangesEnum.INITIAL_INVESTMENT,
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
          value: financialInputs.initialInvestment?.toString() ?? "",
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
            handleInputChange(
              FinancialInputRangesEnum.INITIAL_INVESTMENT,
              Number(e.target.value.trim())
            );
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.initialInvestment ?? 0,
              () => {
                const iI = Number(financialInputs.initialInvestment);
                if (!isNaN(iI)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.INITIAL_INVESTMENT,
                    [iI]
                  );
                  handleInputChange("initialInvestment", undefined);
                }
              },
              financialModelContext.financialInputRanges.initialInvestment
            ),
        },
      ],
    },
    // Annual Operating Costs
    {
      financialCategory: FinancialCategory.COSTS,
      id: FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
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
          value: financialInputs.annualOperatingCosts?.toString() ?? "",
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
            handleInputChange(
              "annualOperatingCosts",
              Number(e.target.value.trim())
            );
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualOperatingCosts ?? 0,
              () => {
                const oc = Number(financialInputs.annualOperatingCosts);
                if (!isNaN(oc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
                    [oc]
                  );
                  handleInputChange("annualOperatingCosts", undefined);
                }
              },
              financialModelContext.financialInputRanges.annualOperatingCosts
            ),
        },
        {
          id: "annual-operating-costs-growth-rate",
          value:
            financialInputs.annualOperatingCostsGrowthRate?.toString() ?? "",
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
            handleInputChange(
              "annualOperatingCostsGrowthRate",
              Number(e.target.value.trim())
            );
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualOperatingCostsGrowthRate ?? 0,
              () => {
                const oc = Number(
                  financialInputs.annualOperatingCostsGrowthRate
                );
                if (!isNaN(oc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE,
                    [oc / 100]
                  );
                  handleInputChange(
                    "annualOperatingCostsGrowthRate",
                    undefined
                  );
                }
              },
              financialModelContext.financialInputRanges
                .annualOperatingCostsGrowthRate
            ),
        },
        {
          id: "first-annual-operating-cost-year",
          value:
            financialInputs.firstAnnualOperatingCostsYear?.toString() ?? "",
          // label: "Annual Cost Savings",
          description: "First year of annual operating costs - default is 1",
          error: errors.firstAnnualOperatingCostsYear,
          type: "number",
          prefix: "year",
          valueLabelPrefix: "year",
          valueType: ValueType.NUMBER,
          values:
            financialModelContext.financialInputRanges
              .firstAnnualOperatingCostsYear,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.FIRST_ANNUAL_OPERATING_COST_YEAR,
              value
            ),
          onChange: (e) => {
            handleInputChange(
              "firstAnnualOperatingCostsYear",
              Number(e.target.value.trim())
            );
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.firstAnnualOperatingCostsYear ?? 0,
              () => {
                const as = Number(
                  financialInputs.firstAnnualOperatingCostsYear
                );
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.FIRST_ANNUAL_OPERATING_COST_YEAR,
                    [as]
                  );
                  handleInputChange("firstAnnualOperatingCostsYear", undefined);
                }
              },

              financialModelContext.financialInputRanges
                .firstAnnualOperatingCostsYear
            ),
        },
      ],
    },
    // Annual Maintenance Costs
    {
      financialCategory: FinancialCategory.COSTS,
      id: FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
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
          value: financialInputs.annualMaintenanceCosts?.toString() ?? "",
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
            handleInputChange(
              "annualMaintenanceCosts",
              Number(e.target.value.trim())
            );
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualMaintenanceCosts ?? 0,
              () => {
                const mc = Number(financialInputs.annualMaintenanceCosts);
                if (!isNaN(mc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
                    [mc]
                  );
                  handleInputChange("annualMaintenanceCosts", undefined);
                }
              },
              financialModelContext.financialInputRanges.annualMaintenanceCosts
            ),
        },
        {
          id: "annual-maintenance-costs-growth-rate",
          value:
            financialInputs.annualMaintenanceCostsGrowthRate?.toString() ?? "",
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
            handleInputChange(
              "annualMaintenanceCostsGrowthRate",
              Number(e.target.value.trim())
            );
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualMaintenanceCostsGrowthRate ?? 0,
              () => {
                const mc = Number(
                  financialInputs.annualMaintenanceCostsGrowthRate
                );
                if (!isNaN(mc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE,
                    [mc / 100]
                  );
                  handleInputChange(
                    "annualMaintenanceCostsGrowthRate",
                    undefined
                  );
                }
              },
              financialModelContext.financialInputRanges
                .annualMaintenanceCostsGrowthRate
            ),
        },
        {
          id: "first-maintenance-cost-year",
          value:
            financialInputs.firstAnnualMaintenanceCostsYear?.toString() ?? "",
          // label: "Annual Cost Savings",
          description: "First year of annual maintenance costs - default is 1",
          error: errors.firstAnnualMaintenanceCostYear,
          type: "number",
          prefix: "year",
          valueLabelPrefix: "year",
          valueType: ValueType.NUMBER,
          values:
            financialModelContext.financialInputRanges
              .firstAnnualMaintenanceCostsYear,
          removeCallback: (value: number) =>
            financialModelContext.removeFinancialInput(
              FinancialInputRangesEnum.FIRST_ANNUAL_MAINTENANCE_COST_YEAR,
              value
            ),
          onChange: (e) => {
            handleInputChange(
              "firstAnnualMaintenanceCostsYear",
              Number(e.target.value.trim())
            );
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.firstAnnualMaintenanceCostsYear ?? 0,
              () => {
                const as = Number(
                  financialInputs.firstAnnualMaintenanceCostsYear
                );
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.FIRST_ANNUAL_MAINTENANCE_COST_YEAR,
                    [as]
                  );
                  handleInputChange(
                    "firstAnnualMaintenanceCostsYear",
                    undefined
                  );
                }
              },

              financialModelContext.financialInputRanges
                .firstAnnualMaintenanceCostsYear
            ),
        },
      ],
    },
    // Annual Training Costs
    {
      financialCategory: FinancialCategory.COSTS,
      id: FinancialInputRangesEnum.TRAINING_COSTS,
      inputHeader: {
        label: "Annual Training Costs",
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
          value: financialInputs.trainingCosts?.toString() ?? "",
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
            handleInputChange("trainingCosts", Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.trainingCosts ?? 0,
              () => {
                const tc = Number(financialInputs.trainingCosts);
                if (!isNaN(tc)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.TRAINING_COSTS,
                    [tc]
                  );
                  handleInputChange("trainingCosts", undefined);
                }
              },
              financialModelContext.financialInputRanges.trainingCosts
            ),
        },
      ],
    },
    // Additional one-time costs
    {
      financialCategory: FinancialCategory.COSTS,
      submitLabel: "Add",
      submitCallback: () =>
        financialModelContext.addDynamicInput({
          id: v4(),
          type: DynamicInputEnum.COSTS,
          year: financialInputs.dynamicCostsYear ?? 1,
          amount: financialInputs.dynamicCosts ?? 0,
        }),
      id: FinancialInputRangesEnum.DYNAMIC_INPUT,
      inputHeader: {
        label: "One-time Costs",
        description: "Enter amount and year affected",
      },
      isDynamic: true,
      dynamicRemoveCallback: (value: DynamicFinancialInput) =>
        financialModelContext.removeDynamicInput(value.id),
      dynamicValues: financialModelContext.dynamicInputs.filter(
        (input) => input.type == DynamicInputEnum.COSTS
      ),
      inputFields: [
        {
          id: "one-time-costs-amount",
          value: financialInputs.dynamicCosts?.toString() ?? "",
          type: "number",
          prefix: "€",
          // dynamicValues: financialModelContext.dynamicInputs.filter((input) => input.type == DynamicInputEnum.COSTS),
          valueType: ValueType.CURRENCY,
          // removeCallback: (value: number) =>
          //   financialModelContext.removeFinancialInput(
          //     FinancialInputRangesEnum.TRAINING_COSTS,
          //     value
          //   ),
          onChange: (e) => {
            handleInputChange("dynamicCosts", Number(e.target.value.trim()));
          },
        },
        {
          id: "one-time-costs-year",
          value: financialInputs.dynamicCostsYear?.toString() ?? "",
          type: "number",
          prefix: "year",
          // dynamicValues: financialModelContext.dynamicInputs.filter((input) => input.type == DynamicInputEnum.COSTS),
          valueType: ValueType.NUMBER,
          // removeCallback: (value: number) =>
          //   financialModelContext.removeFinancialInput(
          //     FinancialInputRangesEnum.TRAINING_COSTS,
          //     value
          //   ),
          onChange: (e) => {
            handleInputChange(
              "dynamicCostsYear",
              Number(e.target.value.trim())
            );
          },
        },
      ],
    },
    // Annual Revenue
    {
      financialCategory: FinancialCategory.REVENUE,
      id: FinancialInputRangesEnum.ANNUAL_REVENUE,
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
          value: financialInputs.annualRevenue?.toString() ?? "",
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
            handleInputChange("annualRevenue", Number(e.target.value.trim()));
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualRevenue ?? 0,
              () => {
                const ar = Number(financialInputs.annualRevenue);
                if (!isNaN(ar)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_REVENUE,
                    [ar]
                  );
                  handleInputChange("annualRevenue", undefined);
                }
              },

              financialModelContext.financialInputRanges.annualRevenue
            ),
        },
        {
          id: "annual-revenue-growth-rate",
          value: financialInputs.annualRevenueGrowthRate?.toString() ?? "",
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
            handleInputChange(
              "annualRevenueGrowthRate",
              Number(e.target.value.trim())
            );
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualRevenueGrowthRate ?? 0,
              () => {
                const ar = Number(financialInputs.annualRevenueGrowthRate);
                if (!isNaN(ar)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE,
                    [ar / 100]
                  );
                  handleInputChange("annualRevenueGrowthRate", undefined);
                }
              },
              financialModelContext.financialInputRanges.annualRevenueGrowthRate
            ),
        },
        {
          id: "first-revenue-generating-year",
          value: financialInputs.firstRevenueGeneratingYear?.toString() ?? "",
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
            handleInputChange(
              "firstRevenueGeneratingYear",
              Number(e.target.value.trim())
            );
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.firstRevenueGeneratingYear ?? 0,
              () => {
                const ar = Number(financialInputs.firstRevenueGeneratingYear);
                if (!isNaN(ar)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR,
                    [ar]
                  );
                  handleInputChange("firstRevenueGeneratingYear", undefined);
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
      financialCategory: FinancialCategory.REVENUE,
      id: FinancialInputRangesEnum.ANNUAL_COST_SAVINGS,
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
          value: financialInputs.annualCostSavings?.toString() ?? "",
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
            handleInputChange(
              "annualCostSavings",
              Number(e.target.value.trim())
            );
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualCostSavings ?? 0,
              () => {
                const as = Number(financialInputs.annualCostSavings);
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_COST_SAVINGS,
                    [as]
                  );
                  handleInputChange("annualCostSavings", undefined);
                }
              },

              financialModelContext.financialInputRanges.annualCostSavings
            ),
        },
        {
          id: "annual-cost-savings-growth-rate",
          value: financialInputs.annualCostSavingsGrowthRate?.toString() ?? "",
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
            handleInputChange(
              "annualCostSavingsGrowthRate",
              Number(e.target.value.trim())
            );
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.annualCostSavingsGrowthRate ?? 0,
              () => {
                const as = Number(financialInputs.annualCostSavingsGrowthRate);
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE,
                    [as / 100]
                  );
                  handleInputChange("annualCostSavingsGrowthRate", undefined);
                }
              },

              financialModelContext.financialInputRanges
                .annualCostSavingsGrowthRate
            ),
        },
        {
          id: "first-cost-saving-year",
          value: financialInputs.firstCostSavingYear?.toString() ?? "",
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
            handleInputChange(
              "firstCostSavingYear",
              Number(e.target.value.trim())
            );
          },

          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.firstCostSavingYear ?? 0,
              () => {
                const as = Number(financialInputs.firstCostSavingYear);
                if (!isNaN(as)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR,
                    [as]
                  );
                  handleInputChange("firstCostSavingYear", undefined);
                }
              },

              financialModelContext.financialInputRanges.firstCostSavingYear
            ),
        },
      ],
    },
    // Additional one-time revenues
    {
      financialCategory: FinancialCategory.REVENUE,
      id: FinancialInputRangesEnum.DYNAMIC_INPUT,
      inputHeader: {
        label: "One-time Revenues",
        description: "Enter amount and year affected",
      },
      submitLabel: "Add",
      submitCallback: () =>
        financialModelContext.addDynamicInput({
          id: v4(),
          type: DynamicInputEnum.REVENUES,
          year: financialInputs.dynamicRevenueYear ?? 1,
          amount: financialInputs.dynamicRevenue ?? 0,
        }),
      isDynamic: true,
      dynamicRemoveCallback: (value: DynamicFinancialInput) =>
        financialModelContext.removeDynamicInput(value.id),
      dynamicValues: financialModelContext.dynamicInputs.filter(
        (input) => input.type == DynamicInputEnum.REVENUES
      ),
      inputFields: [
        {
          id: "one-time-revenue-amount",
          value: financialInputs.dynamicRevenue?.toString() ?? "",
          type: "number",
          prefix: "€",
          valueType: ValueType.CURRENCY,
          // removeCallback: (value: number) =>
          //   financialModelContext.removeFinancialInput(
          //     FinancialInputRangesEnum.TRAINING_COSTS,
          //     value
          //   ),
          onChange: (e) => {
            handleInputChange("dynamicRevenue", Number(e.target.value.trim()));
          },
        },
        {
          id: "one-time-revenue-year",
          value: financialInputs.dynamicRevenueYear?.toString() ?? "",
          type: "number",
          prefix: "year",
          // dynamicValues: financialModelContext.dynamicInputs.filter((input) => input.type == DynamicInputEnum.COSTS),
          valueType: ValueType.NUMBER,
          // removeCallback: (value: number) =>
          //   financialModelContext.removeFinancialInput(
          //     FinancialInputRangesEnum.TRAINING_COSTS,
          //     value
          //   ),
          onChange: (e) => {
            handleInputChange(
              "dynamicRevenueYear",
              Number(e.target.value.trim())
            );
          },
        },
      ],
    },
    // Project Duration
    {
      financialCategory: FinancialCategory.MAIN,
      id: FinancialInputRangesEnum.PROJECT_DURATION,
      inputHeader: {
        label: "Project Duration",
        description: "At least 1 - Click 'Enter' to add",
      },
      inputFields: [
        {
          id: "project-duration",
          value: financialInputs.projectDuration?.toString() ?? "",
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
            handleInputChange("projectDuration", Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
            addRangeInput(
              e,
              financialInputs.projectDuration ?? 0,
              () => {
                const pd = Number(financialInputs.projectDuration);
                if (!isNaN(pd)) {
                  financialModelContext.addFinancialInput(
                    FinancialInputRangesEnum.PROJECT_DURATION,
                    [pd]
                  );
                  handleInputChange("projectDuration", undefined);
                }
              },
              financialModelContext.financialInputRanges.projectDuration
            ),
        },
      ],
    },
    // // Risk Factor
    // {
    //   financialCategory: FinancialCategory.MAIN,
    //   id: "risk-factor",
    //   inputHeader: {
    //     label: "Risk Factor",
    //     description: "At least 1 - between 0 and 100 - 'Enter' to add",
    //   },
    //   inputFields: [
    //     {
    //       id: "risk-factor",
    //       value: riskFactor?.toString() ?? "",
    //       // label: "Risk Factor",
    //       suffix: "%",
    //       valueLabelSuffix: "%",
    //       valueType: ValueType.PERCENTAGE,
    //       values: financialModelContext.financialInputRanges.riskFactor,
    //       removeCallback: (value: number) =>
    //         financialModelContext.removeFinancialInput(
    //           FinancialInputRangesEnum.RISK_FACTOR,
    //           value
    //         ),
    //       error: errors.riskFactor,
    //       // description: "At least 1 - between 0 and 100 - 'Enter' to add",
    //       type: "number",
    //       onChange: (e) => {
    //         setRiskFactor(Number(e.target.value.trim()));
    //       },
    //       onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    //         if (isBetweenOneAndHundred(riskFactor)) {
    //           addRangeInput(
    //             e,
    //             riskFactor ?? 0,
    //             () => {
    //               const rf = Number(riskFactor);
    //               if (!isNaN(rf)) {
    //                 financialModelContext.addFinancialInput(
    //                   FinancialInputRangesEnum.RISK_FACTOR,
    //                   [rf / 100]
    //                 );
    //                 setRiskFactor(undefined);
    //               }
    //             },
    //             financialModelContext.financialInputRanges.riskFactor
    //           );
    //         } else if (e.key === "Enter" || e.key === "Tab") {
    //           financialModelContext.setErrors((prev: any) => ({
    //             ...prev,
    //             riskFactor: "Risk factor must be between 0 and 100",
    //           }));
    //         }
    //       },
    //     },
    //   ],
    // },
    // Discount Rate
    {
      financialCategory: FinancialCategory.MAIN,
      id: FinancialInputRangesEnum.DISCOUNT_RATE,
      inputHeader: {
        label: "Discount Rate",
      },
      inputFields: [
        {
          id: "discount-ratte",
          value: financialInputs.discountRate?.toString() ?? "",
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
            handleInputChange("discountRate", Number(e.target.value.trim()));
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isBetweenOneAndHundred(financialInputs.discountRate)) {
              addRangeInput(
                e,
                financialInputs.discountRate ?? 0,
                () => {
                  const rf = Number(financialInputs.discountRate);
                  if (!isNaN(rf)) {
                    financialModelContext.addFinancialInput(
                      FinancialInputRangesEnum.DISCOUNT_RATE,
                      [rf / 100]
                    );
                    handleInputChange("discountRate", undefined);
                  }
                },
                financialModelContext.financialInputRanges.discountRate
              );
            } else if (e.key === "Enter" || e.key === "Tab") {
              financialModelContext.setErrors((prev: any) => ({
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
    setExecuteModel(true);
  };

  useEffect(() => {
    if (executeModel) {
      const hasErrors = financialModelContext.validateInputs();
      if (!hasErrors) {
        console.log(
          `Fincancial ranges are: ${JSON.stringify(
            financialModelContext.financialInputRanges
          )}`
        );
        //return;
        const r = financialResults(
          financialModelContext.financialInputRanges,
          financialModelContext.dynamicInputs
        );
        financialModelContext.setModelResults(r);
        resultsDialogContext.handleShowDialog(true, DialogType.FINANCIAL_MODEL);
      } else if (financialModelContext.modelResults != undefined) {
        console.log("financial model errors");
        financialModelContext.setModelResults(undefined);
      }
      setExecuteModel(false);
    }
  }, [executeModel]);

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
          (inputGroup) =>
            inputGroup.financialCategory === FinancialCategory.MAIN
        );
      case FinancialCategory.COSTS:
        return inputGroups.filter(
          (inputGroup) =>
            inputGroup.financialCategory === FinancialCategory.COSTS
        );
      case FinancialCategory.REVENUE:
        return inputGroups.filter(
          (inputGroup) =>
            inputGroup.financialCategory === FinancialCategory.REVENUE
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
      {/* {financialModelContext.modelResults && (
        <p>{JSON.stringify(financialModelContext.modelResults)}</p>
      )} */}
    </SectionContainer>
  );
}

export default FinancialSection;
