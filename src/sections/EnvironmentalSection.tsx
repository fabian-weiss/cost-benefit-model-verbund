"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { environmentalModel } from "@/models/environmental-model/environmental-model";
import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { useResultDialog } from "@/providers/model-result-provider";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { InputGroupType } from "@/types/input-group-type";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";
function EnvironmentalSection() {
  const environmetalModelContext = useEnvironmentalModel();
  const resultsDialogContext = useResultDialog();
  // const [societalInputs, setSocietalInputs] = useState<SocietalInputs>(societalModelContext.societalInputs);

  const inputGroups: InputGroupType[] = [
    {
      id: "unSustainableGoals",
      inputHeader: {
        label: EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS,
        description: "Impact on aligning with the 17 UN Sustainable Goals.",
      },
      dropdownFields: [
        {
          id: "unSustainableGoals",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.unSustainableGoals
            ),
          },
          entries: impactEntries,
        },
      ],
    },

    {
      id: "wasteProduction",
      inputHeader: {
        label: EnvironmentalInputEnum.WASTE_PRODUCTION,
        description:
          "Impact on waste production (e.g. old equipment, chemical cleaning agents).",
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
        label: EnvironmentalInputEnum.BIODIVERSITY,
        description: "Impact on bio diversity (Flora & Fauna).",
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
      id: "pollution",
      inputHeader: {
        label: EnvironmentalInputEnum.POLLUTION,
        description: "Impact on pollution (e.g. water, air, noise).",
      },
      dropdownFields: [
        {
          id: "pollution",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.POLLUTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs.pollution
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "sustainableEnergyIntegration",
      inputHeader: {
        label: EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION,
        description:
          "Impact on sustainable energy integration (e.g. net zero greenhouse gas emissions).",
      },
      dropdownFields: [
        {
          id: "sustainableEnergyIntegration",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs
                .sustainableEneryIntegration
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "energyEfficiency",
      inputHeader: {
        label: EnvironmentalInputEnum.ENERGY_EFFICIENCY,
        description:
          "Impact on energy efficiency (e.g. production, distribution, storage).",
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
      id: "meetingEnvironmentalRegulations",
      inputHeader: {
        label: EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS,
        description: "Impact on meeting environmental regulations.",
      },
      dropdownFields: [
        {
          id: "meetingEnvironmentalRegulations",
          onSelect(entry: DropdownEntryType) {
            environmetalModelContext.setEnvironmentalInput(
              EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelContext.environmentalInputs
                .meetingEnvironmentalRegulations
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
