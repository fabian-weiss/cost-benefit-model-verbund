// stores/useEnvironmentalStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";
import { Impact } from "@/enums/Impact";
import { EnvironmentalInputs } from "@/types/environmental/environmental-inputs";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";

interface EnvironmentalState {
  environmentalInputs: EnvironmentalInputs;
  modelResults?: EnvironmentalResults;
  setDefaultValues: (inputs: EnvironmentalInputs) => void;
  setEnvironmentalInput: (
    inputType: EnvironmentalInputEnum,
    input?: number,
    impact?: Impact,
    comment?: string
  ) => void;
  setModelResults: (results?: EnvironmentalResults) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const defaultInputs: EnvironmentalInputs = {
  unSustainableGoals: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  wasteProduction: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  biodiversity: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  pollution: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  sustainableEneryIntegration: {
    value: 0,
    impact: Impact.NEUTRAL,
    comment: "",
  },
  energyEfficiency: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  meetingEnvironmentalRegulations: {
    value: 0,
    impact: Impact.NEUTRAL,
    comment: "",
  },
};

const inputKeyMap: Record<EnvironmentalInputEnum, keyof EnvironmentalInputs> = {
  [EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS]: "unSustainableGoals",
  [EnvironmentalInputEnum.WASTE_PRODUCTION]: "wasteProduction",
  [EnvironmentalInputEnum.BIODIVERSITY]: "biodiversity",
  [EnvironmentalInputEnum.POLLUTION]: "pollution",
  [EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION]:
    "sustainableEneryIntegration",
  [EnvironmentalInputEnum.ENERGY_EFFICIENCY]: "energyEfficiency",
  [EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS]:
    "meetingEnvironmentalRegulations",
};

export const useEnvironmentalStore = create<EnvironmentalState>()(
  persist(
    (set) => ({
      environmentalInputs: defaultInputs,
      modelResults: undefined,
      setDefaultValues: (inputs) => set({ environmentalInputs: inputs }),
      setModelResults: (results) => set({ modelResults: results }),
      setEnvironmentalInput: (inputType, input, impact, comment) =>
        set((state) => {
          const key = inputKeyMap[inputType];
          const current = state.environmentalInputs[key];
          return {
            environmentalInputs: {
              ...state.environmentalInputs,
              [key]: {
                value: input !== undefined ? input : current.value,
                impact: impact ?? current.impact,
                comment: comment ?? current.comment,
              },
            },
          };
        }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "environmental-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // mark hydration as done
      },
    }
  )
);
