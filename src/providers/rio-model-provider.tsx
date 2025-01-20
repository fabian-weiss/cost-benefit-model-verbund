"use client";
import { Impact } from "@/enums/Impact";
import { RioInputEnum } from "@/enums/RioInputEnum";
import { RioInputs } from "@/types/rio/rio-inputs";
import { RioResults } from "@/types/rio/rio-results";
import { createContext, useContext, useMemo, useState } from "react";

interface RioModelProviderContextType {
  rioInputs: RioInputs;
  setDefaultValues: (inputs: RioInputs) => void;
  setRioInput: (
    inputType: RioInputEnum,
    input?: number,
    impact?: Impact,
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
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    marketAdvantage: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    longTermResilience: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    longTermScalability: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    legalRequirements: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    innovation: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    otherRisks: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
  });

  const setRioInput = (
    inputType: RioInputEnum,
    input?: number,
    impact?: Impact,
    comment?: string
  ) => {
    switch (inputType) {
      case RioInputEnum.PRIVACY:
        setRioInputs((prev) => ({
          ...prev,
          privacy: {
            value: input != undefined ? input : prev.privacy.value,
            comment: comment != undefined ? comment : prev.privacy.comment,
            impact: impact ? impact : prev.privacy.impact,
          },
        }));
        break;
      case RioInputEnum.MARKET_ADVANTAGE:
        setRioInputs((prev) => ({
          ...prev,
          marketAdvantage: {
            value: input != undefined ? input : prev.marketAdvantage.value,
            comment:
              comment != undefined ? comment : prev.marketAdvantage.comment,
            impact: impact ? impact : prev.marketAdvantage.impact,
          },
        }));
        break;
      case RioInputEnum.LONG_TERM_RESILIENCE:
        setRioInputs((prev) => ({
          ...prev,
          longTermResilience: {
            value: input != undefined ? input : prev.longTermResilience.value,
            comment:
              comment != undefined ? comment : prev.longTermResilience.comment,
            impact: impact ? impact : prev.longTermResilience.impact,
          },
        }));
        break;
      case RioInputEnum.LONG_TERM_SUSTAINABILITY:
        setRioInputs((prev) => ({
          ...prev,
          longTermScalability: {
            value: input != undefined ? input : prev.longTermScalability.value,
            comment:
              comment != undefined ? comment : prev.longTermScalability.comment,
            impact: impact ? impact : prev.longTermScalability.impact,
          },
        }));
        break;
      case RioInputEnum.LEGAL_REQUIREMENTS:
        setRioInputs((prev) => ({
          ...prev,
          legalRequirements: {
            value: input != undefined ? input : prev.legalRequirements.value,
            comment:
              comment != undefined ? comment : prev.legalRequirements.comment,
            impact: impact ? impact : prev.legalRequirements.impact,
          },
        }));
        break;
      case RioInputEnum.INNOVATION:
        setRioInputs((prev) => ({
          ...prev,
          innovation: {
            value: input != undefined ? input : prev.innovation.value,
            comment: comment != undefined ? comment : prev.innovation.comment,
            impact: impact ? impact : prev.innovation.impact,
          },
        }));
        break;
      case RioInputEnum.OTHER_RISKS:
        setRioInputs((prev) => ({
          ...prev,
          otherRisks: {
            value: input != undefined ? input : prev.otherRisks.value,
            comment: comment != undefined ? comment : prev.otherRisks.comment,
            impact: impact ? impact : prev.otherRisks.impact,
          },
        }));
        break;
    }
  };

  const setDefaultValues = (inputs: RioInputs) => {
    setRioInputs(inputs);
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      rioInputs,
      setDefaultValues,
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
