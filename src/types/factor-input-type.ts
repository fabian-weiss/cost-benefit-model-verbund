// The input for a factor in any input group

import { Impact } from "@/enums/Impact";

// @param comment - Optional comment for the factor (e.g. "Noise pollution is a concern, but the company is working on it")
export type FactorInputType = {
  value: number;
  impact: Impact;
  comment?: string;
};
