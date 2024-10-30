import { EnvironmentalInputs } from "@/types/environmental/environmental-inputs";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { Score } from "@/types/score";
import { scaleNumber } from "@/utils/scale-number";
import { round } from "mathjs";

type Weights = {
  [K in keyof EnvironmentalInputs]: number;
};

export const environmentalModel = (
  inputs: EnvironmentalInputs
): EnvironmentalResults => {
  const weights: Weights = {
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

  const weightedScores: Score[] = [];

  // Calculate individual weighted scores
  (Object.keys(inputs) as Array<keyof EnvironmentalInputs>).forEach((key) => {
    const weightedResult: number = inputs[key] * weights[key];
    weightedScores.push({ key, value: weightedResult, weight: weights[key] });
  });

  // Calculate total score
  const totalScore: number = Object.values(weightedScores).reduce(
    (acc, score: Score) => acc + score.value,
    0
  );

  const avgScore: number = round(totalScore / weightedScores.length, 2);

  const maxScore: number = 2;
  const minScore: number = -2;
  //   const maxScore: number = 2 * weightedScores.length;
  //   const minScore: number = -2 * weightedScores.length;

  const scaledTotalScore: number = scaleNumber(totalScore, minScore, maxScore);

  const result: EnvironmentalResults = {
    singleScores: weightedScores,
    avgScore: round(avgScore, 2),
    totalScore: round(totalScore, 2),
    scaledTotalScore: round(scaledTotalScore, 2),
  };

  return result;
};
