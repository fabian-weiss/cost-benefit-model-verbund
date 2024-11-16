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
              value={`${societalModelContext.modelResults?.weightedSingleFactors.customerSatisfaction.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.customerSatisfaction
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .customerSatisfaction.value
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.CUSTOMER_AFFORDABILITY}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.customerAffordability.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.customerAffordability
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .customerAffordability.value
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.COMPANY_CULTURE}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.companyCulture.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.companyCulture
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .companyCulture.value
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.SHAREHOLDER_VALUE}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.shareholderValue.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.shareholderValue
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .shareholderValue.value
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.PUBLIC_PERCEPTION}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.publicPerception.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.publicPerception
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .publicPerception.value
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.VALUE_CHAIN}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.valueChain.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.valueChain
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .valueChain.value
              )}
            />

            <ResultEntry
              isSmall
              factor={SocietalInputEnum.COMMUNITY_IMPLICATIONS}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.communityImplications.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.communityImplications
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .communityImplications.value
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.guidingPrinciplesAlignment.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights
                  .guidingPrinciplesAlignment
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .guidingPrinciplesAlignment.value
              )}
            />
            <ResultEntry
              isSmall
              factor={SocietalInputEnum.WORKPLACE_CREATION}
              value={`${societalModelContext.modelResults?.weightedSingleFactors.workplaceCreation.value.toFixed(
                2
              )} (weight ${
                societalModelContext.modelResults?.weights.workplaceCreation
              })`}
              resultInterpretation={valueToResultInterpretation(
                societalModelContext.modelResults?.weightedSingleFactors
                  .workplaceCreation.value
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
