// stores/useRioStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Impact } from "@/enums/Impact";
import { RioInputEnum } from "@/enums/RioInputEnum";
import { RioInputs } from "@/types/rio/rio-inputs";
import { RioResults } from "@/types/rio/rio-results";

interface RioState {
  rioInputs: RioInputs;
  modelResults?: RioResults;
  setDefaultValues: (inputs: RioInputs) => void;
  setModelResults: (results?: RioResults) => void;
  setRioInput: (
    inputType: RioInputEnum,
    input?: number,
    impact?: Impact,
    comment?: string
  ) => void;
}

const defaultInputs: RioInputs = {
  privacy: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  marketAdvantage: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  longTermResilience: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  longTermScalability: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  legalRequirements: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  innovation: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  otherRisks: { value: 0, impact: Impact.NEUTRAL, comment: "" },
};

const inputKeyMap: Record<RioInputEnum, keyof RioInputs> = {
  [RioInputEnum.PRIVACY]: "privacy",
  [RioInputEnum.MARKET_ADVANTAGE]: "marketAdvantage",
  [RioInputEnum.LONG_TERM_RESILIENCE]: "longTermResilience",
  [RioInputEnum.LONG_TERM_SUSTAINABILITY]: "longTermScalability",
  [RioInputEnum.LEGAL_REQUIREMENTS]: "legalRequirements",
  [RioInputEnum.INNOVATION]: "innovation",
  [RioInputEnum.OTHER_RISKS]: "otherRisks",
};

export const useRioStore = create<RioState>()(
  persist(
    (set) => ({
      rioInputs: defaultInputs,
      modelResults: undefined,
      setDefaultValues: (inputs) => set({ rioInputs: inputs }),
      setModelResults: (results) => set({ modelResults: results }),
      setRioInput: (inputType, input, impact, comment) =>
        set((state) => {
          const key = inputKeyMap[inputType];
          const current = state.rioInputs[key];
          return {
            rioInputs: {
              ...state.rioInputs,
              [key]: {
                value: input !== undefined ? input : current.value,
                impact: impact ?? current.impact,
                comment: comment ?? current.comment,
              },
            },
          };
        }),
    }),
    {
      name: "rio-storage", // localStorage key
    }
  )
);
