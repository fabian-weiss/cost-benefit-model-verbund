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
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.unSustainableGoals.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .unSustainableGoals
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .unSustainableGoals
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.WASTE_PRODUCTION}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.wasteProduction.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.wasteProduction
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .wasteProduction
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.BIODIVERSITY}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.biodiversity.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.biodiversity
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .biodiversity
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.POLLUTION}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.pollution.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.pollution
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .pollution
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.sustainableEneryIntegration.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .sustainableEneryIntegration
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .sustainableEneryIntegration
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.ENERGY_EFFICIENCY}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.energyEfficiency.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.energyEfficiency
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .energyEfficiency
              )}
            />
            <ResultEntry
              isSmall
              factor={EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS}
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.meetingEnvironmentalRegulations.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .meetingEnvironmentalRegulations
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .meetingEnvironmentalRegulations
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
