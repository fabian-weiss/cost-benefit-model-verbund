import { EnvironmentalInputs } from "./environmental-inputs";
import { EnvironmentalWeights } from "./environmental-weights";

export type EnvironmentalResults = {
  weightedSingleFactors: EnvironmentalInputs;
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
  weights: EnvironmentalWeights;
};
