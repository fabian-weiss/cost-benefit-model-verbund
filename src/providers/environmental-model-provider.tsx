"use client";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";
import { Impact } from "@/enums/Impact";
import { EnvironmentalInputs } from "@/types/environmental/environmental-inputs";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { createContext, useContext, useMemo, useState } from "react";

interface EnvironmentalModelProviderContextType {
  environmentalInputs: EnvironmentalInputs;
  setEnvironmentalInput: (
    inputType: EnvironmentalInputEnum,
    input?: number,
    impact?: Impact,
    comment?: string
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
      unSustainableGoals: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: undefined,
      },
      wasteProduction: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: undefined,
      },
      biodiversity: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: undefined,
      },
      pollution: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: undefined,
      },
      sustainableEneryIntegration: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: undefined,
      },
      energyEfficiency: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: undefined,
      },
      meetingEnvironmentalRegulations: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: undefined,
      },
    });

  const setEnvironmentalInput = (
    inputType: EnvironmentalInputEnum,
    input?: number,
    impact?: Impact,
    comment?: string
  ) => {
    switch (inputType) {
      case EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          unSustainableGoals: {
            value: input != undefined ? input : prev.unSustainableGoals.value,
            comment:
              comment != undefined ? comment : prev.unSustainableGoals?.comment,
            impact: impact ? impact : prev.unSustainableGoals.impact,
          },
        }));
        break;
      case EnvironmentalInputEnum.WASTE_PRODUCTION:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          wasteProduction: {
            value: input != undefined ? input : prev.wasteProduction.value,
            comment:
              comment != undefined ? comment : prev.wasteProduction?.comment,
            impact: impact ? impact : prev.wasteProduction.impact,
          },
        }));
        break;
      case EnvironmentalInputEnum.BIODIVERSITY:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          biodiversity: {
            value: input != undefined ? input : prev.biodiversity.value,
            comment:
              comment != undefined ? comment : prev.biodiversity?.comment,
            impact: impact ? impact : prev.biodiversity.impact,
          },
        }));
        break;
      case EnvironmentalInputEnum.POLLUTION:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          pollution: {
            value: input != undefined ? input : prev.pollution.value,
            comment: comment != undefined ? comment : prev.pollution?.comment,
            impact: impact ? impact : prev.pollution.impact,
          },
        }));
        break;
      case EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          sustainableEneryIntegration: {
            value:
              input != undefined
                ? input
                : prev.sustainableEneryIntegration.value,
            comment:
              comment != undefined
                ? comment
                : prev.sustainableEneryIntegration?.comment,
            impact: impact ? impact : prev.sustainableEneryIntegration.impact,
          },
        }));
        break;
      case EnvironmentalInputEnum.ENERGY_EFFICIENCY:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          energyEfficiency: {
            value: input != undefined ? input : prev.energyEfficiency.value,
            comment:
              comment != undefined ? comment : prev.energyEfficiency?.comment,
            impact: impact ? impact : prev.energyEfficiency.impact,
          },
        }));
        break;
      case EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS:
        setEnvironmentalInputs((prev) => ({
          ...prev,
          meetingEnvironmentalRegulations: {
            value:
              input != undefined
                ? input
                : prev.meetingEnvironmentalRegulations.value,
            comment:
              comment != undefined
                ? comment
                : prev.meetingEnvironmentalRegulations?.comment,
            impact: impact
              ? impact
              : prev.meetingEnvironmentalRegulations.impact,
          },
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
