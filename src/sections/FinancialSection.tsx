"use client";
import AdjustmentButtonRow from "@/components/AdjustmentButtonRow";
import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { FinancialInputRangesEnum } from "@/enums/FinancialInputRangesEnum";
import { financialResults } from "@/models/financial-model/financial-results";
import { useFinancialModel } from "@/providers/financial-model-provider";
import "@/styles/model-section.css";
import { InputGroupType } from "@/types/input-group-type";
import { round } from "mathjs";

import React from "react";

function FinancialSection() {
  const financialModelContext = useFinancialModel();
  const [budget, setBudget] = React.useState<number>();
  const [initialInvestment, setInitialInvestment] = React.useState<number>();
  const [annualOperatingCosts, setAnnualOperatingCosts] =
    React.useState<number>();
  const [annualMaintenanceCosts, setAnnualMaintenanceCosts] =
    React.useState<number>();
  const [annualTrainingCosts, setAnnualTrainingCosts] =
    React.useState<number>();
  const [annualRevenue, setAnnualRevenue] = React.useState<number>();
  const [projectDuration, setProjectDuration] = React.useState<number>();
  const [riskFactor, setRiskFactor] = React.useState<number>();
  const [errors, setErrors] = React.useState<any>({
    budget: "",
    initialInvestment: "",
    annualOperatingCosts: "",
    annualMaintenanceCosts: "",
    annualTrainingCosts: "",
    annualRevenue: "",
    projectDuration: "",
    riskFactor: "",
  });

  const [modelResults, setModelResults] = React.useState<any>(undefined);

  const clearErrors = () => {
    setErrors({
      budget: "",
      initialInvestment: "",
      annualOperatingCosts: "",
      annualMaintenanceCosts: "",
      annualTrainingCosts: "",
      annualRevenue: "",
      projectDuration: "",
      riskFactor: "",
    });
  };

  const handleAdjustment = (
    adjustment: number,
    factorType: FinancialInputRangesEnum
  ) => {
    const vs: number[] = [];
    switch (factorType) {
      case FinancialInputRangesEnum.BUDGET:
        financialModelContext.financialInputRanges.budget.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        console.log("vs", vs);
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.BUDGET,
          vs
        );
        break;
      case FinancialInputRangesEnum.INITIAL_INVESTMENT:
        financialModelContext.financialInputRanges.initialInvestment.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.INITIAL_INVESTMENT,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS:
        financialModelContext.financialInputRanges.annualOperatingCosts.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS:
        financialModelContext.financialInputRanges.annualMaintenanceCosts.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_TRAINING_COSTS:
        financialModelContext.financialInputRanges.annualTrainingCosts.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_TRAINING_COSTS,
          vs
        );
        break;
      case FinancialInputRangesEnum.ANNUAL_REVENUE:
        financialModelContext.financialInputRanges.annualRevenue.forEach(
          (value: number) => {
            const upper: number = round(value * (1 + adjustment / 100), 2);
            const lower: number = round(value * (1 - adjustment / 100), 2);
            if (!vs.includes(upper)) {
              vs.push(upper);
            }
            if (!vs.includes(lower)) {
              vs.push(lower);
            }
          }
        );
        financialModelContext.addFinancialInput(
          FinancialInputRangesEnum.ANNUAL_REVENUE,
          vs
        );
        break;
    }
  };

  const inputGroups: InputGroupType[] = [
    // Budget
    {
      label: "Budget",
      values: financialModelContext.financialInputRanges.budget,
      isCurrency: true,
      rangeAdjustments: [10, 20, 30],
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.BUDGET,
          value
        ),
      inputField: {
        id: "budget",
        value: budget?.toString() ?? "",
        label: "Budget",
        description: "At least 1 - Click 'Enter' to add",
        error: errors.budget,
        type: "number",
        prefix: "€",
        onChange: (e) => {
          setBudget(Number(e.target.value.trim()));
        },
        actionWidget: (
          <AdjustmentButtonRow
            adjustments={[10, 20, 30]}
            callback={(adjustment: number) =>
              handleAdjustment(adjustment, FinancialInputRangesEnum.BUDGET)
            }
            id={"budget"}
            disabled={
              financialModelContext.financialInputRanges.budget.length === 0
            }
          />
        ),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
          addRangeInput(
            e,
            budget ?? 0,
            () => {
              financialModelContext.addFinancialInput(
                FinancialInputRangesEnum.BUDGET,
                [Number(budget)]
              );
              setBudget(undefined);
            },
            financialModelContext.financialInputRanges.budget
          ),
      },
    },
    // Initial Investment
    {
      label: "Initial Investment",
      values: financialModelContext.financialInputRanges.initialInvestment,
      rangeAdjustments: [10, 20, 30],
      isCurrency: true,
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.INITIAL_INVESTMENT,
          value
        ),
      inputField: {
        id: "initial-investment",
        value: initialInvestment?.toString() ?? "",
        label: "Initial Investment",
        description: "At least 1 - Click 'Enter' to add",
        error: errors.initialInvestment,
        type: "number",
        prefix: "€",
        onChange: (e) => {
          setInitialInvestment(Number(e.target.value.trim()));
        },
        actionWidget: (
          <AdjustmentButtonRow
            adjustments={[10, 20, 30]}
            callback={(adjustment: number) =>
              handleAdjustment(
                adjustment,
                FinancialInputRangesEnum.INITIAL_INVESTMENT
              )
            }
            id={"initial-investment"}
            disabled={
              financialModelContext.financialInputRanges.initialInvestment
                .length === 0
            }
          />
        ),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
          addRangeInput(
            e,
            initialInvestment ?? 0,
            () => {
              financialModelContext.addFinancialInput(
                FinancialInputRangesEnum.INITIAL_INVESTMENT,
                [Number(initialInvestment)]
              );
              setInitialInvestment(undefined);
            },
            financialModelContext.financialInputRanges.initialInvestment
          ),
      },
    },
    // Annual Operating Costs
    {
      label: "Annual Operating Costs",
      values: financialModelContext.financialInputRanges.annualOperatingCosts,
      rangeAdjustments: [10, 20, 30],
      isCurrency: true,
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
          value
        ),
      inputField: {
        id: "annual-operating-costs",
        value: annualOperatingCosts?.toString() ?? "",
        label: "Annual Operating Costs",
        description: "At least 1 - Click 'Enter' to add",
        error: errors.annualOperatingCosts,
        type: "number",
        prefix: "€",
        onChange: (e) => {
          setAnnualOperatingCosts(Number(e.target.value.trim()));
        },
        actionWidget: (
          <AdjustmentButtonRow
            adjustments={[10, 20, 30]}
            callback={(adjustment: number) =>
              handleAdjustment(
                adjustment,
                FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS
              )
            }
            id={"annual-operating-costs"}
            disabled={
              financialModelContext.financialInputRanges.annualOperatingCosts
                .length === 0
            }
          />
        ),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
          addRangeInput(
            e,
            annualOperatingCosts ?? 0,
            () => {
              financialModelContext.addFinancialInput(
                FinancialInputRangesEnum.ANNUAL_OPERATING_COSTS,
                [Number(annualOperatingCosts)]
              );
              setAnnualOperatingCosts(undefined);
            },
            financialModelContext.financialInputRanges.annualOperatingCosts
          ),
      },
    },
    // Annual Maintenance Costs
    {
      label: "Annual Maintenance Costs",
      values: financialModelContext.financialInputRanges.annualMaintenanceCosts,
      rangeAdjustments: [10, 20, 30],
      isCurrency: true,
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
          value
        ),
      inputField: {
        id: "annual-maintenance-costs",
        value: annualMaintenanceCosts?.toString() ?? "",
        label: "Annual Maintenance Costs",
        description: "At least 1 - Click 'Enter' to add",
        error: errors.annualMaintenanceCosts,
        type: "number",
        prefix: "€",
        onChange: (e) => {
          setAnnualMaintenanceCosts(Number(e.target.value.trim()));
        },
        actionWidget: (
          <AdjustmentButtonRow
            adjustments={[10, 20, 30]}
            callback={(adjustment: number) =>
              handleAdjustment(
                adjustment,
                FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS
              )
            }
            id={"annual-maintenance-costs"}
            disabled={
              financialModelContext.financialInputRanges.annualMaintenanceCosts
                .length === 0
            }
          />
        ),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
          addRangeInput(
            e,
            annualMaintenanceCosts ?? 0,
            () => {
              financialModelContext.addFinancialInput(
                FinancialInputRangesEnum.ANNUAL_MAINTENANCE_COSTS,
                [Number(annualMaintenanceCosts)]
              );
              setAnnualMaintenanceCosts(undefined);
            },
            financialModelContext.financialInputRanges.annualMaintenanceCosts
          ),
      },
    },
    // Annual Training Costs
    {
      label: "Annual Training Costs",
      values: financialModelContext.financialInputRanges.annualTrainingCosts,
      rangeAdjustments: [10, 20, 30],
      isCurrency: true,
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.ANNUAL_TRAINING_COSTS,
          value
        ),
      inputField: {
        id: "annual-training-costs",
        value: annualTrainingCosts?.toString() ?? "",
        label: "Annual Training Costs",
        description: "At least 1 - Click 'Enter' to add",
        error: errors.annualTrainingCosts,
        type: "number",
        prefix: "€",
        onChange: (e) => {
          setAnnualTrainingCosts(Number(e.target.value.trim()));
        },
        actionWidget: (
          <AdjustmentButtonRow
            adjustments={[10, 20, 30]}
            callback={(adjustment: number) =>
              handleAdjustment(
                adjustment,
                FinancialInputRangesEnum.ANNUAL_TRAINING_COSTS
              )
            }
            id={"annual-training-costs"}
            disabled={
              financialModelContext.financialInputRanges.annualTrainingCosts
                .length === 0
            }
          />
        ),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
          addRangeInput(
            e,
            annualTrainingCosts ?? 0,
            () => {
              financialModelContext.addFinancialInput(
                FinancialInputRangesEnum.ANNUAL_TRAINING_COSTS,
                [Number(annualTrainingCosts)]
              );
              setAnnualTrainingCosts(undefined);
            },
            financialModelContext.financialInputRanges.annualTrainingCosts
          ),
      },
    },
    // Annual Revenue
    {
      label: "Annual Revenue",
      values: financialModelContext.financialInputRanges.annualRevenue,
      rangeAdjustments: [10, 20, 30],
      isCurrency: true,
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.ANNUAL_REVENUE,
          value
        ),
      inputField: {
        id: "annual-revenue",
        value: annualRevenue?.toString() ?? "",
        label: "Annual Revenue",
        description: "At least 1 - Click 'Enter' to add",
        error: errors.annualRevenue,
        type: "number",
        prefix: "€",
        onChange: (e) => {
          setAnnualRevenue(Number(e.target.value.trim()));
        },
        actionWidget: (
          <AdjustmentButtonRow
            adjustments={[10, 20, 30]}
            callback={(adjustment: number) =>
              handleAdjustment(
                adjustment,
                FinancialInputRangesEnum.ANNUAL_REVENUE
              )
            }
            id={"annual-revenue"}
            disabled={
              financialModelContext.financialInputRanges.annualRevenue
                .length === 0
            }
          />
        ),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
          addRangeInput(
            e,
            annualRevenue ?? 0,
            () => {
              financialModelContext.addFinancialInput(
                FinancialInputRangesEnum.ANNUAL_REVENUE,
                [Number(annualRevenue)]
              );
              setAnnualRevenue(undefined);
            },

            financialModelContext.financialInputRanges.annualRevenue
          ),
      },
    },
    // Project Duration
    {
      label: "Project Duration",
      values: financialModelContext.financialInputRanges.projectDuration,
      suffix: "years",
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.PROJECT_DURATION,
          value
        ),
      inputField: {
        id: "project-duration",
        value: projectDuration?.toString() ?? "",
        label: "Project Duration",
        description: "At least 1 - Click 'Enter' to add",
        error: errors.projectDuration,
        type: "number",
        suffix: "years",
        onChange: (e) => {
          setProjectDuration(Number(e.target.value.trim()));
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
          addRangeInput(
            e,
            projectDuration ?? 0,
            () => {
              financialModelContext.addFinancialInput(
                FinancialInputRangesEnum.PROJECT_DURATION,
                [Number(projectDuration)]
              );
              setProjectDuration(undefined);
            },
            financialModelContext.financialInputRanges.projectDuration
          ),
      },
    },
    // Risk Factor
    {
      label: "Risk Factor",
      values: financialModelContext.financialInputRanges.riskFactor,
      suffix: "%",
      removeCallback: (value: number) =>
        financialModelContext.removeFinancialInput(
          FinancialInputRangesEnum.RISK_FACTOR,
          value
        ),
      inputField: {
        id: "risk-factor",
        value: riskFactor?.toString() ?? "",
        label: "Risk Factor",
        error: errors.riskFactor,
        description: "At least 1 - between 0 and 100 - 'Enter' to add",
        type: "number",
        onChange: (e) => {
          setRiskFactor(Number(e.target.value.trim()));
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (riskFactor != undefined && riskFactor <= 100 && riskFactor >= 0) {
            addRangeInput(
              e,
              riskFactor ?? 0,
              () => {
                financialModelContext.addFinancialInput(
                  FinancialInputRangesEnum.RISK_FACTOR,
                  [Number(riskFactor)]
                );
                setRiskFactor(undefined);
              },
              financialModelContext.financialInputRanges.riskFactor
            );
          } else if (e.key === "Enter" || e.key === "Tab") {
            setErrors((prev: any) => ({
              ...prev,
              riskFactor: "Risk factor must be between 0 and 100",
            }));
          }
        },
      },
    },
  ];

  const handleModelSubmit = () => {
    clearErrors();
    let hasErrors = false;
    if (financialModelContext.financialInputRanges.budget.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        budget: "Set at least one expected budget",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.initialInvestment.length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        initialInvestment: "Set a least one expected initial investment",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualOperatingCosts.length ===
      0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualOperatingCosts: "Set at least one expected annual operating cost",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualMaintenanceCosts
        .length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualMaintenanceCosts:
          "Set at least one expected annual maintenance cost",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.annualTrainingCosts.length ===
      0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        annualTrainingCosts: "Set at least one expected annual training cost",
      }));
      hasErrors = true;
    }
    if (financialModelContext.financialInputRanges.annualRevenue.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        annualRevenue: "Set at least one expected annual revenue",
      }));
      hasErrors = true;
    }
    if (
      financialModelContext.financialInputRanges.projectDuration.length === 0
    ) {
      setErrors((prev: any) => ({
        ...prev,
        projectDuration: "Set at least one expected project duration",
      }));
      hasErrors = true;
    }
    if (financialModelContext.financialInputRanges.riskFactor.length === 0) {
      setErrors((prev: any) => ({
        ...prev,
        riskFactor: "Set at least one expected risk factor",
      }));
      hasErrors = true;
    }
    if (!hasErrors) {
      const r = financialResults(financialModelContext.financialInputRanges);
      setModelResults(r);
    } else if (modelResults != undefined) {
      setModelResults(undefined);
    }
  };

  const addRangeInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    input: number,
    callback: (input: number) => void,
    currentRange: number[]
  ) => {
    if (event.key === "Enter" || event.key === "Tab") {
      console.log("newInput", input);
      if (!currentRange.includes(input)) {
        callback(input);
      }
    }
  };

  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="Financial"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelSubmit()}
      />
      <InputGrid inputGroups={inputGroups} id={"financial"} />
      {modelResults && <p>{JSON.stringify(modelResults)}</p>}
    </SectionContainer>
  );
}

export default FinancialSection;
