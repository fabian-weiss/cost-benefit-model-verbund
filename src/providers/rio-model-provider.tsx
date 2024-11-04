"use client";
import { RioInputEnum } from "@/enums/RioInputEnum";
import { RioInputs } from "@/types/rio/rio-inputs";
import { RioResults } from "@/types/rio/rio-results";
import { createContext, useContext, useMemo, useState } from "react";

interface RioModelProviderContextType {
  rioInputs: RioInputs;
  setRioInput: (inputType: RioInputEnum, input: number) => void;
  modelResults?: RioResults;
  setModelResults: (results?: RioResults) => void;
}

const RioModelProviderContext = createContext<
  RioModelProviderContextType | undefined
>(undefined);

function RioModelProvider({ children }: { children: React.ReactNode }) {
  const [modelResults, setModelResults] = useState<RioResults | undefined>();
  const [rioInputs, setRioInputs] = useState<RioInputs>({
    privacy: 0,
    marketAdvantage: 0,
    longTermResilience: 0,
    longTermScalability: 0,
    legalRequirements: 0,
  });

  const setRioInput = (inputType: RioInputEnum, input: number) => {
    switch (inputType) {
      case RioInputEnum.PRIVACY:
        setRioInputs((prev) => ({ ...prev, privacy: input }));
        break;
      case RioInputEnum.MARKET_ADVANTAGE:
        setRioInputs((prev) => ({ ...prev, marketAdvantage: input }));
        break;
      case RioInputEnum.LONG_TERM_RESILIENCE:
        setRioInputs((prev) => ({ ...prev, longTermResilience: input }));
        break;
      case RioInputEnum.LONG_TERM_SUSTAINABILITY:
        setRioInputs((prev) => ({ ...prev, longTermScalability: input }));
        break;
      case RioInputEnum.LEGAL_REQUIREMENTS:
        setRioInputs((prev) => ({ ...prev, legalRequirements: input }));
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
