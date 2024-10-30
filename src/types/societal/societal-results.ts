import { Score } from "../score";

export type SocietalResults = {
  singleScores: Score[];
  avgScore: number;
  totalScore: number;
  scaledTotalScore: number;
};
