// The input for a factor in any input group

import { Impact } from "@/enums/Impact";

// @param comment - Optional comment for the factor (e.g. "Noise pollution is a concern, but the company is working on it")
export type FactorInputType = {
  value: -2 | -1 | 0 | 1 | 2;
  impact: Impact;
  comment?: string;
};
