import { RioInputs } from "./rio-inputs";
import { RioWeights } from "./rio-weights";

export type RioResults = {
  weightedSingleFactors: RioInputs;
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
  weights: RioWeights;
};
