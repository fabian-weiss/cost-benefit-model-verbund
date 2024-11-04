"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { RioInputEnum } from "@/enums/RioInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { rioModel } from "@/models/rio-model/rio-model";
import { useResultDialog } from "@/providers/model-result-provider";
import { useRioModel } from "@/providers/rio-model-provider";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { InputGroupType } from "@/types/input-group-type";
import { RioResults } from "@/types/rio/rio-results";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";

function RioSection() {
  const rioModelContext = useRioModel();
  const resultsDialogContext = useResultDialog();

  const inputGroups: InputGroupType[] = [
    {
      id: "privacy",
      inputHeader: {
        label: "Privacy",
        description: "Impact on privacy.",
      },
      dropdownFields: [
        {
          id: "privacy",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.PRIVACY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(rioModelContext.rioInputs.privacy),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "marketAdvantage",
      inputHeader: {
        label: "Market Advantage",
        description: "Impact on market advantage.",
      },
      dropdownFields: [
        {
          id: "marketAdvantage",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.MARKET_ADVANTAGE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(rioModelContext.rioInputs.marketAdvantage),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "longTermResilience",
      inputHeader: {
        label: "Long Term Resilience",
        description: "Impact on long term resilience.",
      },
      dropdownFields: [
        {
          id: "longTermResilience",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.LONG_TERM_RESILIENCE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              rioModelContext.rioInputs.longTermResilience
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "longTermScalability",
      inputHeader: {
        label: "Long Term Scalability",
        description: "Impact on long term scalability.",
      },
      dropdownFields: [
        {
          id: "longTermScalability",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.LONG_TERM_SUSTAINABILITY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              rioModelContext.rioInputs.longTermScalability
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "legalRequirements",
      inputHeader: {
        label: "Legal Requirements",
        description: "Impact on legal requirements.",
      },
      dropdownFields: [
        {
          id: "legalRequirements",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.LEGAL_REQUIREMENTS,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(rioModelContext.rioInputs.legalRequirements),
          },
          entries: impactEntries,
        },
      ],
    },
  ];

  const handleModelResult = () => {
    const result: RioResults = rioModel(rioModelContext.rioInputs);
    // const r = financialResults(financialModelContext.financialInputRanges);
    //   financialModelContext.setModelResults(r);
    //   resultsDialogContext.handleShowDialog(true, DialogType.FINANCIAL_MODEL);
    rioModelContext.setModelResults(result);
    resultsDialogContext.handleShowDialog(true, DialogType.RIO_MODEL);
    console.log("Rio model results: ", result);
    //return result;
  };
  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="RIO (Risk, Innovation, Opportunity) Model"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelResult()}
      />
      <InputGrid inputGroups={inputGroups} id={"rio-model"} />
      {/* {societalModelContext.modelResults && (
        <p>{JSON.stringify(societalModelContext.modelResults)}</p>
      )} */}
    </SectionContainer>
  );
}

export default RioSection;
