"use client";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";

import { SocietalInputs } from "@/types/societal/societal-inputs";
import { SocietalResults } from "@/types/societal/societal-results";
import { createContext, useContext, useMemo, useState } from "react";

interface SocietalModelProviderContextType {
  societalInputs: SocietalInputs;
  setSocietalInput: (
    inputType: SocietalInputEnum,
    input?: number,
    comment?: string
  ) => void;
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
    customerSatisfaction: {
      value: 0,
      comment: undefined,
    },
    customerAffordability: {
      value: 0,
      comment: undefined,
    },
    companyCulture: {
      value: 0,
      comment: undefined,
    },
    communityImplications: {
      value: 0,
      comment: undefined,
    },
    valueChain: {
      value: 0,
      comment: undefined,
    },
    shareholderValue: {
      value: 0,
      comment: undefined,
    },
    guidingPrinciplesAlignment: {
      value: 0,
      comment: undefined,
    },
    publicPerception: {
      value: 0,
      comment: undefined,
    },
    workplaceCreation: {
      value: 0,
      comment: undefined,
    },
  });

  const setSocietalInput = (
    inputType: SocietalInputEnum,
    input?: number,
    comment?: string
  ) => {
    switch (inputType) {
      case SocietalInputEnum.CUSTOMER_SATISFACTION:
        setSocietalInputs((prev) => ({
          ...prev,
          customerSatisfaction: {
            value: input ? input : prev.customerSatisfaction.value,
            comment:
              comment != undefined
                ? comment
                : prev.customerSatisfaction?.comment,
          },
        }));
        break;
      case SocietalInputEnum.CUSTOMER_AFFORDABILITY:
        setSocietalInputs((prev) => ({
          ...prev,
          customerAffordability: {
            value: input ? input : prev.customerAffordability.value,
            comment:
              comment != undefined
                ? comment
                : prev.customerAffordability?.comment,
          },
        }));
        break;
      case SocietalInputEnum.COMPANY_CULTURE:
        setSocietalInputs((prev) => ({
          ...prev,
          companyCulture: {
            value: input ? input : prev.companyCulture.value,
            comment:
              comment != undefined ? comment : prev.companyCulture?.comment,
          },
        }));
        break;
      case SocietalInputEnum.COMMUNITY_IMPLICATIONS:
        setSocietalInputs((prev) => ({
          ...prev,
          communityImplications: {
            value: input ? input : prev.communityImplications.value,
            comment:
              comment != undefined
                ? comment
                : prev.communityImplications?.comment,
          },
        }));
        break;
      case SocietalInputEnum.VALUE_CHAIN:
        setSocietalInputs((prev) => ({
          ...prev,
          valueChain: {
            value: input ? input : prev.valueChain.value,
            comment: comment != undefined ? comment : prev.valueChain?.comment,
          },
        }));
        break;
      case SocietalInputEnum.SHAREHOLDER_VALUE:
        setSocietalInputs((prev) => ({
          ...prev,
          shareholderValue: {
            value: input ? input : prev.shareholderValue.value,
            comment:
              comment != undefined ? comment : prev.shareholderValue?.comment,
          },
        }));
        break;
      case SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT:
        setSocietalInputs((prev) => ({
          ...prev,
          guidingPrinciplesAlignment: {
            value: input ? input : prev.guidingPrinciplesAlignment.value,
            comment:
              comment != undefined
                ? comment
                : prev.guidingPrinciplesAlignment?.comment,
          },
        }));
        break;
      case SocietalInputEnum.PUBLIC_PERCEPTION:
        setSocietalInputs((prev) => ({
          ...prev,
          publicPerception: {
            value: input ? input : prev.publicPerception.value,
            comment:
              comment != undefined ? comment : prev.publicPerception?.comment,
          },
        }));
        break;
      case SocietalInputEnum.WORKPLACE_CREATION:
        setSocietalInputs((prev) => ({
          ...prev,
          workplaceCreation: {
            value: input ? input : prev.workplaceCreation.value,
            comment:
              comment != undefined ? comment : prev.workplaceCreation?.comment,
          },
        }));
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
