import { Score } from "@/types/score";
import { SocietalInputs } from "@/types/societal/societal-inputs";
import { SocietalResults } from "@/types/societal/societal-results";
import { SocietalWeights } from "@/types/societal/societal-weights";
import { scaleNumber } from "@/utils/scale-number";
import { round } from "mathjs";

export const societalModel = (inputs: SocietalInputs): SocietalResults => {
  const weights: SocietalWeights = {
    jobCreation: 0.2,
    jobEquity: 0.1,
    healthAndSafety: 0.1,
    culturalImpact: 0.1,
    publicPerception: 0.1,
    educationalImpact: 0.1,
    qualityOfLife: 0.1,
    customerSatisfaction: 0.1,
    employeeSatisfaction: 0.1,
  };

  console.log(`inputs are: ${JSON.stringify(inputs)}`);

  // Initialize weighted scores
  const weightedScores: SocietalInputs = {
    jobCreation: 0,
    jobEquity: 0,
    healthAndSafety: 0,
    culturalImpact: 0,
    publicPerception: 0,
    educationalImpact: 0,
    qualityOfLife: 0,
    customerSatisfaction: 0,
    employeeSatisfaction: 0,
  };

  // Calculate individual weighted scores
  (Object.keys(inputs) as Array<keyof SocietalInputs>).forEach((key) => {
    const weightedResult: number = inputs[key] * weights[key];
    weightedScores[key] = weightedResult;
    //weightedScores.push({ key, value: weightedResult, weight: weights[key] });
  });

  // Calculate total score
  const totalScore: number = Object.values(weightedScores).reduce(
    (acc, value) => acc + value,
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

  const result: SocietalResults = {
    weightedSingleFactors: weightedScores,
    avgScore: round(avgScore, 2),
    totalScore: round(totalScore, 2),
    scaledTotalScore: round(scaledTotalScore, 2),
    weights: weights,
  };

  return result;
};
