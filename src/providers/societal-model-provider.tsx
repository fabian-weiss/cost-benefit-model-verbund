"use client";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";

import { SocietalInputs } from "@/types/societal/societal-inputs";
import { createContext, useContext, useMemo, useState } from "react";

interface SocietalModelProviderContextType {
  societalInputs: SocietalInputs;
  setSocietalInput: (inputType: SocietalInputEnum, input: number) => void;
}

const SocietalModelProviderContext = createContext<
  SocietalModelProviderContextType | undefined
>(undefined);

function SocietalModelProvider({ children }: { children: React.ReactNode }) {
  const [societalInputs, setSocietalInputs] = useState<SocietalInputs>({
    jobCreation: 0,
    jobEquity: 0,
    healthAndSafety: 0,
    culturalImpact: 0,
    publicPerception: 0,
    edcuationalImpact: 0,
    qualityOfLife: 0,
    customerSatifaction: 0,
    employeeSatisfaction: 0,
  });

  const setSocietalInput = (inputType: SocietalInputEnum, input: number) => {
    switch (inputType) {
      case SocietalInputEnum.JOB_CREATION:
        setSocietalInputs((prev) => ({ ...prev, jobCreation: input }));
        break;
      case SocietalInputEnum.JOB_EQUITY:
        setSocietalInputs((prev) => ({ ...prev, jobEquity: input }));
        break;
      case SocietalInputEnum.HEALTH_AND_SAFETY:
        setSocietalInputs((prev) => ({ ...prev, healthAndSafety: input }));
        break;
      case SocietalInputEnum.CULTURAL_IMPACT:
        setSocietalInputs((prev) => ({ ...prev, culturalImpact: input }));
        break;
      case SocietalInputEnum.PUBLIC_PERCEPTION:
        setSocietalInputs((prev) => ({ ...prev, publicPerception: input }));
        break;
      case SocietalInputEnum.EDUCATIONAL_IMPACT:
        setSocietalInputs((prev) => ({ ...prev, educationalImpact: input }));
        break;
      case SocietalInputEnum.QUALITY_OF_LIFE:
        setSocietalInputs((prev) => ({ ...prev, qualityOfLife: input }));
        break;
      case SocietalInputEnum.CUSTOMER_SATISFACTION:
        setSocietalInputs((prev) => ({ ...prev, customerSatisfaction: input }));
        break;
      case SocietalInputEnum.EMPLOYEE_SATISFACTION:
        setSocietalInputs((prev) => ({ ...prev, employeeSatisfaction: input }));
        break;
    }
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      societalInputs,
      setSocietalInput,
    }),
    [societalInputs] // Only re-compute the memoized value when financialInputRanges changes
  );

  return (
    <SocietalModelProviderContext.Provider value={contextValue}>
      {children}
    </SocietalModelProviderContext.Provider>
  );
}

export const useSocietalModel = () => {
  const context = useContext(SocietalModelProviderContext);
  if (!context) {
    throw new Error(
      "useSocietalModel must be used within a SocietalModelProviderContext"
    );
  }
  return context;
};

export default SocietalModelProvider;
