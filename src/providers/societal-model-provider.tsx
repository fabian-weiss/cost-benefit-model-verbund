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
    customerSatisfaction: 0,
    customerAffordability: 0,
    companyCulture: 0,
    communityImplications: 0,
    valueChain: 0,
    shareholderValue: 0,
    guidingPrinciplesAlignment: 0,
    publicPerception: 0,
    workplaceCreation: 0,
  });

  const setSocietalInput = (inputType: SocietalInputEnum, input: number) => {
    switch (inputType) {
      case SocietalInputEnum.CUSTOMER_SATISFACTION:
        setSocietalInputs((prev) => ({ ...prev, customerSatisfaction: input }));
        break;
      case SocietalInputEnum.CUSTOMER_AFFORDABILITY:
        setSocietalInputs((prev) => ({
          ...prev,
          customerAffordability: input,
        }));
        break;
      case SocietalInputEnum.COMPANY_CULTURE:
        setSocietalInputs((prev) => ({ ...prev, companyCulture: input }));
        break;
      case SocietalInputEnum.COMMUNITY_IMPLICATIONS:
        setSocietalInputs((prev) => ({
          ...prev,
          communityImplications: input,
        }));
        break;
      case SocietalInputEnum.VALUE_CHAIN:
        setSocietalInputs((prev) => ({ ...prev, valueChain: input }));
        break;
      case SocietalInputEnum.SHAREHOLDER_VALUE:
        setSocietalInputs((prev) => ({ ...prev, shareholderValue: input }));
        break;
      case SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT:
        setSocietalInputs((prev) => ({
          ...prev,
          guidingPrinciplesAlignment: input,
        }));
        break;
      case SocietalInputEnum.PUBLIC_PERCEPTION:
        setSocietalInputs((prev) => ({ ...prev, publicPerception: input }));
        break;
      case SocietalInputEnum.WORKPLACE_CREATION:
        setSocietalInputs((prev) => ({ ...prev, workplaceCreation: input }));
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
