import { Impact } from "@/enums/Impact";
import { EnvironmentalInputs } from "@/types/environmental/environmental-inputs";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { EnvironmentalWeights } from "@/types/environmental/environmental-weights";
import { FactorInputType } from "@/types/factor-input-type";
import { scaleNumber } from "@/utils/scale-number";
import { round } from "mathjs";

export const environmentalModel = (
  inputs: EnvironmentalInputs
): EnvironmentalResults => {
  const weights: EnvironmentalWeights = {
    unSustainableGoals: 0.2,
    wasteProduction: 0.1,
    biodiversity: 0.1,
    pollution: 0.1,
    sustainableEneryIntegration: 0.1,
    energyEfficiency: 0.2,
    meetingEnvironmentalRegulations: 0.2,
  };

  const weightedScores: EnvironmentalInputs = {
    unSustainableGoals: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    wasteProduction: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    biodiversity: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    pollution: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    sustainableEneryIntegration: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    energyEfficiency: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    meetingEnvironmentalRegulations: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
  };

  // Calculate individual weighted scores
  (Object.keys(inputs) as Array<keyof EnvironmentalInputs>).forEach((key) => {
    const weightedResult: number = inputs[key].value * weights[key];
    weightedScores[key].value = weightedResult;
    weightedScores[key].impact = inputs[key].impact;
    weightedScores[key].comment = inputs[key].comment;
    //weightedScores.push({ key, value: weightedResult, weight: weights[key] });
  });

  // Calculate total score
  const totalScore: number = Object.values(weightedScores).reduce(
    (acc, factorInput: FactorInputType) => acc + factorInput.value,
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
