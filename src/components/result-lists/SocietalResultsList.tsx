import { useSocietalModel } from "@/providers/societal-model-provider";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";
import ResultEntry from "../ResultEntry";

function SocietalResultsList() {
  const societalModelContext = useSocietalModel();
  return (
    <div className="fw-results-container">
      {societalModelContext.modelResults ? (
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
      ) : (
        <p>
          {
            "Invalid societal inputs. Unable to calculate the societal model score."
          }
        </p>
      )}
    </div>
  );
}

export default SocietalResultsList;
