// stores/useOverviewStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProjectType } from "@/enums/ProjectType";
import { OverviewInputs } from "@/types/overview-inputs";

interface OverviewState {
  overviewInputs: OverviewInputs;
  handleOverviewInput: (input: OverviewInputs) => void;
}

const defaultInputs: OverviewInputs = {
  projectTitle: undefined,
  projectDescription: undefined,
  projectOwner: undefined,
  budget: undefined,
  projectType: ProjectType.DEFAULT,
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
    }),
    {
      name: "overview-storage", // Key for localStorage
    }
  )
);
