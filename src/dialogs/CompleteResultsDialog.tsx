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
import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { useOverview } from "@/providers/overview-provider";
import { useRioModel } from "@/providers/rio-model-provider";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { ProjectTypeWeights } from "@/types/project-type-weights";
import { downloadAsPdf } from "@/utils/download-as-pdf";
import {
  defaultProjectWeight,
  environmentalProjectWeight,
  rioProjectWeight,
  societalProjectWeight,
} from "@/utils/model-weights";
import { resultToColor } from "@/utils/result-to-color";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";

function CompleteResultsDialog(props: { closeDialog: () => void }) {
  const overviewContext = useOverview();
  const rioModelContext = useRioModel();
  const environmentalModelContext = useEnvironmentalModel();
  const societalModelContext = useSocietalModel();

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

  const societalModelScore: number =
    (societalModelContext.modelResults?.scaledTotalScore ?? 0) *
    _getProjectSpecificWeight().societalWeights;
  const rioModelScore: number =
    (rioModelContext.modelResults?.scaledTotalScore ?? 0) *
    _getProjectSpecificWeight().rioWeights;
  const environmentalModelScore: number =
    (environmentalModelContext.modelResults?.scaledTotalScore ?? 0) *
    _getProjectSpecificWeight().environmentalWeights;

  const submodelScores: { key: string; value: number }[] = [
    { key: "Societal", value: societalModelScore },
    { key: "RIO", value: rioModelScore },
    { key: "Environmental", value: environmentalModelScore },
  ];

  const meanModelScore: number =
    (societalModelScore + rioModelScore + environmentalModelScore) / 3;

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
              color: resultToColor(valueToResultInterpretation(meanModelScore)),
            }}
            colSpan={6}
            className="fw-dialog-title"
          >
            {`Final Score: ${meanModelScore.toFixed(2)}`}
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
