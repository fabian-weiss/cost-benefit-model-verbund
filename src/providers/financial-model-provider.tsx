"use client";
import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";
import { FinancialInputRanges } from "@/types/financials/financial-input-ranges";
import { createContext, useContext, useState } from "react";

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
}

const FinancialModelProviderContext = createContext<
  FinancialModelProviderContextType | undefined
>(undefined);

function FinancialModelProvider({ children }: { children: React.ReactNode }) {
  const [financialInputRanges, setFinancialInputRanges] =
    useState<FinancialInputRanges>({
      budget: [],
      initialInvestment: [],
      annualOperatingCosts: [],
      annualMaintenanceCosts: [],
      annualTrainingCosts: [],
      annualRevenue: [],
      projectDuration: [],
      riskFactor: [],
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
      case FinancialInputRangesEnum.ANNUAL_TRAINING_COSTS:
        setFinancialInputRanges({
          ...financialInputRanges,
          annualTrainingCosts: [
            ...financialInputRanges.annualTrainingCosts,
            ...input.filter(
              (value) =>
                !financialInputRanges.annualTrainingCosts.includes(value)
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
        case FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS:
          updatedRanges.annualMaintenanceCosts =
            updatedRanges.annualMaintenanceCosts.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.ANNUAL_TRAINING_COSTS:
          updatedRanges.annualTrainingCosts =
            updatedRanges.annualTrainingCosts.filter(
              (value) => value !== input
            );
          break;
        case FinancialInputRangesEnum.ANNUAL_REVENUE:
          updatedRanges.annualRevenue = updatedRanges.annualRevenue.filter(
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
      }
      return updatedRanges;
    });
  };

  return (
    <FinancialModelProviderContext.Provider
      value={{ financialInputRanges, addFinancialInput, removeFinancialInput }}
    >
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
