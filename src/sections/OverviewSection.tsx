"use client";
import InputField from "@/components/InputField";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import React, { useEffect, useState } from "react";
import "@/styles/overview.css";
import BubbleSelect from "@/components/BubbleSelect";
import { BubbleType } from "@/types/bubble-type";
import { ProjectType } from "@/enums/ProjectType";
import { ValueType } from "@/enums/ValueType";
import { useOverviewStore } from "@/stores/useOverviewStore";
import ActionButton from "@/components/ActionButton";
import { StructuredInputsType } from "@/types/structured-inputs-type";
import { useEnvironmentalStore } from "@/stores/useEnvironmentalStore";
import { useRioStore } from "@/stores/useRioStore";
import { useSocietalStore } from "@/stores/useSocietalStore";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useSearchParams } from "next/navigation";

function OverviewSection() {
  const overviewStore = useOverviewStore();
  const societalModel = useSocietalStore();
  const environmentalModel = useEnvironmentalStore();
  const rioModel = useRioStore();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<StructuredInputsType>();
  const [error, setError] = useState<string | null>(null);

  const ai = useSearchParams().get("ai");
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
      label: ProjectType.SUSTAINABLE,
      id: `project-type-bubble-${ProjectType.SUSTAINABLE}`,
    },
    {
      label: ProjectType.INNOVATIVE,
      id: `project-type-bubble-${ProjectType.INNOVATIVE}`,
    },
  ];

  const generateInputs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectDescription: overviewStore.overviewInputs.projectDescription,
        }),
      });

      const data = await response.json();

      console.log(`data`, JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.error || "Unexpected error");
      }

      console.log(`type of data`, typeof data);
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const setDefaults = () => {
      if (result) {
        societalModel.setDefaultValues(result.societal);
        environmentalModel.setDefaultValues(result.environmental);
        rioModel.setDefaultValues(result.rio);
      }
    };
    setDefaults();
  }, [result]);

  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader title="Project overview" />
      <div className="fw-overview-grid">
        <div className="fw-overview-text-fields">
          <InputField
            inputField={{
              onChange: (e) =>
                overviewStore.handleOverviewInput({
                  projectTitle: e.target.value,
                }),
              value: overviewStore.overviewInputs.projectTitle ?? "",
              label: "Project title",
              id: "project-title",
              type: "text",
              placeholder: "Project X",
            }}
          />
          <InputField
            inputField={{
              onChange: (e) =>
                overviewStore.handleOverviewInput({
                  projectOwner: e.target.value,
                }),
              value: overviewStore.overviewInputs.projectOwner ?? "",
              label: "Project owner",
              id: "project-owner",
              type: "text",
              placeholder: "John Doe",
            }}
          />
          <InputField
            inputField={{
              onChange: (e) => {
                overviewStore.handleOverviewInput({
                  budget: Number(e.target.value),
                });
              },
              value: overviewStore.overviewInputs.budget?.toString() ?? "",
              label: "Budget",
              id: "project-budget",
              type: "number",
              prefix: "€",
              placeholder: "10.000,00",
              valueType: ValueType.CURRENCY,
            }}
          />
          <BubbleSelect
            header="Project type"
            description="What type of project are you working on?"
            bubbles={bubbles}
            selectedBubble={selectedProjectType ?? bubbles[0]}
            setSelectedBubble={(bubble: BubbleType) => {
              setSelectedProjectType(bubble);
              overviewStore.handleOverviewInput({
                projectType: bubble.label as ProjectType,
              });
            }}
          />
          <ToggleSwitch
            title="Enable financial model"
            isChecked={overviewStore.overviewInputs.enableFinancial ?? false}
            onStateChanged={(isChecked: boolean) =>
              overviewStore.handleOverviewInput({ enableFinancial: isChecked })
            }
            description="Set values for the financial submodel and include it in the results."
          />
        </div>
        <div className="fw-project-description-wrapper">
          <InputField
            inputField={{
              onTextAreaChange: (e) =>
                overviewStore.handleOverviewInput({
                  projectDescription: e.target.value,
                }),
              isTextArea: true,
              value: overviewStore.overviewInputs.projectDescription ?? "",
              label: "Project description",
              id: "project-description",
              type: "text",
              placeholder: "Describe your project...",
            }}
          />
          {(process.env.NODE_ENV === "development" || ai == "true") && (
            <>
              <ActionButton
                onClick={generateInputs}
                label="Generate Defaults"
                fillType={"solid"}
                loading={loading}
              />
              {error && <p className="fw-error-message">{error}</p>}
              {/* {result && (
                <div className="fw-result-container">
                  {JSON.stringify(result)}
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
      {/* {societalModelContext.modelResults && (
        <p>{JSON.stringify(societalModelContext.modelResults)}</p>
      )} */}
    </SectionContainer>
  );
}

export default OverviewSection;
