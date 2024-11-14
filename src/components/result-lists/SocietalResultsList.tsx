import { useSocietalModel } from "@/providers/societal-model-provider";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";
import ResultEntry from "../ResultEntry";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";

function SocietalResultsList() {
  const societalModelContext = useSocietalModel();
  return (
    <div className="fw-results-container">
      {societalModelContext.modelResults ? (
        <>
          <div>
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.CUSTOMER_SATISFACTION}
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
              factor={SocietalInputEnum.CUSTOMER_AFFORDABILITY}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.customerAffordability.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.customerAffordability
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .customerAffordability
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.COMPANY_CULTURE}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.companyCulture.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.companyCulture
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .companyCulture
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.SHAREHOLDER_VALUE}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.shareholderValue.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.shareholderValue
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .shareholderValue
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.PUBLIC_PERCEPTION}
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
              factor={SocietalInputEnum.VALUE_CHAIN}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.valueChain.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.valueChain
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .valueChain
              )}
            />

            <ResultEntry
              isSmall
              factor={SocietalInputEnum.COMMUNITY_IMPLICATIONS}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.communityImplications.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.communityImplications
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .communityImplications
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.guidingPrinciplesAlignment.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights
                  .guidingPrinciplesAlignment
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .guidingPrinciplesAlignment
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.WORKPLACE_CREATION}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.workplaceCreation.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.workplaceCreation
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .workplaceCreation
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
