"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";
import { Impact } from "@/enums/Impact";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { environmentalModel } from "@/models/environmental-model/environmental-model";
import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { useResultDialog } from "@/providers/model-result-provider";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { InputGroupType } from "@/types/input-group-type";
import { SocietalInputs } from "@/types/societal/societal-inputs";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";
import { useState } from "react";

function EnvironmentalSection() {
  const environmetalModelContext = useEnvironmentalModel();
  const resultsDialogContext = useResultDialog();
  // const [societalInputs, setSocietalInputs] = useState<SocietalInputs>(societalModelContext.societalInputs);

  const inputGroups: InputGroupType[] = [
    {
      id: "carbonFootprint",
      inputHeader: {
        label: "Carbon Footprint",
        description: "Impact on carbon footprint.",
      },
      dropdownFields: [
        {
          id: "carbonFootprint",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.CARBON_FOOTPRINT,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.carbonFootprint
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "resourceConsumption",
      inputHeader: {
        label: "Resource Consumption",
        description: "Impact on resource consumption.",
      },
      dropdownFields: [
        {
          id: "resourceConsumption",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.RESOURCE_CONSUMPTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.resourceConsumption
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "wasteProduction",
      inputHeader: {
        label: "Waste Production",
        description: "Impact on waste production.",
      },
      dropdownFields: [
        {
          id: "wasteProduction",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.WASTE_PRODUCTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.wasteProduction
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "biodiversity",
      inputHeader: {
        label: "Bio Diversity",
        description: "Impact on bio diversity.",
      },
      dropdownFields: [
        {
          id: "biodiversity",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.BIODIVERSITY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.biodiversity
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "airPollution",
      inputHeader: {
        label: "Air Pollution",
        description: "Impact on air pollution.",
      },
      dropdownFields: [
        {
          id: "airPollution",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.AIR_POLLUTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.airPollution
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "waterPollution",
      inputHeader: {
        label: "Water Pollution",
        description: "Impact on water pollution.",
      },
      dropdownFields: [
        {
          id: "waterPollution",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.WATER_POLLUTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.waterPollution
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "landPollution",
      inputHeader: {
        label: "Land Pollution",
        description: "Impact on land pollution.",
      },
      dropdownFields: [
        {
          id: "landPollution",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.LAND_POLLUTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.landPollution
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "noisePollution",
      inputHeader: {
        label: "Noise Pollution",
        description: "Impact on noise pollution.",
      },
      dropdownFields: [
        {
          id: "noisePollution",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.NOISE_POLLUTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.noisePollution
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "adoptionOfRenewableEnergy",
      inputHeader: {
        label: "Adoption of Renewable Energy",
        description: "Impact on adoption of renewable energy.",
      },
      dropdownFields: [
        {
          id: "adoptionOfRenewableEnergy",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.ADOPTION_OF_RENEWABLE_ENERGY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs
                .adoptionOfRenewableEnergy
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "energyEfficiency",
      inputHeader: {
        label: "Energy Efficiency",
        description: "Impact on energy efficiency.",
      },
      dropdownFields: [
        {
          id: "energyEfficiency",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.ENERGY_EFFICIENCY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.energyEfficiency
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "recyclingRate",
      inputHeader: {
        label: "Recycling Rate",
        description: "Impact on recycling rate.",
      },
      dropdownFields: [
        {
          id: "recyclingRate",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.RECYCLING_RATE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.recyclingRate
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "greenCertificiations",
      inputHeader: {
        label: "Green Certifications",
        description: "Impact on green certifications.",
      },
      dropdownFields: [
        {
          id: "greenCertificiations",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.GREEN_CERTIFICATIONS,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.greenCertifications
            ),
          },
          entries: impactEntries,
        },
      ],
    },
  ];

  const handleModelResult = (): EnvironmentalResults => {
    const result: EnvironmentalResults = environmentalModel(
      environmetalModelContext.environmentalInputs
    );
    environmetalModelContext.setModelResults(result);
    resultsDialogContext.handleShowDialog(true, DialogType.ENVIRONMENTAL_MODEL);
    return result;
  };
  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="Environmental"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelResult()}
      />
      <InputGrid inputGroups={inputGroups} id={"environmental-model"} />
      {/* {modelResults && <p>{JSON.stringify(modelResults)}</p>} */}
    </SectionContainer>
  );
}

export default EnvironmentalSection;
