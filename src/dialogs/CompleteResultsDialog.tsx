"use client";
import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import ProjectSummary from "@/components/ProjectSummary";
import RadarChart from "@/components/RadarChart";
import EnvironmentalResultsList from "@/components/result-lists/EnvironmentalResultsList";
import FinancialResultsList from "@/components/result-lists/FinancialResultsList";
import RioResultsList from "@/components/result-lists/RioResultsList";
import SocietalResultsList from "@/components/result-lists/SocietalResultsList";
import TableContainer from "@/components/TableContainer";
import { ProjectType } from "@/enums/ProjectType";
import { useEnvironmentalStore } from "@/stores/useEnvironmentalStore";
import { useOverviewStore } from "@/stores/useOverviewStore";
import { useRioStore } from "@/stores/useRioStore";
import { useSocietalStore } from "@/stores/useSocietalStore";
import { ProjectTypeWeights } from "@/types/project-type-weights";
import { downloadAsPdf } from "@/utils/download-as-pdf";
import {
  defaultProjectWeight,
  environmentalProjectWeight,
  getMinMaxBasedOnProjectType,
  rioProjectWeight,
  societalProjectWeight,
} from "@/utils/model-weights";
import { resultToColor } from "@/utils/result-to-color";
import { scaleNumber } from "@/utils/scale-number";
import { toPercent } from "@/utils/to-percent";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";

function CompleteResultsDialog(props: { closeDialog: () => void }) {
  const overviewContext = useOverviewStore();
  const rioModelContext = useRioStore();
  const environmentalModelContext = useEnvironmentalStore();
  const societalModelContext = useSocietalStore();

  const _downloadFile = () => {
    downloadAsPdf(
      "complete-model-table",
      `${
        overviewContext.overviewInputs.projectTitle ?? "Project"
      } - Cost Benefit Analysis`
    );
  };

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

  const societalWeights = _getProjectSpecificWeight().societalWeights;
  const rioWeights = _getProjectSpecificWeight().rioWeights;
  const environmentalWeights = _getProjectSpecificWeight().environmentalWeights;
  const societalModelScore: number =
    (societalModelContext.modelResults?.scaledTotalScore ?? 0) *
    societalWeights;
  const rioModelScore: number =
    (rioModelContext.modelResults?.scaledTotalScore ?? 0) * rioWeights;
  const environmentalModelScore: number =
    (environmentalModelContext.modelResults?.scaledTotalScore ?? 0) *
    environmentalWeights;

  const submodelScores: { key: string; value: number }[] = [
    {
      key: `(${toPercent(societalWeights)}) Societal`,
      value: societalModelScore,
    },
    {
      key: `(${toPercent(environmentalWeights)}) Environmental`,
      value: environmentalModelScore,
    },
    { key: `(${toPercent(rioWeights)}) RIO`, value: rioModelScore },
  ];

  const meanModelScore: number =
    (societalModelScore + environmentalModelScore) / 2 + rioModelScore;

  const scaledMeanModelScore: number = scaleNumber(
    meanModelScore,
    getMinMaxBasedOnProjectType(overviewContext.overviewInputs.projectType).min,
    getMinMaxBasedOnProjectType(overviewContext.overviewInputs.projectType).max
  );

  return (
    <DialogContainer fullscreen closeDialog={props.closeDialog}>
      {/* <ResultsGroup title="Financial Results">
        <FinancialResultsList />
      </ResultsGroup> */}
      <TableContainer id="complete-model-table">
        <ProjectSummary />
        <FinancialResultsList />
        <SocietalResultsList />
        <EnvironmentalResultsList />
        <RioResultsList />

        {submodelScores.map((submodelScore) => (
          <tr key={`submodel-score-${submodelScore.key}`}>
            <th
              style={{
                color: resultToColor(
                  valueToResultInterpretation(submodelScore.value)
                ),
              }}
              colSpan={6}
              className="fw-dialog-title"
            >
              {`${submodelScore.key} Score: ${submodelScore.value.toFixed(2)}`}
            </th>
          </tr>
        ))}
        <tr>
          <th
            style={{
              color: resultToColor(
                valueToResultInterpretation(scaledMeanModelScore, true)
              ),
            }}
            colSpan={6}
            className="fw-dialog-title"
          >
            {`Final Score: ${scaledMeanModelScore.toFixed(2)}`}
          </th>
        </tr>
        <tr>
          <td colSpan={6} className="fw-dialog-subtitle">
            {`The overall model score is the average of the societal, RIO, and environmental model scores on a -1 to 1 scale. 1 is the best possible score. Every project with a score of 0.5 or higher is considered a very good project based on societal, environmental and RIO factors. Projects with a score lower than 0 should not be considered for funding.`}
          </td>
        </tr>
      </TableContainer>
      {/* <ResultsGroup title="Societal Results">
        <SocietalResultsList />
      </ResultsGroup>
      <ResultsGroup title="Environmental Results">
        <EnvironmentalResultsList />
      </ResultsGroup>
      <ResultsGroup title="RIO Results">
        <RioResultsList />
      </ResultsGroup>
      <ResultEntry
        factor="Final Score"
        value={meanModelScore.toFixed(2)}
        resultInterpretation={valueToResultInterpretation(meanModelScore)}
        description="The overall model score is the average of the societal, RIO, and environmental model scores on a -1 to 1 scale. 1 is the best possible score. Every project with a score of 0.5 or higher is considered a very good project based on societal, environmental and rio factors."
      /> */}
      <div
        id="radar-chart"
        style={{
          display: "flex",
          alignSelf: "center",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
        }}
      >
        <RadarChart
          data={[societalModelScore, environmentalModelScore, rioModelScore]}
        />
      </div>
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() => _downloadFile()}
      />
    </DialogContainer>
  );
}

export default CompleteResultsDialog;
