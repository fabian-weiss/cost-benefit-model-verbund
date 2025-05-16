// src/lib/schema.js (or wherever you prefer)
import { Impact } from "@/enums/Impact";
import { z } from "zod";

// const Impact = z.enum([
//   "Very Negative",
//   "Negative",
//   "Neutral",
//   "Positive",
//   "Very Positive",
// ]);

export const ImpactEnum = z.nativeEnum(Impact); // ✅ now types match

// Map impact strings to numerical values for the AI
const impactToValueMap = {
  "Very Negative": -2,
  Negative: -1,
  Neutral: 0,
  Positive: 1,
  "Very Positive": 2,
};

// Helper to ensure the value matches the impact string
const FactorInput = z
  .object({
    value: z.union([
      z.literal(-2),
      z.literal(-1),
      z.literal(0),
      z.literal(1),
      z.literal(2),
    ]),
    impact: ImpactEnum,
    comment: z.string(),
  })
  .refine((data) => data.value === impactToValueMap[data.impact], {
    message: "Value must correspond to the selected impact string.",
    // Optional: specify path for better error reporting if needed
    // path: ["value", "impact"],
  });

const SocietalSchema = z.object({
  customerSatisfaction: FactorInput,
  customerAffordability: FactorInput,
  companyCulture: FactorInput,
  communityImplications: FactorInput,
  knowledgeSharingAcrossTheSupplyChain: FactorInput,
  shareholderValue: FactorInput,
  guidingPrinciplesAlignment: FactorInput,
  publicPerception: FactorInput,
  workplaceCreation: FactorInput,
  healthAndSafety: FactorInput,
});

const EnvironmentalSchema = z.object({
  unSustainableGoals: FactorInput, // Typo in original schema? Assuming unSustainableGoals -> sustainableGoalsAlignment or similar. Keeping as is for now.
  wasteProduction: FactorInput,
  biodiversity: FactorInput,
  pollution: FactorInput,
  sustainableEneryIntegration: FactorInput, // Typo: Enery -> Energy
  energyEfficiency: FactorInput,
  meetingEnvironmentalRegulations: FactorInput,
});
const RioSchema = z.object({
  // Assuming RIO stands for Risk, Innovation, Opportunity or similar
  privacy: FactorInput,
  marketAdvantage: FactorInput,
  longTermResilience: FactorInput,
  longTermScalability: FactorInput,
  legalRequirements: FactorInput,
  innovation: FactorInput,
  otherRisks: FactorInput,
});

const StructuredInputs = z.object({
  societal: SocietalSchema,
  environmental: EnvironmentalSchema,
  rio: RioSchema,
});

export {
  StructuredInputs,
  FactorInput,
  Impact,
  SocietalSchema,
  EnvironmentalSchema,
  RioSchema,
}; // Export all needed parts
