"use client";
import { ProjectType } from "@/enums/ProjectType";
import { OverviewInputs } from "@/types/overview-inputs";
import { createContext, useContext, useMemo, useState } from "react";

interface OverviewProviderContextType {
  overviewInputs: OverviewInputs;
  handleOverviewInput: (input: OverviewInputs) => void;
}

const OverviewProviderContext = createContext<
  OverviewProviderContextType | undefined
>(undefined);

function OverviewProvider({ children }: { children: React.ReactNode }) {
  const [overviewInputs, setOverviewInputs] = useState<OverviewInputs>({
    projectTitle: undefined,
    projectDescription: undefined,
    projectOwner: undefined,
    budget: undefined,
    projectType: ProjectType.DEFAULT,
  });

  const handleOverviewInput = (input: OverviewInputs) => {
    setOverviewInputs((prev) => ({
      ...prev,
      ...input,
    }));
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      overviewInputs,
      handleOverviewInput,
    }),
    [overviewInputs] // Only re-compute the memoized value when financialInputRanges changes
  );

  return (
    <OverviewProviderContext.Provider value={contextValue}>
      {children}
    </OverviewProviderContext.Provider>
  );
}

export const useOverview = () => {
  const context = useContext(OverviewProviderContext);
  if (!context) {
    throw new Error(
      "useOverview must be used within a OverviewProviderContext"
    );
  }
  return context;
};

export default OverviewProvider;
