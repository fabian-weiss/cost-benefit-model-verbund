import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";
import { resultToColor } from "@/utils/result-to-color";
import { impactToNumber } from "@/utils/impact-to-number";
import { normalizeCamelCase } from "@/utils/normalize-camel-case";

function EnvironmentalResultsList() {
  const environmentalModelContext = useEnvironmentalModel();
  const title: string = "Environmental Model Results";
  const body: string =
    "The RIO model allows a user to input risk, innovation and opportunity factors on a scale from -2 to 2. These results are then multiplied by their weights.";

  return (
    <>
      {environmentalModelContext.modelResults ? (
        <>
          <tbody>
            <tr style={{ paddingTop: "50px" }}>
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
              environmentalModelContext.modelResults.weightedSingleFactors
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
                    environmentalModelContext.modelResults?.weights[
                      factorKey as keyof typeof environmentalModelContext.modelResults.weights
                    ]
                  }
                </td>
                <td>
                  {(
                    impactToNumber(factor.impact) *
                    (environmentalModelContext.modelResults?.weights[
                      factorKey as keyof typeof environmentalModelContext.modelResults.weights
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
                      environmentalModelContext.modelResults?.scaledTotalScore
                    )
                  ),
                }}
              >{`Scaled Total Score: ${environmentalModelContext.modelResults?.scaledTotalScore.toFixed(
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
              {"No valid RIO model inputs. Unable to calculate the RIO results"}
            </th>
          </tr>
        </tbody>
      )}
    </>
  );
}

export default EnvironmentalResultsList;
// function EnvironmentalResultsList() {
//   const environmentalModelContext = useEnvironmentalModel();
//   return (
//     <div className="fw-results-container">
//       {environmentalModelContext.modelResults ? (
//         <>
//           <div>
//             <ResultEntry
//               isSmall
//               factor={EnvironmentalInputEnum.UN_SUSTAINABLE_GOALS}
//               value={`${environmentalModelContext.modelResults?.weightedSingleFactors.unSustainableGoals.value.toFixed(
//                 2
//               )} (weight ${
//                 environmentalModelContext.modelResults?.weights
//                   .unSustainableGoals
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 environmentalModelContext.modelResults?.weightedSingleFactors
//                   .unSustainableGoals.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={EnvironmentalInputEnum.WASTE_PRODUCTION}
//               value={`${environmentalModelContext.modelResults?.weightedSingleFactors.wasteProduction.value.toFixed(
//                 2
//               )} (weight ${
//                 environmentalModelContext.modelResults?.weights.wasteProduction
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 environmentalModelContext.modelResults?.weightedSingleFactors
//                   .wasteProduction.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={EnvironmentalInputEnum.BIODIVERSITY}
//               value={`${environmentalModelContext.modelResults?.weightedSingleFactors.biodiversity.value.toFixed(
//                 2
//               )} (weight ${
//                 environmentalModelContext.modelResults?.weights.biodiversity
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 environmentalModelContext.modelResults?.weightedSingleFactors
//                   .biodiversity.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={EnvironmentalInputEnum.POLLUTION}
//               value={`${environmentalModelContext.modelResults?.weightedSingleFactors.pollution.value.toFixed(
//                 2
//               )} (weight ${
//                 environmentalModelContext.modelResults?.weights.pollution
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 environmentalModelContext.modelResults?.weightedSingleFactors
//                   .pollution.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={EnvironmentalInputEnum.SUSTAINABLE_ENERGY_INTEGRATION}
//               value={`${environmentalModelContext.modelResults?.weightedSingleFactors.sustainableEneryIntegration.value.toFixed(
//                 2
//               )} (weight ${
//                 environmentalModelContext.modelResults?.weights
//                   .sustainableEneryIntegration
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 environmentalModelContext.modelResults?.weightedSingleFactors
//                   .sustainableEneryIntegration.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={EnvironmentalInputEnum.ENERGY_EFFICIENCY}
//               value={`${environmentalModelContext.modelResults?.weightedSingleFactors.energyEfficiency.value.toFixed(
//                 2
//               )} (weight ${
//                 environmentalModelContext.modelResults?.weights.energyEfficiency
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 environmentalModelContext.modelResults?.weightedSingleFactors
//                   .energyEfficiency.value
//               )}
//             />
//             <ResultEntry
//               isSmall
//               factor={EnvironmentalInputEnum.MEETING_ENVIRONMENTAL_REGULATIONS}
//               value={`${environmentalModelContext.modelResults?.weightedSingleFactors.meetingEnvironmentalRegulations.value.toFixed(
//                 2
//               )} (weight ${
//                 environmentalModelContext.modelResults?.weights
//                   .meetingEnvironmentalRegulations
//               })`}
//               resultInterpretation={valueToResultInterpretation(
//                 environmentalModelContext.modelResults?.weightedSingleFactors
//                   .meetingEnvironmentalRegulations.value
//               )}
//             />
//           </div>
//           <ResultEntry
//             factor="Scaled Total Score"
//             value={environmentalModelContext.modelResults?.scaledTotalScore.toFixed(
//               2
//             )}
//             description={`From -1 to 1, where 1 is the best possible outcome. It's scaled down based on maximum and minimum outcomes.`}
//             resultInterpretation={valueToResultInterpretation(
//               environmentalModelContext.modelResults?.scaledTotalScore
//             )}
//           />
//         </>
//       ) : (
//         <p>{`Model results are undefined. Unable to make a project suggestion.`}</p>
//       )}
//     </div>
//   );
// }

// export default EnvironmentalResultsList;
