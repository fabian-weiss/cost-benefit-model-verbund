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
        label: SocietalInputEnum.CUSTOMER_SATISFACTION,
        description:
          "Impact on customer satisfaction (e.g. ease of use, essentiality).",
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
      id: "customerAffordability",
      inputHeader: {
        label: SocietalInputEnum.CUSTOMER_AFFORDABILITY,
        description: "Impact on customer affordability.",
      },
      dropdownFields: [
        {
          id: "customerAffordability",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.CUSTOMER_AFFORDABILITY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.customerAffordability
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "companyCulture",
      inputHeader: {
        label: SocietalInputEnum.COMPANY_CULTURE,
        description:
          "Impact on company culture (e.g. health and safety, team spirit).",
      },
      dropdownFields: [
        {
          id: "companyCulture",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.COMPANY_CULTURE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.companyCulture
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
      id: "communityImplications",
      inputHeader: {
        label: SocietalInputEnum.COMMUNITY_IMPLICATIONS,
        description: "Impact on community (e.g. loss of workplaces, harm).",
      },
      dropdownFields: [
        {
          id: "communityImplications",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.COMMUNITY_IMPLICATIONS,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.communityImplications
            ),
          },
          entries: impactEntries,
        },
      ],
    },

    {
      id: "guidingPrinciplesAlignment",
      inputHeader: {
        label: SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT,
        description: "Impact on company alignment (e.g. mission, vision).",
      },
      dropdownFields: [
        {
          id: "guidingPrinciplesAlignment",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.guidingPrinciplesAlignment
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
