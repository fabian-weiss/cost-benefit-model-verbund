// stores/useOverviewStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProjectType } from "@/enums/ProjectType";
import { OverviewInputs } from "@/types/overview-inputs";

interface OverviewState {
  overviewInputs: OverviewInputs;
  handleOverviewInput: (input: OverviewInputs) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const defaultInputs: OverviewInputs = {
  projectTitle: undefined,
  projectDescription: undefined,
  projectOwner: undefined,
  budget: undefined,
  projectType: ProjectType.DEFAULT,
  enableFinancial: false,
};

export const useOverviewStore = create<OverviewState>()(
  persist(
    (set) => ({
      overviewInputs: defaultInputs,
      handleOverviewInput: (input) =>
        set((state) => ({
          overviewInputs: {
            ...state.overviewInputs,
            ...input,
          },
        })),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "overview-storage", // Key for localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // mark hydration as done
      },
    }
  )
);
