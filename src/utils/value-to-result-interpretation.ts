import { ResultInterpretation } from "@/enums/ResultInterpretation";

export const valueToResultInterpretation = (
  value: number
): ResultInterpretation => {
  if (value === 0) {
    return ResultInterpretation.NEUTRAL;
  } else if (value > 0) {
    return ResultInterpretation.POSITIVE;
  } else {
    return ResultInterpretation.NEGATIVE;
  }
};
