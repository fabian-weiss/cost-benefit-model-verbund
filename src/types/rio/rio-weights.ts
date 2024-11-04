import { RioInputs } from "./rio-inputs";

export type RioWeights = {
  [K in keyof RioInputs]: number;
};
