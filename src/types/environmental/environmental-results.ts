import { Score } from "../score";

export type EnvironmentalResults = {
  singleScores: Score[];
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
};
