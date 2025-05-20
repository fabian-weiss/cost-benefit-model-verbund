// stores/useSocietalStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";
import { Impact } from "@/enums/Impact";
import { SocietalInputs } from "@/types/societal/societal-inputs";
import { SocietalResults } from "@/types/societal/societal-results";

interface SocietalState {
  societalInputs: SocietalInputs;
  modelResults?: SocietalResults;
  setDefaultValues: (inputs: SocietalInputs) => void;
  setModelResults: (results?: SocietalResults) => void;
  setSocietalInput: (
    inputType: SocietalInputEnum,
    input?: number,
    impact?: Impact,
    comment?: string
  ) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const defaultInputs: SocietalInputs = {
  customerSatisfaction: {
    value: 0,
    impact: Impact.NEUTRAL,
    comment: "",
  },
  customerAffordability: {
    value: 0,
    impact: Impact.NEUTRAL,
    comment: "",
  },
  companyCulture: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  communityImplications: {
    value: 0,
    impact: Impact.NEUTRAL,
    comment: "",
  },
  knowledgeSharingAcrossTheSupplyChain: {
    value: 0,
    impact: Impact.NEUTRAL,
    comment: "",
  },
  shareholderValue: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  guidingPrinciplesAlignment: {
    value: 0,
    impact: Impact.NEUTRAL,
    comment: "",
  },
  publicPerception: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  workplaceCreation: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  healthAndSafety: { value: 0, impact: Impact.NEUTRAL, comment: "" },
};

const inputKeyMap: Record<SocietalInputEnum, keyof SocietalInputs> = {
  [SocietalInputEnum.CUSTOMER_SATISFACTION]: "customerSatisfaction",
  [SocietalInputEnum.CUSTOMER_AFFORDABILITY]: "customerAffordability",
  [SocietalInputEnum.COMPANY_CULTURE]: "companyCulture",
  [SocietalInputEnum.COMMUNITY_IMPLICATIONS]: "communityImplications",
  [SocietalInputEnum.KNOWLEDGE_SHARING_ACROSS_THE_SUPPLY_CHAIN]:
    "knowledgeSharingAcrossTheSupplyChain",
  [SocietalInputEnum.SHAREHOLDER_VALUE]: "shareholderValue",
  [SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT]:
    "guidingPrinciplesAlignment",
  [SocietalInputEnum.PUBLIC_PERCEPTION]: "publicPerception",
  [SocietalInputEnum.WORKPLACE_CREATION]: "workplaceCreation",
  [SocietalInputEnum.HEALTH_AND_SAFETY]: "healthAndSafety",
};

export const useSocietalStore = create<SocietalState>()(
  persist(
    (set) => ({
      societalInputs: defaultInputs,
      modelResults: undefined,
      setDefaultValues: (inputs) =>
        set({ societalInputs: JSON.parse(JSON.stringify(inputs)) }),
      setModelResults: (results) => set({ modelResults: results }),
      setSocietalInput: (inputType, input, impact, comment) =>
        set((state) => {
          const key = inputKeyMap[inputType];
          const current = state.societalInputs[key];
          return {
            societalInputs: {
              ...state.societalInputs,
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
      name: "societal-storage", // key in localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // mark hydration as done
      },
    }
  )
);
