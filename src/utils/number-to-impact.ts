import { Impact } from "@/enums/Impact";

export const numberToImpact = (value: number): Impact => {
  switch (value) {
    case -2:
      return Impact.VERY_NEGATIVE;
    case -1:
      return Impact.NEGATIVE;
    case 0:
      return Impact.NEUTRAL;
    case 1:
      return Impact.POSITIVE;
    case 2:
      return Impact.VERY_POSITIVE;
    default:
      return Impact.NEUTRAL;
  }
};
