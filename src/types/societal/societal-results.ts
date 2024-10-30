import { Score } from "../score";
import { SocietalInputs } from "./societal-inputs";
import { SocietalWeights } from "./societal-weights";

export type SocietalResults = {
  weightedSingleFactors: SocietalInputs;
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
  weights: SocietalWeights;
};
