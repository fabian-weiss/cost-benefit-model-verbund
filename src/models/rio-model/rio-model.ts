import { Impact } from "@/enums/Impact";
import { LooseRioInputs, RioInputs } from "@/types/rio/rio-inputs";
import { RioResults } from "@/types/rio/rio-results";
import { RioWeights } from "@/types/rio/rio-weights";
import { scaleNumber } from "@/utils/scale-number";
import { round } from "mathjs";

export const rioModel = (inputs: RioInputs): RioResults => {
  const weights: RioWeights = {
    privacy: 0.1,
    marketAdvantage: 0.2,
    longTermResilience: 0.25,
    longTermScalability: 0.25,
    legalRequirements: 0.1,
    otherRisks: 0.05,
    innovation: 0.05,
  };

  //console.log(`inputs are: ${JSON.stringify(inputs)}`);

  // Initialize weighted scores
  const weightedScores: LooseRioInputs = {
    privacy: { value: 0, impact: Impact.NEUTRAL, comment: "" },
    marketAdvantage: { value: 0, impact: Impact.NEUTRAL, comment: "" },
    longTermResilience: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    longTermScalability: {
      value: 0,
      impact: Impact.NEUTRAL,
      comment: "",
    },
    legalRequirements: { value: 0, impact: Impact.NEUTRAL, comment: "" },
    innovation: { value: 0, impact: Impact.NEUTRAL, comment: "" },
    otherRisks: { value: 0, impact: Impact.NEUTRAL, comment: "" },
  };

  // Calculate individual weighted scores
  (Object.keys(inputs) as Array<keyof LooseRioInputs>).forEach((key) => {
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

  const result: RioResults = {
    weightedSingleFactors: weightedScores,
    avgScore: round(avgScore, 2),
    totalScore: round(totalScore, 2),
    scaledTotalScore: round(scaledTotalScore, 2),
    weights: weights,
  };

  return result;
};
