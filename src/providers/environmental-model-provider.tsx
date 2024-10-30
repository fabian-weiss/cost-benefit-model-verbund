"use client";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";
import { EnvironmentalInputs } from "@/types/environmental/environmental-inputs";
import { createContext, useContext, useMemo, useState } from "react";

interface EnvironmentalModelProviderContextType {
  environmentalInputs: EnvironmentalInputs;
  setEnvironmentalInput: (
    inputType: EnvironmentalInputEnum,
    input: number
  ) => void;
}

const EnvironmentalModelProviderContext = createContext<
  EnvironmentalModelProviderContextType | undefined
>(undefined);

function EnvironmentalModelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [environmentalInputs, setEnvironmentalInputs] =
    useState<EnvironmentalInputs>({
      carbonFootprint: 0,
      resourceConsumption: 0,
      wasteProduction: 0,
      biodiversity: 0,
      airPollution: 0,
      waterPollution: 0,
      landPollution: 0,
      noisePollution: 0,
      adoptionOfRenewableEnergy: 0,
      energyEfficiency: 0,
      recyclingRate: 0,
      greenCertifications: 0,
    });

  const setEnvironmentalInput = (
    inputType: EnvironmentalInputEnum,
    input: number
  ) => {
    switch (inputType) {
      case EnvironmentalInputEnum.CARBON_FOOTPRINT:
        setEnvironmentalInputs((prev) => ({ ...prev, carbonFootprint: input }));
        break;
      case EnvironmentalInputEnum.RESOURCE_CONSUMPTION:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          resourceConsumption: input,
        }));
        break;
      case EnvironmentalInputEnum.WASTE_PRODUCTION:
        setEnvironmentalInputs((prev) => ({ ...prev, wasteProduction: input }));
        break;
      case EnvironmentalInputEnum.BIODIVERSITY:
        setEnvironmentalInputs((prev) => ({ ...prev, biodiversity: input }));
        break;
      case EnvironmentalInputEnum.AIR_POLLUTION:
        setEnvironmentalInputs((prev) => ({ ...prev, airPollution: input }));
        break;
      case EnvironmentalInputEnum.WATER_POLLUTION:
        setEnvironmentalInputs((prev) => ({ ...prev, waterPollution: input }));
        break;
      case EnvironmentalInputEnum.LAND_POLLUTION:
        setEnvironmentalInputs((prev) => ({ ...prev, landPollution: input }));
        break;
      case EnvironmentalInputEnum.NOISE_POLLUTION:
        setEnvironmentalInputs((prev) => ({ ...prev, noisePollution: input }));
        break;
      case EnvironmentalInputEnum.ADOPTION_OF_RENEWABLE_ENERGY:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          adoptionOfRenewableEnergy: input,
        }));
        break;
      case EnvironmentalInputEnum.ENERGY_EFFICIENCY:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          energyEfficiency: input,
        }));
        break;
      case EnvironmentalInputEnum.RECYCLING_RATE:
        setEnvironmentalInputs((prev) => ({ ...prev, recyclingRate: input }));
        break;
      case EnvironmentalInputEnum.GREEN_CERTIFICATIONS:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          greenCertifications: input,
        }));
        break;
    }
  };

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      environmentalInputs,
      setEnvironmentalInput,
    }),
    [environmentalInputs] // Only re-compute the memoized value when financialInputRanges changes
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
