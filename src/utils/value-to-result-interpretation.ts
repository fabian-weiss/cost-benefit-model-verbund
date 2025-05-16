import { ResultInterpretation } from "@/enums/ResultInterpretation";

export const valueToResultInterpretation = (
  value: number,
  isFinal: boolean = false
): ResultInterpretation => {
  if (!isFinal) {
    if (value === 0) {
      return ResultInterpretation.NEUTRAL;
    } else if (value > 0) {
      return ResultInterpretation.POSITIVE;
    } else {
      return ResultInterpretation.NEGATIVE;
    }
  } else {
    if (value >= 0 && value < 0.2) {
      return ResultInterpretation.NEUTRAL;
    } else if (value >= 0.2) {
      return ResultInterpretation.POSITIVE;
    } else {
      return ResultInterpretation.NEGATIVE;
    }
  }
};
