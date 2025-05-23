import { Impact } from "@/enums/Impact";
import {
  LooseSocietalInputs,
  SocietalInputs,
} from "@/types/societal/societal-inputs";
import { SocietalResults } from "@/types/societal/societal-results";
import { SocietalWeights } from "@/types/societal/societal-weights";
import { scaleNumber } from "@/utils/scale-number";
import { round } from "mathjs";

export const societalModel = (inputs: SocietalInputs): SocietalResults => {
  const weights: SocietalWeights = {
    customerSatisfaction: 0.1,
    customerAffordability: 0.1,
    companyCulture: 0.1,
    shareholderValue: 0.05,
    publicPerception: 0.05,
    knowledgeSharingAcrossTheSupplyChain: 0.2,
    communityImplications: 0.05,
    guidingPrinciplesAlignment: 0.1,
    workplaceCreation: 0.05,
    healthAndSafety: 0.2,
  };

  //console.log(`inputs are: ${JSON.stringify(inputs)}`);

  // Initialize weighted scores
  const weightedScores: LooseSocietalInputs = {
    customerSatisfaction: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    customerAffordability: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    companyCulture: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    communityImplications: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    knowledgeSharingAcrossTheSupplyChain: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    shareholderValue: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    guidingPrinciplesAlignment: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    publicPerception: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    workplaceCreation: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    healthAndSafety: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
  };

  // Calculate individual weighted scores
  (Object.keys(inputs) as Array<keyof LooseSocietalInputs>).forEach((key) => {
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
