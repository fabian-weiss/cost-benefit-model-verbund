import { Impact } from "@/enums/Impact";

export const impactToColor = (
  impact: Impact
): { textColor: string; backgroundColor: string } => {
  switch (impact) {
    case Impact.VERY_NEGATIVE:
      return { textColor: "white", backgroundColor: "#ff002f" };
    case Impact.NEGATIVE:
      return { textColor: "white", backgroundColor: "#FF6347" };
    case Impact.NEUTRAL:
      return {
        textColor: "var(--primary-text-color)",
        backgroundColor: "#fff",
      };
    case Impact.POSITIVE:
      return {
        textColor: "var(--primary-text-color)",
        backgroundColor: "#6EEB83",
      };
    case Impact.VERY_POSITIVE:
      return { textColor: "white", backgroundColor: "#20be45" };
  }
};
