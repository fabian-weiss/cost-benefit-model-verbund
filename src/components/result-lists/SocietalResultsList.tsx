import { useSocietalModel } from "@/providers/societal-model-provider";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";
import "@/styles/results-list.css";
import { resultToColor } from "@/utils/result-to-color";
import { impactToNumber } from "@/utils/impact-to-number";
import { normalizeCamelCase } from "@/utils/normalize-camel-case";

function SocietalResultsList() {
  const societalModelContext = useSocietalModel();

  const title: string = "Societal Model Results";
  const body: string =
    "The Societal Model allows a user to input societal factors on a scale from -2 to 2. These results are then multiplied by their weights.";

  return (
    <>
      {societalModelContext.modelResults ? (
        <>
          <tbody>
            <tr>
              <th colSpan={6} className="fw-dialog-title">
                {title}
              </th>
            </tr>
            {/* Subtitle Row */}
            <tr>
              <th colSpan={6} className="fw-dialog-subtitle">
                {body}
              </th>
            </tr>
          </tbody>
          <tbody>
            <tr className="fw-results-list-table-row__header">
              <th>Factor</th>
              <th>Impact</th>
              <th>Mapped Impact</th>
              <th>Weight</th>
              <th>Score</th>
              <th>Comment</th>
            </tr>
          </tbody>
          <tbody>
            {Object.entries(
              societalModelContext.modelResults.weightedSingleFactors
            ).map(([factorKey, factor], index) => (
              <tr
                key={index}
                style={{
                  color: resultToColor(
                    valueToResultInterpretation(factor.value)
                  ),
                }}
                className="fw-results-list-table-row__data"
              >
                <td>{normalizeCamelCase(factorKey)}</td>
                <td>
                  {/* {getScoreLabel(
                      factor.value,
                      societalModelContext.modelResults?.weights[
                        factorKey as keyof typeof societalModelContext.modelResults.weights
                      ] ?? 1
                    )} */}
                  {factor.impact}
                </td>
                <td>{impactToNumber(factor.impact)}</td>
                <td>
                  {
                    societalModelContext.modelResults?.weights[
                      factorKey as keyof typeof societalModelContext.modelResults.weights
                    ]
                  }
                </td>
                <td>
                  {(
                    impactToNumber(factor.impact) *
                    (societalModelContext.modelResults?.weights[
                      factorKey as keyof typeof societalModelContext.modelResults.weights
                    ] ?? 1)
                  ).toFixed(2)}
                </td>
                <td>{factor.comment}</td>
              </tr>
            ))}
            <tr>
              <th
                colSpan={6}
                className="fw-dialog-title"
                style={{
                  color: resultToColor(
                    valueToResultInterpretation(
                      societalModelContext.modelResults.scaledTotalScore
                    )
                  ),
                }}
              >{`Scaled Total Score: ${societalModelContext.modelResults?.scaledTotalScore.toFixed(
                2
              )}`}</th>
            </tr>
            <tr>
              <td
                colSpan={6}
                className="fw-dialog-subtitle fw-table-spacer"
              >{`Description: From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}</td>
            </tr>
          </tbody>
        </>
      ) : (
        <tbody>
          <tr>
            <th colSpan={6} className="fw-dialog-title">
              {
                "No valid Societal model inputs. Unable to calculate the RIO results"
              }
            </th>
          </tr>
        </tbody>
      )}
    </>
  );
}

export default SocietalResultsList;
// function SocietalResultsList() {
//   const societalModelContext = useSocietalModel();
//   return (
//     <div className="fw-results-container">
//       {societalModelContext.modelResults ? (
//         <>
//           <div>
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.CUSTOMER_SATISFACTION}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.customerSatisfaction.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.customerSatisfaction
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .customerSatisfaction.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.CUSTOMER_AFFORDABILITY}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.customerAffordability.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.customerAffordability
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .customerAffordability.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.COMPANY_CULTURE}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.companyCulture.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.companyCulture
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .companyCulture.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.SHAREHOLDER_VALUE}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.shareholderValue.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.shareholderValue
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .shareholderValue.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.PUBLIC_PERCEPTION}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.publicPerception.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.publicPerception
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .publicPerception.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={
//                 SocietalInputEnum.KNOWLEDGE_SHARING_ACROSS_THE_SUPPLY_CHAIN
//               }
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.knowledgeSharingAcrossTheSupplyChain.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights
//                   .knowledgeSharingAcrossTheSupplyChain
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .knowledgeSharingAcrossTheSupplyChain.value
//               )}
//             />

//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.COMMUNITY_IMPLICATIONS}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.communityImplications.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.communityImplications
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .communityImplications.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.guidingPrinciplesAlignment.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights
//                   .guidingPrinciplesAlignment
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .guidingPrinciplesAlignment.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.WORKPLACE_CREATION}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.workplaceCreation.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.workplaceCreation
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .workplaceCreation.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={SocietalInputEnum.HEALTH_AND_SAFETY}
//               value={`${societalModelContext.modelResults?.weightedSingleFactors.healthAndSafety.value.toFixed(
//                 2
//               )} (weight ${
//                 societalModelContext.modelResults?.weights.healthAndSafety
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 societalModelContext.modelResults?.weightedSingleFactors
//                   .healthAndSafety.value
//               )}
//             />
//           </div>
//           <ResultEntry
//             factor="Scaled Total Score"
//             value={societalModelContext.modelResults?.scaledTotalScore.toFixed(
//               2
//             )}
//             description={`From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}
//             resultInterpretation={valueToResultInterpretation(
//               societalModelContext.modelResults?.scaledTotalScore
//             )}
//           />
//         </>
//       ) : (
//         <p>
//           {
//             "Invalid societal inputs. Unable to calculate the societal model score."
//           }
//         </p>
//       )}
//     </div>
//   );
// }

// export default SocietalResultsList;
