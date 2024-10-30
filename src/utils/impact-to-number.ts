import { Impact } from "@/enums/Impact";

export const impactToNumber = (impact: Impact): number => {
  switch (impact) {
    case Impact.VERY_NEGATIVE:
      return -2;
    case Impact.NEGATIVE:
      return -1;
    case Impact.NEUTRAL:
      return 0;
    case Impact.POSITIVE:
      return 1;
    case Impact.VERY_POSITIVE:
      return 2;
  }
};
