import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import ResultEntry from "@/components/ResultEntry";
import { ResultInterpretation } from "@/enums/ResultInterpretation";
import { useFinancialModel } from "@/providers/financial-model-provider";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { formatToEuro } from "@/utils/format-to-euro";
import { formatToPercent } from "@/utils/format-to-percent";
import { resultToColor } from "@/utils/result-to-color";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import { mean } from "mathjs";
import React from "react";

function SocietalResultsDialog() {
  const societalModelContext = useSocietalModel();

  return (
    <DialogContainer
      title="Societal Model Results"
      body="The societal model allows a user to input societal factors on a scale from -2 to 2. These results are then multiplied by their weights."
    >
      {societalModelContext.modelResults && (
        <>
          <div>
            <ResultEntry
              isSmall
              factor="Job Creation"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.jobCreation.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.jobCreation
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .jobCreation
              )}
            />
            <ResultEntry
              isSmall
              factor="Job Equity"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.jobEquity.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.jobEquity
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .jobEquity
              )}
            />
            <ResultEntry
              isSmall
              factor="Health and Safety"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.healthAndSafety.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.healthAndSafety
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .healthAndSafety
              )}
            />
            <ResultEntry
              isSmall
              factor="Cultural Impact"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.culturalImpact.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.culturalImpact
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .culturalImpact
              )}
            />
            <ResultEntry
              isSmall
              factor="Public Perception"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.publicPerception.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.publicPerception
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .publicPerception
              )}
            />
            <ResultEntry
              isSmall
              factor="Educational Impact"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.educationalImpact.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.educationalImpact
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .educationalImpact
              )}
            />
            <ResultEntry
              isSmall
              factor="Quality of Life"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.qualityOfLife.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.qualityOfLife
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .qualityOfLife
              )}
            />
            <ResultEntry
              isSmall
              factor="Customer Satisfaction"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.customerSatisfaction.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.customerSatisfaction
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .customerSatisfaction
              )}
            />
            <ResultEntry
              isSmall
              factor="Employee Satisfaction"
              value={`${societalModelContext.modelResults?.weightedSingleFactors.employeeSatisfaction.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.employeeSatisfaction
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .employeeSatisfaction
              )}
            />
          </div>
          <ResultEntry
            factor="Scaled Total Score"
            value={societalModelContext.modelResults?.scaledTotalScore.toFixed(
              2
            )}
            description={`From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}
            resultInterpretation={valueToResultInterpretation(
              societalModelContext.modelResults?.scaledTotalScore
            )}
          />
        </>
      )}
      <ActionButton
        fullWidth
        label={"Download as PDF"}
        fillType={"solid"}
        onClick={() => console.log("Download financial model as pdf")}
      />
    </DialogContainer>
  );
}

export default SocietalResultsDialog;
