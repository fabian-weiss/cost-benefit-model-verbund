"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { societalModel } from "@/models/societal-model/societal-model";
import { useResultDialog } from "@/providers/model-result-provider";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { InputGroupType } from "@/types/input-group-type";
import { SocietalResults } from "@/types/societal/societal-results";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";

function SocietalSection() {
  const societalModelContext = useSocietalModel();
  const resultsDialogContext = useResultDialog();

  const inputGroups: InputGroupType[] = [
    {
      id: "customerSatisfaction",
      inputHeader: {
        label: "Customer Satisfaction",
        description:
          "Impact on customer satisfaction (e.g. affordability, essentiality).",
      },
      dropdownFields: [
        {
          id: "customerSatisfaction",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.CUSTOMER_SATISFACTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.customerSatisfaction
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "employeeSatisfaction",
      inputHeader: {
        label: "Employee Satisfaction",
        description:
          "Impact on employee satisfaction (e.g. health and safety, team spirit).",
      },
      dropdownFields: [
        {
          id: "employeeSatisfaction",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.EMPLOYEE_SATISFACTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.employeeSatisfaction
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "shareholderValue",
      inputHeader: {
        label: "Shareholder Value",
        description: "Impact on shareholder value.",
      },
      dropdownFields: [
        {
          id: "shareholderValue",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.SHAREHOLDER_VALUE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.shareholderValue
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "publicPerception",
      inputHeader: {
        label: "Public Perception",
        description: "Impact on public perception (e.g. CSR).",
      },
      dropdownFields: [
        {
          id: "publicPerception",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.PUBLIC_PERCEPTION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.publicPerception
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "valueChain",
      inputHeader: {
        label: "Value Chain",
        description:
          "Impact on value chain (e.g. production, transmission, distribution).",
      },
      dropdownFields: [
        {
          id: "valueChain",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.VALUE_CHAIN,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.valueChain
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "culturalImpact",
      inputHeader: {
        label: "Cultural Impact",
        description: "Impact on culture (e.g. local communities).",
      },
      dropdownFields: [
        {
          id: "culturalImpact",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.CULTURAL_IMPACT,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.culturalImpact
            ),
          },
          entries: impactEntries,
        },
      ],
    },

    {
      id: "visionAlignment",
      inputHeader: {
        label: "Vision Alignment",
        description:
          "Impact on vision alignment (does it fit to the overall mission?).",
      },
      dropdownFields: [
        {
          id: "visionAlignment",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.VISION_ALIGNMENT,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.visionAlignment
            ),
          },
          entries: impactEntries,
        },
      ],
    },
  ];

  const handleModelResult = () => {
    const result: SocietalResults = societalModel(
      societalModelContext.societalInputs
    );
    // const r = financialResults(financialModelContext.financialInputRanges);
    //   financialModelContext.setModelResults(r);
    //   resultsDialogContext.handleShowDialog(true, DialogType.FINANCIAL_MODEL);
    societalModelContext.setModelResults(result);
    resultsDialogContext.handleShowDialog(true, DialogType.SOCIETAL_MODEL);
    console.log("Societal model results: ", result);
    //return result;
  };
  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="Societal"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelResult()}
      />
      <InputGrid inputGroups={inputGroups} id={"societal-model"} />
      {/* {societalModelContext.modelResults && (
        <p>{JSON.stringify(societalModelContext.modelResults)}</p>
      )} */}
    </SectionContainer>
  );
}

export default SocietalSection;
