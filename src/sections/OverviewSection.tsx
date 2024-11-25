"use client";
import InputField from "@/components/InputField";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { useOverview } from "@/providers/overview-provider";
import React from "react";
import "@/styles/overview.css";
import BubbleSelect from "@/components/BubbleSelect";
import { BubbleType } from "@/types/bubble-type";
import { ProjectType } from "@/enums/ProjectType";

function OverviewSection() {
  const overviewContext = useOverview();

  const [selectedProjectType, setSelectedProjectType] =
    React.useState<BubbleType>();

  const bubbles: BubbleType[] = [
    {
      label: ProjectType.DEFAULT,
      id: `project-type-bubble-${ProjectType.DEFAULT}`,
    },
    {
      label: ProjectType.SOCIAL,
      id: `project-type-bubble-${ProjectType.SOCIAL}`,
    },
    {
      label: ProjectType.INNOVATIVE,
      id: `project-type-bubble-${ProjectType.INNOVATIVE}`,
    },
    {
      label: ProjectType.SUSTAINABLE,
      id: `project-type-bubble-${ProjectType.SUSTAINABLE}`,
    },
  ];
  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader title="Project overview" />
      <div className="fw-overview-grid">
        <div className="fw-overview-text-fields">
          <InputField
            inputField={{
              onChange: (e) =>
                overviewContext.handleOverviewInput({
                  projectTitle: e.target.value,
                }),
              value: overviewContext.overviewInputs.projectTitle ?? "",
              label: "Project title",
              id: "project-title",
              type: "text",
              placeholder: "Project X",
            }}
          />
          <InputField
            inputField={{
              onChange: (e) =>
                overviewContext.handleOverviewInput({
                  projectOwner: e.target.value,
                }),
              value: overviewContext.overviewInputs.projectOwner ?? "",
              label: "Project owner",
              id: "project-owner",
              type: "text",
              placeholder: "John Doe",
            }}
          />
          <InputField
            inputField={{
              onChange: (e) =>
                overviewContext.handleOverviewInput({
                  budget: Number(e.target.value),
                }),
              value: overviewContext.overviewInputs.budget?.toFixed(2) ?? "",
              label: "Budget",
              id: "project-budget",
              type: "number",
              prefix: "€",
              placeholder: "10.000,00",
            }}
          />
          <BubbleSelect
            header="Project type"
            description="What type of project are you working on?"
            bubbles={bubbles}
            selectedBubble={selectedProjectType ?? bubbles[0]}
            setSelectedBubble={(bubble: BubbleType) => {
              setSelectedProjectType(bubble);
              overviewContext.handleOverviewInput({
                projectType: bubble.label as ProjectType,
              });
            }}
          />
        </div>
        <InputField
          inputField={{
            onTextAreaChange: (e) =>
              overviewContext.handleOverviewInput({
                projectDescription: e.target.value,
              }),
            isTextArea: true,
            value: overviewContext.overviewInputs.projectDescription ?? "",
            label: "Project description",
            id: "project-description",
            type: "text",
            placeholder: "Describe your project...",
          }}
        />
      </div>
      {/* {societalModelContext.modelResults && (
        <p>{JSON.stringify(societalModelContext.modelResults)}</p>
      )} */}
    </SectionContainer>
  );
}

export default OverviewSection;
