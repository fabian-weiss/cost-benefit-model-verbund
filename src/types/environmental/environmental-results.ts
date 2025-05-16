import { LooseEnvironmentalInputs } from "./environmental-inputs";
import { EnvironmentalWeights } from "./environmental-weights";

export type EnvironmentalResults = {
  weightedSingleFactors: LooseEnvironmentalInputs;
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
  weights: EnvironmentalWeights;
};
