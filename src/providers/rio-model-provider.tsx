"use client";
import { RioInputEnum } from "@/enums/RioInputEnum";
import { RioInputs } from "@/types/rio/rio-inputs";
import { RioResults } from "@/types/rio/rio-results";
import { createContext, useContext, useMemo, useState } from "react";

interface RioModelProviderContextType {
  rioInputs: RioInputs;
  setRioInput: (
    inputType: RioInputEnum,
    input?: number,
    comment?: string
  ) => void;
  modelResults?: RioResults;
  setModelResults: (results?: RioResults) => void;
}

const RioModelProviderContext = createContext<
  RioModelProviderContextType | undefined
>(undefined);

function RioModelProvider({ children }: { children: React.ReactNode }) {
  const [modelResults, setModelResults] = useState<RioResults | undefined>();
  const [rioInputs, setRioInputs] = useState<RioInputs>({
    privacy: {
      value: 0,
      comment: undefined,
    },
    marketAdvantage: {
      value: 0,
      comment: undefined,
    },
    longTermResilience: {
      value: 0,
      comment: undefined,
    },
    longTermScalability: {
      value: 0,
      comment: undefined,
    },
    legalRequirements: {
      value: 0,
      comment: undefined,
    },
    innovation: {
      value: 0,
      comment: undefined,
    },
    otherRisks: {
      value: 0,
      comment: undefined,
    },
  });

  const setRioInput = (
    inputType: RioInputEnum,
    input?: number,
    comment?: string
  ) => {
    switch (inputType) {
      case RioInputEnum.PRIVACY:
        setRioInputs((prev) => ({
          ...prev,
          privacy: {
            value: input ? input : prev.privacy.value,
            comment: comment != undefined ? comment : prev.privacy.comment,
          },
        }));
        break;
      case RioInputEnum.MARKET_ADVANTAGE:
        setRioInputs((prev) => ({
          ...prev,
          marketAdvantage: {
            value: input ? input : prev.marketAdvantage.value,
            comment:
              comment != undefined ? comment : prev.marketAdvantage.comment,
          },
        }));
        break;
      case RioInputEnum.LONG_TERM_RESILIENCE:
        setRioInputs((prev) => ({
          ...prev,
          longTermResilience: {
            value: input ? input : prev.longTermResilience.value,
            comment:
              comment != undefined ? comment : prev.longTermResilience.comment,
          },
        }));
        break;
      case RioInputEnum.LONG_TERM_SUSTAINABILITY:
        setRioInputs((prev) => ({
          ...prev,
          longTermScalability: {
            value: input ? input : prev.longTermScalability.value,
            comment:
              comment != undefined ? comment : prev.longTermScalability.comment,
          },
        }));
        break;
      case RioInputEnum.LEGAL_REQUIREMENTS:
        setRioInputs((prev) => ({
          ...prev,
          legalRequirements: {
            value: input ? input : prev.legalRequirements.value,
            comment:
              comment != undefined ? comment : prev.legalRequirements.comment,
          },
        }));
        break;
      case RioInputEnum.INNOVATION:
        setRioInputs((prev) => ({
          ...prev,
          innovation: {
            value: input ? input : prev.innovation.value,
            comment: comment != undefined ? comment : prev.innovation.comment,
          },
        }));
        break;
      case RioInputEnum.OTHER_RISKS:
        setRioInputs((prev) => ({
          ...prev,
          otherRisks: {
            value: input ? input : prev.otherRisks.value,
            comment: comment != undefined ? comment : prev.otherRisks.comment,
          },
        }));
        break;
    }
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      rioInputs,
      setRioInput,
      modelResults,
      setModelResults,
    }),
    [rioInputs, modelResults] // Only re-compute the memoized value when financialInputRanges changes
  );

  return (
    <RioModelProviderContext.Provider value={contextValue}>
      {children}
    </RioModelProviderContext.Provider>
  );
}

export const useRioModel = () => {
  const context = useContext(RioModelProviderContext);
  if (!context) {
    throw new Error(
      "useRioMOdel must be used within a RioModelProviderContext"
    );
  }
  return context;
};

export default RioModelProvider;
