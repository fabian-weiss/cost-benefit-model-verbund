import { useRioModel } from "@/providers/rio-model-provider";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";
import ResultEntry from "../ResultEntry";

function RioResultsList() {
  const rioModelContext = useRioModel();
  return (
    <div className="fw-results-container">
      {rioModelContext.modelResults ? (
        <>
          <div>
            <ResultEntry
              isSmall
              factor="Privacy"
              value={`${rioModelContext.modelResults?.weightedSingleFactors.privacy.toFixed(
                2
              )} (weight ${rioModelContext.modelResults?.weights.privacy})`}
              resultInterpretation={valueToResultInterpretation(
                rioModelContext.modelResults?.weightedSingleFactors.privacy
              )}
            />
            <ResultEntry
              isSmall
              factor="Market advantage"
              value={`${rioModelContext.modelResults?.weightedSingleFactors.marketAdvantage.toFixed(
                2
              )} (weight ${
                rioModelContext.modelResults?.weights.marketAdvantage
              })`}
              resultInterpretation={valueToResultInterpretation(
                rioModelContext.modelResults?.weightedSingleFactors
                  .marketAdvantage
              )}
            />
            <ResultEntry
              isSmall
              factor="Long-term Resilience"
              value={`${rioModelContext.modelResults?.weightedSingleFactors.longTermResilience.toFixed(
                2
              )} (weight ${
                rioModelContext.modelResults?.weights.longTermResilience
              })`}
              resultInterpretation={valueToResultInterpretation(
                rioModelContext.modelResults?.weightedSingleFactors
                  .longTermResilience
              )}
            />
            <ResultEntry
              isSmall
              factor="Long-term Scalability"
              value={`${rioModelContext.modelResults?.weightedSingleFactors.longTermScalability.toFixed(
                2
              )} (weight ${
                rioModelContext.modelResults?.weights.longTermScalability
              })`}
              resultInterpretation={valueToResultInterpretation(
                rioModelContext.modelResults?.weightedSingleFactors
                  .longTermScalability
              )}
            />
            <ResultEntry
              isSmall
              factor="Legal Requirements"
              value={`${rioModelContext.modelResults?.weightedSingleFactors.legalRequirements.toFixed(
                2
              )} (weight ${
                rioModelContext.modelResults?.weights.legalRequirements
              })`}
              resultInterpretation={valueToResultInterpretation(
                rioModelContext.modelResults?.weightedSingleFactors
                  .legalRequirements
              )}
            />
          </div>
          <ResultEntry
            factor="Scaled Total Score"
            value={rioModelContext.modelResults?.scaledTotalScore.toFixed(2)}
            description={`From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}
            resultInterpretation={valueToResultInterpretation(
              rioModelContext.modelResults?.scaledTotalScore
            )}
          />
        </>
      ) : (
        <p>
          {"No valid RIO model inputs. Unable to calculate the RIO results"}
        </p>
      )}
    </div>
  );
}

export default RioResultsList;
