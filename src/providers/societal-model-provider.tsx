"use client";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";

import { SocietalInputs } from "@/types/societal/societal-inputs";
import { SocietalResults } from "@/types/societal/societal-results";
import { createContext, useContext, useMemo, useState } from "react";

interface SocietalModelProviderContextType {
  societalInputs: SocietalInputs;
  setSocietalInput: (inputType: SocietalInputEnum, input: number) => void;
  modelResults?: SocietalResults;
  setModelResults: (results?: SocietalResults) => void;
}

const SocietalModelProviderContext = createContext<
  SocietalModelProviderContextType | undefined
>(undefined);

function SocietalModelProvider({ children }: { children: React.ReactNode }) {
  const [modelResults, setModelResults] = useState<
    SocietalResults | undefined
  >();
  const [societalInputs, setSocietalInputs] = useState<SocietalInputs>({
    valueChain: 0,
    shareholderValue: 0,
    visionAlignment: 0,
    culturalImpact: 0,
    publicPerception: 0,
    customerSatisfaction: 0,
    employeeSatisfaction: 0,
  });

  const setSocietalInput = (inputType: SocietalInputEnum, input: number) => {
    switch (inputType) {
      case SocietalInputEnum.CUSTOMER_SATISFACTION:
        setSocietalInputs((prev) => ({ ...prev, customerSatisfaction: input }));
        break;
      case SocietalInputEnum.EMPLOYEE_SATISFACTION:
        setSocietalInputs((prev) => ({ ...prev, employeeSatisfaction: input }));
        break;
      case SocietalInputEnum.CULTURAL_IMPACT:
        setSocietalInputs((prev) => ({ ...prev, culturalImpact: input }));
        break;
      case SocietalInputEnum.VALUE_CHAIN:
        setSocietalInputs((prev) => ({ ...prev, valueChain: input }));
        break;
      case SocietalInputEnum.SHAREHOLDER_VALUE:
        setSocietalInputs((prev) => ({ ...prev, shareholderValue: input }));
        break;
      case SocietalInputEnum.VISION_ALIGNMENT:
        setSocietalInputs((prev) => ({ ...prev, visionAlignment: input }));
        break;
      case SocietalInputEnum.PUBLIC_PERCEPTION:
        setSocietalInputs((prev) => ({ ...prev, publicPerception: input }));
        break;
    }
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      societalInputs,
      setSocietalInput,
      modelResults,
      setModelResults,
    }),
    [societalInputs, modelResults] // Only re-compute the memoized value when financialInputRanges changes
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
