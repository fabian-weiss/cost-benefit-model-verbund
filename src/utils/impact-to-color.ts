import { Impact } from "@/enums/Impact";

export const impactToColor = (
  impact: Impact
): { textColor: string; backgroundColor: string } => {
  switch (impact) {
    case Impact.VERY_NEGATIVE:
      return { textColor: "white", backgroundColor: "#ff002f" };
    case Impact.NEGATIVE:
      return {
        textColor: "var(--primary-text-color)",
        backgroundColor: "#ffc2cd",
      };
    case Impact.NEUTRAL:
      return {
        textColor: "var(--primary-text-color)",
        backgroundColor: "#fff",
      };
    case Impact.POSITIVE:
      return {
        textColor: "var(--primary-text-color)",
        backgroundColor: "#c6f5d1",
      };
    case Impact.VERY_POSITIVE:
      return { textColor: "white", backgroundColor: "#20be45" };
  }
};
