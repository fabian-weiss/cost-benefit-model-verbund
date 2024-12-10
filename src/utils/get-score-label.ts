import { Impact } from "@/enums/Impact";
import { numberToImpact } from "./number-to-impact";

export const getScoreLabel = (mappedScore: number, weight: number): Impact => {
  const score: number = mappedScore / weight;
  return numberToImpact(score);
};
