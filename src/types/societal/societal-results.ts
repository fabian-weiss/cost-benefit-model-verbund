import { LooseSocietalInputs } from "./societal-inputs";
import { SocietalWeights } from "./societal-weights";

export type SocietalResults = {
  weightedSingleFactors: LooseSocietalInputs;
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
  weights: SocietalWeights;
};
