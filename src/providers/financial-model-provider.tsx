/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";
import { DynamicFinancialInput } from "@/types/financials/dynamic-financial-input";
import { FinancialInputRanges } from "@/types/financials/financial-input-ranges";
import { FinancialResults } from "@/types/financials/financial-results";
import { createContext, useContext, useMemo, useState } from "react";

interface FinancialModelProviderContextType {
  financialInputRanges: FinancialInputRanges;
  setDefaultValues: (inputs: FinancialInputRanges) => void;
  addFinancialInput: (
    inputRange: FinancialInputRangesEnum,
    input: number[]
  ) => void;
  removeFinancialInput: (
    inputRange: FinancialInputRangesEnum,
    input: number
  ) => void;
  dynamicInputs: DynamicFinancialInput[];
  addDynamicInput: (input: DynamicFinancialInput) => void;
  removeDynamicInput: (id: string) => void;
  modelResults: FinancialResults | undefined;
  setModelResults: (results?: FinancialResults) => void;
  errors: any;
  setErrors: (errors: any) => void;
  clearErrors: () => void;
  validateInputs: () => boolean;
}

const FinancialModelProviderContext = createContext<
  FinancialModelProviderContextType | undefined
>(undefined);

function FinancialModelProvider({ children }: { children: React.ReactNode }) {
  const [modelResults, setModelResults] = useState<
    FinancialResults | undefined
  >();
  const [dynamicInputs, setDynamicInputs] = useState<DynamicFinancialInput[]>(
    []
  );
  const [financialInputRanges, setFinancialInputRanges] =
    useState<FinancialInputRanges>({
      initialInvestment: [1000],
      annualOperatingCosts: [1000],
      annualOperatingCostsGrowthRate: [0],
      firstAnnualOperatingCostsYear: [1],
      annualMaintenanceCosts: [1000],
      annualMaintenanceCostsGrowthRate: [0],
      firstAnnualMaintenanceCostsYear: [1],
      trainingCosts: [0],
      annualRevenue: [1000],
      annualRevenueGrowthRate: [0],
      firstRevenueGeneratingYear: [1],
      annualCostSavings: [1000],
      annualCostSavingsGrowthRate: [0],
      firstCostSavingYear: [1],
      projectDuration: [10],
      riskFactor: [0.02],
      discountRate: [0.0633],
    });
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

  const addDynamicInput = (input: DynamicFinancialInput) => {
    console.log("Adding dynamic input", input);
    setDynamicInputs((prev) => [...prev, input]);
  };

  const removeDynamicInput = (id: string) => {
    setDynamicInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const addFinancialInput = (
    inputRange: FinancialInputRangesEnum,
    input: number[]
  ) => {
    switch (inputRange) {
      // case FinancialInputRangesEnum.BUDGET:
      //   setFinancialInputRanges({
      //     ...financialInputRanges,
      //     budget: [
      //       ...financialInputRanges.budget,
      //       ...input.filter(
      //         (value) => !financialInputRanges.budget.includes(value)
      //       ),
      //     ],
      //   });
      //   break;
      case FinancialInputRangesEnum.INITIAL_INVESTMENT:
        setFinancialInputRanges({
          ...financialInputRanges,
          initialInvestment: [
            ...financialInputRanges.initialInvestment,
            ...input.filter(
              (value) => !financialInputRanges.initialInvestment.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualOperatingCosts: [
            ...financialInputRanges.annualOperatingCosts,
            ...input.filter(
              (value) =>
                !financialInputRanges.annualOperatingCosts.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualOperatingCostsGrowthRate: [
            ...financialInputRanges.annualOperatingCostsGrowthRate,
            ...input.filter(
              (value) =>
                !financialInputRanges.annualOperatingCostsGrowthRate.includes(
                  value
                )
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.FIRST_ANNUAL_OPERATING_COST_YEAR:
        setFinancialInputRanges({
          ...financialInputRanges,
          firstAnnualOperatingCostsYear: [
            ...financialInputRanges.firstAnnualOperatingCostsYear,
            ...input.filter(
              (value) =>
                !financialInputRanges.firstAnnualOperatingCostsYear.includes(
                  value
                )
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualMaintenanceCosts: [
            ...financialInputRanges.annualMaintenanceCosts,
            ...input.filter(
              (value) =>
                !financialInputRanges.annualMaintenanceCosts.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualMaintenanceCostsGrowthRate: [
            ...financialInputRanges.annualMaintenanceCostsGrowthRate,
            ...input.filter(
              (value) =>
                !financialInputRanges.annualMaintenanceCostsGrowthRate.includes(
                  value
                )
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.FIRST_ANNUAL_MAINTENANCE_COST_YEAR:
        setFinancialInputRanges({
          ...financialInputRanges,
          firstAnnualMaintenanceCostsYear: [
            ...financialInputRanges.firstAnnualMaintenanceCostsYear,
            ...input.filter(
              (value) =>
                !financialInputRanges.firstAnnualMaintenanceCostsYear.includes(
                  value
                )
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.TRAINING_COSTS:
        setFinancialInputRanges({
          ...financialInputRanges,
          trainingCosts: [
            ...financialInputRanges.trainingCosts,
            ...input.filter(
              (value) => !financialInputRanges.trainingCosts.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_REVENUE:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualRevenue: [
            ...financialInputRanges.annualRevenue,
            ...input.filter(
              (value) => !financialInputRanges.annualRevenue.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualRevenueGrowthRate: [
            ...financialInputRanges.annualRevenueGrowthRate,
            ...input.filter(
              (value) =>
                !financialInputRanges.annualRevenueGrowthRate.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR:
        setFinancialInputRanges({
          ...financialInputRanges,
          firstRevenueGeneratingYear: [
            ...financialInputRanges.firstRevenueGeneratingYear,
            ...input.filter(
              (value) =>
                !financialInputRanges.firstRevenueGeneratingYear.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_COST_SAVINGS:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualCostSavings: [
            ...financialInputRanges.annualCostSavings,
            ...input.filter(
              (value) => !financialInputRanges.annualCostSavings.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualCostSavingsGrowthRate: [
            ...financialInputRanges.annualCostSavingsGrowthRate,
            ...input.filter(
              (value) =>
                !financialInputRanges.annualCostSavingsGrowthRate.includes(
                  value
                )
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR:
        setFinancialInputRanges({
          ...financialInputRanges,
          firstCostSavingYear: [
            ...financialInputRanges.firstCostSavingYear,
            ...input.filter(
              (value) =>
                !financialInputRanges.firstCostSavingYear.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.PROJECT_DURATION:
        setFinancialInputRanges({
          ...financialInputRanges,
          projectDuration: [
            ...financialInputRanges.projectDuration,
            ...input.filter(
              (value) => !financialInputRanges.projectDuration.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.RISK_FACTOR:
        setFinancialInputRanges({
          ...financialInputRanges,
          riskFactor: [
            ...financialInputRanges.riskFactor,
            ...input.filter(
              (value) => !financialInputRanges.riskFactor.includes(value)
            ),
          ],
        });
        break;
      case FinancialInputRangesEnum.DISCOUNT_RATE:
        setFinancialInputRanges({
          ...financialInputRanges,
          discountRate: [
            ...financialInputRanges.discountRate,
            ...input.filter(
              (value) => !financialInputRanges.discountRate.includes(value)
            ),
          ],
        });
        break;
    }
  };

  const removeFinancialInput = (
    inputRange: FinancialInputRangesEnum,
    input: number
  ) => {
    setFinancialInputRanges((prev) => {
      const updatedRanges = { ...prev };
      switch (inputRange) {
        // case FinancialInputRangesEnum.BUDGET:
        //   updatedRanges.budget = updatedRanges.budget.filter(
        //     (value) => value !== input
        //   );
        //   break;
        case FinancialInputRangesEnum.INITIAL_INVESTMENT:
          updatedRanges.initialInvestment =
            updatedRanges.initialInvestment.filter((value) => value !== input);
          break;
        case FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS:
          updatedRanges.annualOperatingCosts =
            updatedRanges.annualOperatingCosts.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE:
          updatedRanges.annualOperatingCostsGrowthRate =
            updatedRanges.annualOperatingCostsGrowthRate.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.FIRST_ANNUAL_OPERATING_COST_YEAR:
          updatedRanges.firstAnnualOperatingCostsYear =
            updatedRanges.firstAnnualOperatingCostsYear.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS:
          updatedRanges.annualMaintenanceCosts =
            updatedRanges.annualMaintenanceCosts.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE:
          updatedRanges.annualMaintenanceCostsGrowthRate =
            updatedRanges.annualMaintenanceCostsGrowthRate.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.FIRST_ANNUAL_MAINTENANCE_COST_YEAR:
          updatedRanges.firstAnnualMaintenanceCostsYear =
            updatedRanges.firstAnnualMaintenanceCostsYear.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.TRAINING_COSTS:
          updatedRanges.trainingCosts = updatedRanges.trainingCosts.filter(
            (value) => value !== input
          );
          break;
        case FinancialInputRangesEnum.ANNUAL_REVENUE:
          updatedRanges.annualRevenue = updatedRanges.annualRevenue.filter(
            (value) => value !== input
          );
          break;
        case FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE:
          updatedRanges.annualRevenueGrowthRate =
            updatedRanges.annualRevenueGrowthRate.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR:
          updatedRanges.firstRevenueGeneratingYear =
            updatedRanges.firstRevenueGeneratingYear.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.ANNUAL_COST_SAVINGS:
          updatedRanges.annualCostSavings =
            updatedRanges.annualCostSavings.filter((value) => value !== input);
          break;
        case FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE:
          updatedRanges.annualCostSavingsGrowthRate =
            updatedRanges.annualCostSavingsGrowthRate.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR:
          updatedRanges.firstCostSavingYear =
            updatedRanges.firstCostSavingYear.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.PROJECT_DURATION:
          updatedRanges.projectDuration = updatedRanges.projectDuration.filter(
            (value) => value !== input
          );
          break;
        case FinancialInputRangesEnum.RISK_FACTOR:
          updatedRanges.riskFactor = updatedRanges.riskFactor.filter(
            (value) => value !== input
          );
          break;
        case FinancialInputRangesEnum.DISCOUNT_RATE:
          updatedRanges.discountRate = updatedRanges.discountRate.filter(
            (value) => value !== input
          );
          break;
      }
      return updatedRanges;
    });
  };

  const validateInputs = (): boolean => {
    clearErrors();
    let hasErrors = false;
    // if (financialInputRanges.budget.length === 0) {
    //   setErrors((prev: any) => ({
    //     ...prev,
    //     budget: "Set at least one expected budget",
    //   }));
    //   hasErrors = true;
    // }
    if (financialInputRanges.initialInvestment.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        initialInvestment: "Set a least one expected initial investment",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualOperatingCosts.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualOperatingCosts: "Set at least one expected annual operating cost",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualOperatingCostsGrowthRate.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualOperatingCostsGrowthRate:
          "Set at least one expected annual operating costs growth rate",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualMaintenanceCosts.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualMaintenanceCosts:
          "Set at least one expected annual maintenance cost",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualMaintenanceCostsGrowthRate.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualMaintenanceCostsGrowthRate:
          "Set at least one expected annual maintenance cost growth rate",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.trainingCosts.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        trainingCosts: "Set at least one expected annual training cost",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualRevenue.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualRevenue: "Set at least one expected annual revenue",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualRevenueGrowthRate.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualRevenueGrowthRate:
          "Set at least one expected annual revenue growth rate",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.firstRevenueGeneratingYear.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        firstRevenueGeneratingYear:
          "Set at least one first revenue generating year",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.projectDuration.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        projectDuration: "Set at least one expected project duration",
      }));
      hasErrors = true;
    }
    // if (financialInputRanges.riskFactor.length === 0) {
    //   setErrors((prev: any) => ({
    //     ...prev,
    //     riskFactor: "Set at least one expected risk factor",
    //   }));
    //   hasErrors = true;
    // }
    if (financialInputRanges.discountRate.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        discountRate: "Set at least one expected discount rate",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualCostSavings.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualCostSavings: "Set at least one expected cost savings value",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.annualCostSavingsGrowthRate.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualCostSavingsGrowthRate:
          "Set at least one expected cost savings growth rate",
      }));
      hasErrors = true;
    }
    if (financialInputRanges.firstCostSavingYear.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        firstCostSavingYear: "Set at least one first cost saving year",
      }));
      hasErrors = true;
    }
    return hasErrors;
  };

  const setDefaultValues = (inputs: FinancialInputRanges) => {
    setFinancialInputRanges(inputs);
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      financialInputRanges,
      setDefaultValues,
      addFinancialInput,
      removeFinancialInput,
      dynamicInputs,
      addDynamicInput,
      removeDynamicInput,
      modelResults,
      setModelResults,
      errors,
      setErrors,
      clearErrors,
      validateInputs,
    }),
    [financialInputRanges, modelResults, errors, dynamicInputs] // Only re-compute the memoized value when financialInputRanges changes
  );

  return (
    <FinancialModelProviderContext.Provider value={contextValue}>
      {children}
    </FinancialModelProviderContext.Provider>
  );
}

export const useFinancialModel = () => {
  const context = useContext(FinancialModelProviderContext);
  if (!context) {
    throw new Error(
      "useFinancialModel must be used within a FinancialModelProviderContext"
    );
  }
  return context;
};

export default FinancialModelProvider;
