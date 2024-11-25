"use client";
import DialogContainer from "@/components/DialogContainer";
import EnvironmentalResultsList from "@/components/result-lists/EnvironmentalResultsList";
import FinancialResultsList from "@/components/result-lists/FinancialResultsList";
import RioResultsList from "@/components/result-lists/RioResultsList";
import SocietalResultsList from "@/components/result-lists/SocietalResultsList";
import ResultEntry from "@/components/ResultEntry";
import ResultsGroup from "@/components/ResultsGroup";
import { ProjectType } from "@/enums/ProjectType";
import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { useOverview } from "@/providers/overview-provider";
import { useRioModel } from "@/providers/rio-model-provider";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { ProjectTypeWeights } from "@/types/project-type-weights";
import {
  defaultProjectWeight,
  environmentalProjectWeight,
  rioProjectWeight,
  societalProjectWeight,
} from "@/utils/model-weights";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";

function CompleteResultsDialog(props: { closeDialog: () => void }) {
  const overviewContext = useOverview();
  const rioModelContext = useRioModel();
  const environmentalModelContext = useEnvironmentalModel();
  const societalModelContext = useSocietalModel();

  const _getProjectSpecificWeight = (): ProjectTypeWeights => {
    switch (overviewContext.overviewInputs.projectType) {
      case ProjectType.DEFAULT:
        return defaultProjectWeight;
      case ProjectType.SOCIAL:
        return societalProjectWeight;
      case ProjectType.INNOVATIVE:
        return rioProjectWeight;
      case ProjectType.SUSTAINABLE:
        return environmentalProjectWeight;
      default:
        return defaultProjectWeight;
    }
  };

  const meanModelScore: number =
    ((societalModelContext.modelResults?.scaledTotalScore ?? 0) *
      _getProjectSpecificWeight().societalWeights +
      (rioModelContext.modelResults?.scaledTotalScore ?? 0) *
        _getProjectSpecificWeight().rioWeights +
      (environmentalModelContext.modelResults?.scaledTotalScore ?? 0) *
        _getProjectSpecificWeight().environmentalWeights) /
    3;

  return (
    <DialogContainer
      fullscreen
      closeDialog={props.closeDialog}
      title="Overall Model Score"
      body="See the summary of all the submodels below. Download the whole report to see details."
    >
      <ResultEntry
        factor="Final Score"
        value={meanModelScore.toFixed(2)}
        resultInterpretation={valueToResultInterpretation(meanModelScore)}
        description="The overall model score is the average of the societal, RIO, and environmental model scores on a -1 to 1 scale. 1 is the best possible score. Every project with a score of 0.5 or higher is considered a very good project based on societal, environmental and rio factors."
      />
      <ResultsGroup title="Financial Results">
        <FinancialResultsList />
      </ResultsGroup>
      <ResultsGroup title="Societal Results">
        <SocietalResultsList />
      </ResultsGroup>
      <ResultsGroup title="Environmental Results">
        <EnvironmentalResultsList />
      </ResultsGroup>
      <ResultsGroup title="RIO Results">
        <RioResultsList />
      </ResultsGroup>
    </DialogContainer>
  );
}

export default CompleteResultsDialog;
