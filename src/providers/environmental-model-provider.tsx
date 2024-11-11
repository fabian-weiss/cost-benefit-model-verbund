"use client";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";
import { EnvironmentalInputs } from "@/types/environmental/environmental-inputs";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { createContext, useContext, useMemo, useState } from "react";

interface EnvironmentalModelProviderContextType {
  environmentalInputs: EnvironmentalInputs;
  setEnvironmentalInput: (
    inputType: EnvironmentalInputEnum,
    input: number
  ) => void;
  modelResults?: EnvironmentalResults;
  setModelResults: (results?: EnvironmentalResults) => void;
}

const EnvironmentalModelProviderContext = createContext<
  EnvironmentalModelProviderContextType | undefined
>(undefined);

function EnvironmentalModelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modelResults, setModelResults] = useState<
    EnvironmentalResults | undefined
  >();
  const [environmentalInputs, setEnvironmentalInputs] =
    useState<EnvironmentalInputs>({
      unSustainableGoals: 0,
      wasteProduction: 0,
      biodiversity: 0,
      pollution: 0,
      sustainableEneryIntegration: 0,
      energyEfficiency: 0,
      meetingEnvironmentalRegulations: 0,
    });

  const setEnvironmentalInput = (
    inputType: EnvironmentalInputEnum,
    input: number
  ) => {
    switch (inputType) {
      case EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          unSustainableGoals: input,
        }));
        break;
      case EnvironmentalInputEnum.WASTE_PRODUCTION:
        setEnvironmentalInputs((prev) => ({ ...prev, wasteProduction: input }));
        break;
      case EnvironmentalInputEnum.BIODIVERSITY:
        setEnvironmentalInputs((prev) => ({ ...prev, biodiversity: input }));
        break;
      case EnvironmentalInputEnum.POLLUTION:
        setEnvironmentalInputs((prev) => ({ ...prev, pollution: input }));
        break;
      case EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          sustainableEneryIntegration: input,
        }));
        break;
      case EnvironmentalInputEnum.ENERGY_EFFICIENCY:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          energyEfficiency: input,
        }));
        break;
      case EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          meetingEnvironmentalRegulations: input,
        }));
        break;
    }
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      environmentalInputs,
      setEnvironmentalInput,
      modelResults,
      setModelResults,
    }),
    [environmentalInputs, modelResults] // Only re-compute the memoized value when financialInputRanges changes
  );

  return (
    <EnvironmentalModelProviderContext.Provider value={contextValue}>
      {children}
    </EnvironmentalModelProviderContext.Provider>
  );
}

export const useEnvironmentalModel = () => {
  const context = useContext(EnvironmentalModelProviderContext);
  if (!context) {
    throw new Error(
      "useEnvironmentalModel must be used within a EnvironmentalModelProviderContext"
    );
  }
  return context;
};

export default EnvironmentalModelProvider;
