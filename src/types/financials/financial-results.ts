import { FinancialFactors } from "./financial-factors";

export type FinancialResults = {
  results: number[]; // all the results of the project based on input ranges
  factorScores: FinancialFactors[]; // an array of the factor scores of the project
  overallScore: number; // a number between -1 and 1 that represents the overall score of the project and is the average of all the results
  stdDev: number; // the standard deviation of the results
  averages: FinancialFactors; // the average of all the factor scores
};
