import ActionButton from "@/components/ActionButton";
import DialogContainer from "@/components/DialogContainer";
import ResultEntry from "@/components/ResultEntry";
import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { valueToResultInterpretation } from "@/utils/value-to-result-interpretation";
import React from "react";

function EnvironmentalResultsDialog() {
  const environmentalModelContext = useEnvironmentalModel();
  return (
    <DialogContainer
      title="Environmental Model Results"
      body="The environmental model allows a user to input societal factors on a scale from -2 to 2. These results are then multiplied by their weights."
    >
      {environmentalModelContext.modelResults && (
        <>
          <div>
            <ResultEntry
              isSmall
              factor="Carbon Footprint"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.carbonFootprint.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.carbonFootprint
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .carbonFootprint
              )}
            />
            <ResultEntry
              isSmall
              factor="Resource Consumption"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.resourceConsumption.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .resourceConsumption
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .resourceConsumption
              )}
            />
            <ResultEntry
              isSmall
              factor="Waste Production"
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
              factor="Bio Diversity"
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
              factor="Air Pollution"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.airPollution.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.airPollution
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .airPollution
              )}
            />
            <ResultEntry
              isSmall
              factor="Water Pollution"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.waterPollution.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.waterPollution
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .waterPollution
              )}
            />
            <ResultEntry
              isSmall
              factor="Land Pollution"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.landPollution.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.landPollution
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .landPollution
              )}
            />
            <ResultEntry
              isSmall
              factor="Noise Pollution"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.noisePollution.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.noisePollution
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .noisePollution
              )}
            />
            <ResultEntry
              isSmall
              factor="Adoption of Renewable Energy"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.adoptionOfRenewableEnergy.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .adoptionOfRenewableEnergy
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .adoptionOfRenewableEnergy
              )}
            />
            <ResultEntry
              isSmall
              factor="Energy Efficiency"
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
              factor="Recycling Rate"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.recyclingRate.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights.recyclingRate
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .recyclingRate
              )}
            />
            <ResultEntry
              isSmall
              factor="Green Certifications"
              value={`${environmentalModelContext.modelResults?.weightedSingleFactors.greenCertifications.toFixed(
                2
              )} (weight ${
                environmentalModelContext.modelResults?.weights
                  .greenCertifications
              })`}
              resultInterpretation={valueToResultInterpretation(
                environmentalModelContext.modelResults?.weightedSingleFactors
                  .greenCertifications
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

export default EnvironmentalResultsDialog;
