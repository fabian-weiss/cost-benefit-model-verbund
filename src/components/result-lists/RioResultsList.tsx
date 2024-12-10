import { useRioModel } from "@/providers/rio-model-provider";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";
import { impactToNumber } from "@/utils/impact-to-number";
import { resultToColor } from "@/utils/result-to-color";
import { normalizeCamelCase } from "@/utils/normalize-camel-case";

function RioResultsList() {
  const rioModelContext = useRioModel();

  const title: string = "RIO Model Results";
  const body: string =
    "The RIO model allows a user to input risk, innovation and opportunity factors on a scale from -2 to 2. These results are then multiplied by their weights.";

  return (
    <>
      {rioModelContext.modelResults ? (
        <>
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
          <tr className="fw-results-list-table-row__header">
            <th>Factor</th>
            <th>Impact</th>
            <th>Mapped Impact</th>
            <th>Weight</th>
            <th>Score</th>
            <th className="fw-table-large-col">Comment</th>
          </tr>
          {Object.entries(
            rioModelContext.modelResults.weightedSingleFactors
          ).map(([factorKey, factor], index) => (
            <tr
              key={index}
              style={{
                color: resultToColor(valueToResultInterpretation(factor.value)),
              }}
              className="fw-results-list-table-row__data"
            >
              <td className="fw-table-small-col">
                {normalizeCamelCase(factorKey)}
              </td>
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
                  rioModelContext.modelResults?.weights[
                    factorKey as keyof typeof rioModelContext.modelResults.weights
                  ]
                }
              </td>
              <td>
                {(
                  impactToNumber(factor.impact) *
                  (rioModelContext.modelResults?.weights[
                    factorKey as keyof typeof rioModelContext.modelResults.weights
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
                    rioModelContext.modelResults.scaledTotalScore
                  )
                ),
              }}
            >{`Scaled Total Score: ${rioModelContext.modelResults?.scaledTotalScore.toFixed(
              2
            )}`}</th>
          </tr>
          <tr>
            <td
              colSpan={6}
              className="fw-dialog-subtitle fw-table-spacer"
            >{`Description: From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}</td>
          </tr>
        </>
      ) : (
        <tr>
          <th colSpan={6} className="fw-dialog-title">
            {"No valid RIO model inputs. Unable to calculate the RIO results"}
          </th>
        </tr>
      )}
    </>
  );
}

export default RioResultsList;
// function RioResultsList() {
//   const rioModelContext = useRioModel();
//   return (
//     <div className="fw-results-container.value">
//       {rioModelContext.modelResults ? (
//         <>
//           <div>
//             <ResultEntry
//               isSmall
//               factor="Privacy"
//               value={`${rioModelContext.modelResults?.weightedSingleFactors.privacy.value.toFixed(
//                 2
//               )} (weight ${rioModelContext.modelResults?.weights.privacy})`}
//               resultInterpretation={valueToResultInterpretation(
//                 rioModelContext.modelResults?.weightedSingleFactors.privacy
//                   .value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor="Market advantage"
//               value={`${rioModelContext.modelResults?.weightedSingleFactors.marketAdvantage.value.toFixed(
//                 2
//               )} (weight ${
//                 rioModelContext.modelResults?.weights.marketAdvantage
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 rioModelContext.modelResults?.weightedSingleFactors
//                   .marketAdvantage.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor="Long-term Resilience"
//               value={`${rioModelContext.modelResults?.weightedSingleFactors.longTermResilience.value.toFixed(
//                 2
//               )} (weight ${
//                 rioModelContext.modelResults?.weights.longTermResilience
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 rioModelContext.modelResults?.weightedSingleFactors
//                   .longTermResilience.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor="Long-term Scalability"
//               value={`${rioModelContext.modelResults?.weightedSingleFactors.longTermScalability.value.toFixed(
//                 2
//               )} (weight ${
//                 rioModelContext.modelResults?.weights.longTermScalability
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 rioModelContext.modelResults?.weightedSingleFactors
//                   .longTermScalability.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor="Legal Requirements"
//               value={`${rioModelContext.modelResults?.weightedSingleFactors.legalRequirements.value.toFixed(
//                 2
//               )} (weight ${
//                 rioModelContext.modelResults?.weights.legalRequirements
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 rioModelContext.modelResults?.weightedSingleFactors
//                   .legalRequirements.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={RioInputEnum.INNOVATION}
//               value={`${rioModelContext.modelResults?.weightedSingleFactors.innovation.value.toFixed(
//                 2
//               )} (weight ${rioModelContext.modelResults?.weights.innovation})`}
//               resultInterpretation={valueToResultInterpretation(
//                 rioModelContext.modelResults?.weightedSingleFactors.innovation
//                   .value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={RioInputEnum.OTHER_RISKS}
//               value={`${rioModelContext.modelResults?.weightedSingleFactors.otherRisks.value.toFixed(
//                 2
//               )} (weight ${rioModelContext.modelResults?.weights.otherRisks})`}
//               resultInterpretation={valueToResultInterpretation(
//                 rioModelContext.modelResults?.weightedSingleFactors.otherRisks
//                   .value
//               )}
//             />
//           </div>
//           <ResultEntry
//             factor="Scaled Total Score"
//             value={rioModelContext.modelResults?.scaledTotalScore.toFixed(2)}
//             description={`From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}
//             resultInterpretation={valueToResultInterpretation(
//               rioModelContext.modelResults?.scaledTotalScore
//             )}
//           />
//         </>
//       ) : (
//         <p>
//           {"No valid RIO model inputs. Unable to calculate the RIO results"}
//         </p>
//       )}
//     </div>
//   );
// }

// export default RioResultsList;
