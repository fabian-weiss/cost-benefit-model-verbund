"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { environmentalModel } from "@/models/environmental-model/environmental-model";
import { useComment } from "@/providers/comment-provider";
// import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { useResultDialog } from "@/providers/model-result-provider";
import { useEnvironmentalStore } from "@/stores/useEnvironmentalStore";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { InputGroupType } from "@/types/input-group-type";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";
function EnvironmentalSection() {
  // const environmetalModelContext = useEnvironmentalModel();
  const environmetalModelStore = useEnvironmentalStore();
  const resultsDialogContext = useResultDialog();
  const commentDialogContext = useComment();
  // const [societalInputs, setSocietalInputs] = useState<SocietalInputs>(societalModelContext.societalInputs);

  const inputGroups: InputGroupType[] = [
    {
      id: "unSustainableGoals",
      inputHeader: {
        label: EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS,
        description: "Impact on aligning with the 17 UN Sustainable Goals.",
      },
      detailedDescription: {
        header:
          "Measures how the initiative contributes to or detracts from achieving the United Nations Sustainable Development Goals (SDGs). Examples include climate action (e.g., reducing emissions), clean water and sanitation (e.g., protecting water sources), affordable and clean energy (e.g., promoting renewables), and responsible consumption and production (e.g., minimizing resource use).",
        descriptionRows: [
          "Very Negative: Actively harms two or more SDGs (e.g., significant carbon emissions and habitat destruction).",
          "Negative: Negatively impacts one SDG (e.g., minor increases in resource use or pollution).",
          "Neutral: No measurable impact on any SDGs.",
          "Positive: Supports one SDG (e.g., using renewable energy or reducing emissions).",
          "Very Positive: Actively contributes to two or more SDGs (e.g., promoting sustainability while fostering clean energy solutions).",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          environmetalModelStore.environmentalInputs.unSustainableGoals.comment,
          (comment) => {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "unSustainableGoals",
          onSelect(entry: DropdownEntryType) {
            console.log(
              `impact: ${entry.impact} so we set it to ${impactToNumber(
                entry.impact
              )}`
            );
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelStore.environmentalInputs.unSustainableGoals
                .value
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
      detailedDescription: {
        header:
          "Evaluates how the initiative affects waste generation and its management. Examples include waste reduction (e.g., minimizing production waste), recycling (e.g., improving material reuse), hazardous waste (e.g., better handling of toxic materials), and circular economy practices (e.g., reusing products or components).",
        descriptionRows: [
          "Very Negative: Significant increase in waste production, including hazardous materials, with no proper disposal plans.",
          "Negative: Noticeable increase in waste or reduction in recycling rates.",
          "Neutral: No measurable change in waste production or management.",
          "Positive: Improved waste management practices or reduced waste generation.",
          "Very Positive: Significant waste reduction, increased recycling rates, or adoption of circular economy practices.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          environmetalModelStore.environmentalInputs.wasteProduction.comment,
          (comment) => {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.WASTE_PRODUCTION,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "wasteProduction",
          onSelect(entry: DropdownEntryType) {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.WASTE_PRODUCTION,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelStore.environmentalInputs.wasteProduction.value
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
      detailedDescription: {
        header:
          "Assesses how the initiative impacts ecosystems and wildlife. Examples include habitat protection (e.g., conserving forests), species preservation (e.g., avoiding harm to endangered species), land use (e.g., minimizing deforestation), and restoration projects (e.g., replanting native vegetation).",
        descriptionRows: [
          "Very Negative: Severe harm to ecosystems, such as deforestation or destruction of critical habitats.",
          "Negative: Noticeable disruption to local biodiversity (e.g., minor habitat loss or species disturbance).",
          "Neutral: No significant impact on ecosystems or biodiversity.",
          "Positive: Initiatives that protect habitats or support biodiversity (e.g., wildlife corridors).",
          "Very Positive: Large-scale contributions to biodiversity, such as rewilding efforts or habitat restoration projects.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          environmetalModelStore.environmentalInputs.biodiversity.comment,
          (comment) => {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.BIODIVERSITY,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "biodiversity",
          onSelect(entry: DropdownEntryType) {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.BIODIVERSITY,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelStore.environmentalInputs.biodiversity.value
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
      detailedDescription: {
        header:
          "Evaluates how the initiative influences pollution levels across air, water, and soil. Examples include air quality (e.g., reducing emissions), water contamination (e.g., minimizing chemical discharge), soil health (e.g., avoiding toxic runoff), and noise pollution (e.g., quieter infrastructure).",
        descriptionRows: [
          "Very Negative: Significant increase in pollution levels with widespread harm to the environment.",
          "Negative: Noticeable rise in pollution, such as minor increases in emissions or contaminants.",
          "Neutral: No measurable change in pollution levels.",
          "Positive: Reduced pollution in any area (e.g., cleaner emissions or less wastewater).",
          "Very Positive: Major reductions in multiple pollution types or innovative pollution control measures.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          environmetalModelStore.environmentalInputs.pollution.comment,
          (comment) => {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.POLLUTION,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "pollution",
          onSelect(entry: DropdownEntryType) {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.POLLUTION,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelStore.environmentalInputs.pollution.value
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
      detailedDescription: {
        header:
          "Measures how the initiative promotes the use of sustainable energy sources. Examples include renewable energy adoption (e.g., solar, wind), grid integration (e.g., storage solutions for renewables), decarbonization (e.g., reducing reliance on fossil fuels), and innovative solutions (e.g., smart grids or hydrogen energy).",
        descriptionRows: [
          "Very Negative: Increased reliance on non-renewable energy sources or barriers to renewable integration.",
          "Negative: Noticeable delays or setbacks in adopting sustainable energy.",
          "Neutral: No impact on sustainable energy use or integration.",
          "Positive: Facilitates the use or adoption of renewable energy sources.",
          "Very Positive: Significant integration of sustainable energy systems or pioneering new renewable technologies.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          environmetalModelStore.environmentalInputs.sustainableEneryIntegration
            .comment,
          (comment) => {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "sustainableEnergyIntegration",
          onSelect(entry: DropdownEntryType) {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelStore.environmentalInputs
                .sustainableEneryIntegration.value
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
      detailedDescription: {
        header:
          "Assesses how the initiative improves energy use efficiency and reduces waste. Examples include energy-saving technologies (e.g., efficient appliances), process optimization (e.g., reducing energy losses), demand management (e.g., peak load reduction), and upgrading infrastructure (e.g., modernizing power plants).",
        descriptionRows: [
          "Very Negative: Significant inefficiencies or increased energy wastage.",
          "Negative: Noticeable decline in efficiency or unnecessary energy consumption.",
          "Neutral: No measurable change in energy efficiency.",
          "Positive: Improved efficiency in operations or infrastructure.",
          "Very Positive: Breakthrough improvements in energy efficiency, leading to significant cost and resource savings.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          environmetalModelStore.environmentalInputs.energyEfficiency.comment,
          (comment) => {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.ENERGY_EFFICIENCY,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "energyEfficiency",
          onSelect(entry: DropdownEntryType) {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.ENERGY_EFFICIENCY,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelStore.environmentalInputs.energyEfficiency.value
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
      detailedDescription: {
        header:
          "Evaluates the initiative’s compliance with environmental laws and standards. Examples include air quality regulations (e.g., adhering to emission caps), waste disposal laws (e.g., proper handling of hazardous materials), carbon neutrality goals (e.g., meeting emission reduction targets), and local environmental mandates (e.g., respecting protected zones).",
        descriptionRows: [
          "Very Negative: Severe violations of environmental regulations leading to fines or legal action.",
          "Negative: Minor non-compliance issues requiring corrective action.",
          "Neutral: Full compliance with existing regulations without exceeding expectations.",
          "Positive: Exceeding compliance standards or achieving certifications (e.g., ISO 14001).",
          "Very Positive: Setting industry benchmarks for environmental compliance or achieving carbon-neutral certifications.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          environmetalModelStore.environmentalInputs
            .meetingEnvironmentalRegulations.comment,
          (comment) => {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "meetingEnvironmentalRegulations",
          onSelect(entry: DropdownEntryType) {
            environmetalModelStore.setEnvironmentalInput(
              EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              environmetalModelStore.environmentalInputs
                .meetingEnvironmentalRegulations.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
  ];

  const handleModelResult = (): EnvironmentalResults => {
    const result: EnvironmentalResults = environmentalModel(
      environmetalModelStore.environmentalInputs
    );
    environmetalModelStore.setModelResults(result);
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
