import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";
import { DynamicFinancialInput } from "@/types/financials/dynamic-financial-input";
import { FinancialInputRanges } from "@/types/financials/financial-input-ranges";
import { FinancialResults } from "@/types/financials/financial-results";

export type FinancialErrors = Record<keyof FinancialInputRanges, string>;

interface FinancialState {
  financialInputRanges: FinancialInputRanges;
  setDefaultValues: (inputs: FinancialInputRanges) => void;
  addFinancialInput: (
    inputRange: MappedFinancialInputEnum,
    input: number[]
  ) => void;
  removeFinancialInput: (
    inputRange: MappedFinancialInputEnum,
    input: number
  ) => void;
  dynamicInputs: DynamicFinancialInput[];
  addDynamicInput: (input: DynamicFinancialInput) => void;
  removeDynamicInput: (id: string) => void;
  modelResults?: FinancialResults;
  setModelResults: (results?: FinancialResults) => void;
  errors: FinancialErrors;
  setErrors: (errors: FinancialErrors) => void;
  clearErrors: () => void;
  validateInputs: () => boolean;
}

const defaultInputs: FinancialInputRanges = {
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
};

const defaultErrors: FinancialErrors = Object.keys(defaultInputs).reduce(
  (acc, key) => ({ ...acc, [key]: "" }),
  {} as FinancialErrors
);

// This limits to only the enum values that map to keys in the object
export type MappedFinancialInputEnum =
  | FinancialInputRangesEnum.INITIAL_INVESTMENT
  | FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS
  | FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE
  | FinancialInputRangesEnum.FIRST_ANNUAL_OPERATING_COST_YEAR
  | FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS
  | FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE
  | FinancialInputRangesEnum.FIRST_ANNUAL_MAINTENANCE_COST_YEAR
  | FinancialInputRangesEnum.TRAINING_COSTS
  | FinancialInputRangesEnum.ANNUAL_REVENUE
  | FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE
  | FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR
  | FinancialInputRangesEnum.ANNUAL_COST_SAVINGS
  | FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE
  | FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR
  | FinancialInputRangesEnum.PROJECT_DURATION
  | FinancialInputRangesEnum.RISK_FACTOR
  | FinancialInputRangesEnum.DISCOUNT_RATE;

const inputKeyMap: Record<
  MappedFinancialInputEnum,
  keyof FinancialInputRanges
> = {
  [FinancialInputRangesEnum.INITIAL_INVESTMENT]: "initialInvestment",
  [FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS]: "annualOperatingCosts",
  [FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS_GROWTH_RATE]:
    "annualOperatingCostsGrowthRate",
  [FinancialInputRangesEnum.FIRST_ANNUAL_OPERATING_COST_YEAR]:
    "firstAnnualOperatingCostsYear",
  [FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS]: "annualMaintenanceCosts",
  [FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS_GROWTH_RATE]:
    "annualMaintenanceCostsGrowthRate",
  [FinancialInputRangesEnum.FIRST_ANNUAL_MAINTENANCE_COST_YEAR]:
    "firstAnnualMaintenanceCostsYear",
  [FinancialInputRangesEnum.TRAINING_COSTS]: "trainingCosts",
  [FinancialInputRangesEnum.ANNUAL_REVENUE]: "annualRevenue",
  [FinancialInputRangesEnum.ANNUAL_REVENUE_GROWTH_RATE]:
    "annualRevenueGrowthRate",
  [FinancialInputRangesEnum.FIRST_REVENUE_GENERATING_YEAR]:
    "firstRevenueGeneratingYear",
  [FinancialInputRangesEnum.ANNUAL_COST_SAVINGS]: "annualCostSavings",
  [FinancialInputRangesEnum.ANNUAL_COST_SAVINGS_GROWTH_RATE]:
    "annualCostSavingsGrowthRate",
  [FinancialInputRangesEnum.FIRST_COST_SAVING_YEAR]: "firstCostSavingYear",
  [FinancialInputRangesEnum.PROJECT_DURATION]: "projectDuration",
  [FinancialInputRangesEnum.RISK_FACTOR]: "riskFactor",
  [FinancialInputRangesEnum.DISCOUNT_RATE]: "discountRate",
};

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set, get) => ({
      financialInputRanges: defaultInputs,
      modelResults: undefined,
      dynamicInputs: [],
      errors: defaultErrors,

      setDefaultValues: (inputs) => set({ financialInputRanges: inputs }),

      setModelResults: (results) => set({ modelResults: results }),

      addFinancialInput: (
        inputRange: MappedFinancialInputEnum,
        input: number[]
      ) => {
        const key = inputKeyMap[inputRange]; // ✅ now TS knows it’s a valid key
        const current = get().financialInputRanges[key];
        const updated = [
          ...current,
          ...input.filter((i) => !current.includes(i)),
        ];

        set((state) => ({
          financialInputRanges: {
            ...state.financialInputRanges,
            [key]: updated,
          },
        }));
      },

      removeFinancialInput: (
        inputRange: MappedFinancialInputEnum,
        input: number
      ) => {
        const key = inputKeyMap[inputRange];
        const current = get().financialInputRanges[key];

        set((state) => ({
          financialInputRanges: {
            ...state.financialInputRanges,
            [key]: current.filter((v) => v !== input),
          },
        }));
      },

      addDynamicInput: (input) =>
        set((state) => ({ dynamicInputs: [...state.dynamicInputs, input] })),

      removeDynamicInput: (id) =>
        set((state) => ({
          dynamicInputs: state.dynamicInputs.filter((i) => i.id !== id),
        })),

      setErrors: (errors) => set({ errors }),
      clearErrors: () => set({ errors: defaultErrors }),

      validateInputs: () => {
        const state = get();
        const ranges = state.financialInputRanges;
        const newErrors = { ...defaultErrors };
        let hasErrors = false;

        const requiredFields: (keyof FinancialInputRanges)[] = [
          "initialInvestment",
          "annualOperatingCosts",
          "annualOperatingCostsGrowthRate",
          "annualMaintenanceCosts",
          "annualMaintenanceCostsGrowthRate",
          "trainingCosts",
          "annualRevenue",
          "annualRevenueGrowthRate",
          "firstRevenueGeneratingYear",
          "annualCostSavings",
          "annualCostSavingsGrowthRate",
          "firstCostSavingYear",
          "projectDuration",
          "discountRate",
        ];

        requiredFields.forEach((key) => {
          if (ranges[key].length === 0) {
            newErrors[key] = `Set at least one value for ${key}`;
            hasErrors = true;
          }
        });

        if (hasErrors) {
          set({ errors: newErrors });
        } else {
          state.clearErrors();
        }

        return hasErrors;
      },
    }),
    {
      name: "financial-storage", // localStorage key
    }
  )
);
