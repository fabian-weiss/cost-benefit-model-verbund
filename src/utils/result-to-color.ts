import { ResultInterpretation } from "@/enums/ResultInterpretation";

export const resultToColor = (result: ResultInterpretation): string => {
  switch (result) {
    case ResultInterpretation.POSITIVE:
      return "#20be45";
    case ResultInterpretation.NEGATIVE:
      return "#ff002f";
    case ResultInterpretation.NEUTRAL:
      return "var(--primary-text-color)";
  }
};
