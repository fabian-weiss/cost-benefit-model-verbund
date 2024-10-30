import { Impact } from "@/enums/Impact";

export const dropdownLabelFromImpact = (impact: Impact): string => {
  switch (impact) {
    case Impact.VERY_NEGATIVE:
      return "Very Negative";
    case Impact.NEGATIVE:
      return "Negative";
    case Impact.NEUTRAL:
      return "Neutral";
    case Impact.POSITIVE:
      return "Positive";
    case Impact.VERY_POSITIVE:
      return "Very Positive";
  }
};
