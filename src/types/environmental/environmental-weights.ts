import { EnvironmentalInputs } from "./environmental-inputs";

export type EnvironmentalWeights = {
  [K in keyof EnvironmentalInputs]: number;
};
