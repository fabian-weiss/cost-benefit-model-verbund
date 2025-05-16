import { LooseRioInputs } from "./rio-inputs";
import { RioWeights } from "./rio-weights";

export type RioResults = {
  weightedSingleFactors: LooseRioInputs;
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
  weights: RioWeights;
};
