"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { Impact } from "@/enums/Impact";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { societalModel } from "@/models/societal-model/societal-model";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { InputGroupType } from "@/types/input-group-type";
import { SocietalInputs } from "@/types/societal/societal-inputs";
import { SocietalResults } from "@/types/societal/societal-results";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";
import { useState } from "react";

function SocietalSection() {
  const societalModelContext = useSocietalModel();
  const [modelResults, setModelResults] = useState<
    SocietalResults | undefined
  >();
  // const [societalInputs, setSocietalInputs] = useState<SocietalInputs>(societalModelContext.societalInputs);

  const inputGroups: InputGroupType[] = [
    {
      id: "jobCreation",
      inputHeader: {
        label: "Job Creation",
        description: "The impact the project has on job creation.",
      },
      dropdownFields: [
        {
          id: "jobCreation",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.JOB_CREATION,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.jobCreation
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "jobEquity",
      inputHeader: {
        label: "Job Equity",
        description: "Impact on job equity.",
      },
      dropdownFields: [
        {
          id: "jobEquity",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.JOB_EQUITY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.jobEquity
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "healthAndSafety",
      inputHeader: {
        label: "Health and Safety",
        description: "The impact the project has on health and safety.",
      },
      dropdownFields: [
        {
          id: "healthyAndSafety",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.HEALTH_AND_SAFETY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.healthAndSafety
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
        description: "The impact the project has on culture.",
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
      id: "publicPerception",
      inputHeader: {
        label: "Public Perception",
        description: "Impact on public perception.",
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
      id: "educationalImpact",
      inputHeader: {
        label: "Educational Impact",
        description: "Impact on education.",
      },
      dropdownFields: [
        {
          id: "educationalImpact",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.EDUCATIONAL_IMPACT,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.educationalImpact
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "qualityOfLife",
      inputHeader: {
        label: "Quality of Life",
        description: "Impact on quality of life.",
      },
      dropdownFields: [
        {
          id: "qualityOfLife",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.QUALITY_OF_LIFE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.qualityOfLife
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "customerSatisfaction",
      inputHeader: {
        label: "Customer Satisfaction",
        description: "Impact on customer satisfaction.",
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
        description: "Impact on employee satisfaction.",
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
  ];

  const handleModelResult = (): SocietalResults => {
    const result: SocietalResults = societalModel(
      societalModelContext.societalInputs
    );
    setModelResults(result);
    return result;
  };
  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="Societal"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelResult()}
      />
      <InputGrid inputGroups={inputGroups} id={"societal-model"} />
      {modelResults && <p>{JSON.stringify(modelResults)}</p>}
    </SectionContainer>
  );
}

export default SocietalSection;
