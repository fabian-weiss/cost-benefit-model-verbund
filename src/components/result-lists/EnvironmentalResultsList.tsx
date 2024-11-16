import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";
import ResultEntry from "../ResultEntry";
import { EnvironmentalInputEnum } from "@/enums/EnvironmentalInputEnum";

function EnvironmentalResultsList() {
  const environmentalModelContext = useEnvironmentalModel();
  return (
    <div className="fw-results-container">
      {environmentalModelContext.modelResults ? (
        <>
          <div>
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.unSustainableGoals.value.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .unSustainableGoals
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .unSustainableGoals.value
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.WASTE_PRODUCTION}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.wasteProduction.value.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.wasteProduction
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .wasteProduction.value
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.BIODIVERSITY}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.biodiversity.value.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.biodiversity
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .biodiversity.value
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.POLLUTION}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.pollution.value.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.pollution
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .pollution.value
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.sustainableEneryIntegration.value.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .sustainableEneryIntegration
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .sustainableEneryIntegration.value
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.ENERGY_EFFICIENCY}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.energyEfficiency.value.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.energyEfficiency
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .energyEfficiency.value
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.meetingEnvironmentalRegulations.value.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .meetingEnvironmentalRegulations
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .meetingEnvironmentalRegulations.value
              )}
            />
          </div>
          <ResultEntry
            factor="Scaled Total Score"
            value={environmentalModelContext.modelResults?.scaledTotalScore.toFixed(
              2
            )}
            description={`From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}
            resultInterpretation={valueToResultInterpretation(
              environmentalModelContext.modelResults?.scaledTotalScore
            )}
          />
        </>
      ) : (
        <p>{`Model results are undefined. Unable to make a project suggestion.`}</p>
      )}
    </div>
  );
}

export default EnvironmentalResultsList;
