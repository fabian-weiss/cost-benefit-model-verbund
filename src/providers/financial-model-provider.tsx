"use client";
import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";
import { FinancialInputRanges } from "@/types/financials/financial-input-ranges";
import { FinancialResults } from "@/types/financials/financial-results";
import { createContext, useContext, useMemo, useState } from "react";

interface FinancialModelProviderContextType {
  financialInputRanges: FinancialInputRanges;
  addFinancialInput: (
    inputRange: FinancialInputRangesEnum,
    input: number[]
  ) => void;
  removeFinancialInput: (
    inputRange: FinancialInputRangesEnum,
    input: number
  ) => void;
  modelResults: FinancialResults | undefined;
  setModelResults: (results?: FinancialResults) => void;
}

const FinancialModelProviderContext = createContext<
  FinancialModelProviderContextType | undefined
>(undefined);

function FinancialModelProvider({ children }: { children: React.ReactNode }) {
  const [modelResults, setModelResults] = useState<
    FinancialResults | undefined
  >();
  const [financialInputRanges, setFinancialInputRanges] =
    useState<FinancialInputRanges>({
      budget: [],
      initialInvestment: [],
      annualOperatingCosts: [],
      annualOperatingCostsGrowthRate: [0],
      annualMaintenanceCosts: [],
      annualMaintenanceCostsGrowthRate: [0],
      trainingCosts: [],
      annualRevenue: [],
      annualRevenueGrowthRate: [0],
      firstRevenueGeneratingYear: [1],
      annualCostSavings: [],
      annualCostSavingsGrowthRate: [0],
      firstCostSavingYear: [1],
      projectDuration: [],
      riskFactor: [0.02],
      discountRate: [0.0633],
    });

  const addFinancialInput = (
    inputRange: FinancialInputRangesEnum,
    input: number[]
  ) => {
    switch (inputRange) {
      case FinancialInputRangesEnum.BUDGET:
        setFinancialInputRanges({
          ...financialInputRanges,
          budget: [
            ...financialInputRanges.budget,
            ...input.filter(
              (value) => !financialInputRanges.budget.includes(value)
            ),
          ],
        });
        break;
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
        case FinancialInputRangesEnum.BUDGET:
          updatedRanges.budget = updatedRanges.budget.filter(
            (value) => value !== input
          );
          break;
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

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      financialInputRanges,
      addFinancialInput,
      removeFinancialInput,
      modelResults,
      setModelResults,
    }),
    [financialInputRanges, modelResults] // Only re-compute the memoized value when financialInputRanges changes
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
