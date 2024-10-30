import { SocietalInputs } from "./societal-inputs";

export type SocietalWeights = {
  [K in keyof SocietalInputs]: number;
};
