import { EnvironmentalInputs } from "@/types/environmental/environmental-inputs";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { EnvironmentalWeights } from "@/types/environmental/environmental-weights";
import { Score } from "@/types/score";
import { scaleNumber } from "@/utils/scale-number";
import { round } from "mathjs";

export const environmentalModel = (
  inputs: EnvironmentalInputs
): EnvironmentalResults => {
  const weights: EnvironmentalWeights = {
    carbonFootprint: 0.1,
    resourceConsumption: 0.1,
    wasteProduction: 0.1,
    biodiversity: 0.1,
    airPollution: 0.1,
    waterPollution: 0.1,
    landPollution: 0.1,
    noisePollution: 0.1,
    adoptionOfRenewableEnergy: 0.1,
    energyEfficiency: 0.1,
    recyclingRate: 0.05,
    greenCertifications: 0.05,
  };

  const weightedScores: EnvironmentalInputs = {
    carbonFootprint: 0,
    resourceConsumption: 0,
    wasteProduction: 0,
    biodiversity: 0,
    airPollution: 0,
    waterPollution: 0,
    landPollution: 0,
    noisePollution: 0,
    adoptionOfRenewableEnergy: 0,
    energyEfficiency: 0,
    recyclingRate: 0,
    greenCertifications: 0,
  };

  // Calculate individual weighted scores
  (Object.keys(inputs) as Array<keyof EnvironmentalInputs>).forEach((key) => {
    const weightedResult: number = inputs[key] * weights[key];
    weightedScores[key] = weightedResult;
    //weightedScores.push({ key, value: weightedResult, weight: weights[key] });
  });

  // Calculate total score
  const totalScore: number = Object.values(weightedScores).reduce(
    (acc, value: number) => acc + value,
    0
  );

  const avgScore: number = round(
    totalScore / Object.entries(weightedScores).length,
    2
  );

  const maxScore: number = 2;
  const minScore: number = -2;
  //   const maxScore: number = 2 * weightedScores.length;
  //   const minScore: number = -2 * weightedScores.length;

  const scaledTotalScore: number = scaleNumber(totalScore, minScore, maxScore);

  const result: EnvironmentalResults = {
    weightedSingleFactors: weightedScores,
    avgScore: round(avgScore, 2),
    totalScore: round(totalScore, 2),
    scaledTotalScore: round(scaledTotalScore, 2),
    weights: weights,
  };

  return result;
};
