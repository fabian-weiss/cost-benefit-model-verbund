import { Impact } from "@/enums/Impact";
import { SocietalInputs } from "@/types/societal/societal-inputs";
import { SocietalResults } from "@/types/societal/societal-results";
import { SocietalWeights } from "@/types/societal/societal-weights";
import { scaleNumber } from "@/utils/scale-number";
import { round } from "mathjs";

export const societalModel = (inputs: SocietalInputs): SocietalResults => {
  const weights: SocietalWeights = {
    customerSatisfaction: 0.1,
    customerAffordability: 0.2,
    companyCulture: 0.1,
    communityImplications: 0.05,
    knowledgeSharingAcrossTheSupplyChain: 0.2,
    shareholderValue: 0.05,
    guidingPrinciplesAlignment: 0.1,
    publicPerception: 0.05,
    workplaceCreation: 0.05,
    healthAndSafety: 0.1,
  };

  //console.log(`inputs are: ${JSON.stringify(inputs)}`);

  // Initialize weighted scores
  const weightedScores: SocietalInputs = {
    customerSatisfaction: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    customerAffordability: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    companyCulture: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    communityImplications: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    knowledgeSharingAcrossTheSupplyChain: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    shareholderValue: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    guidingPrinciplesAlignment: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    publicPerception: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    workplaceCreation: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
    healthAndSafety: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: undefined,
    },
  };

  // Calculate individual weighted scores
  (Object.keys(inputs) as Array<keyof SocietalInputs>).forEach((key) => {
    const weightedResult: number = inputs[key].value * weights[key];
    weightedScores[key].value = weightedResult;
    weightedScores[key].impact = inputs[key].impact;
    weightedScores[key].comment = inputs[key].comment;

    //weightedScores.push({ key, value: weightedResult, weight: weights[key] });
  });

  // Calculate total score
  const totalScore: number = Object.values(weightedScores).reduce(
    (acc, factorInput) => acc + factorInput.value,
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

  console.log("WEIGHTED SCORES: ", JSON.stringify(weightedScores));

  const result: SocietalResults = {
    weightedSingleFactors: weightedScores,
    avgScore: round(avgScore, 2),
    totalScore: round(totalScore, 2),
    scaledTotalScore: round(scaledTotalScore, 2),
    weights: weights,
  };

  return result;
};
