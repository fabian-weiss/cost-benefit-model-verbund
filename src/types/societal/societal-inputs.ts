import { LooseSocietalSchema, SocietalSchema } from "@/lib/schemas";
import { z } from "zod";

export type SocietalInputs = z.infer<typeof SocietalSchema>;
export type LooseSocietalInputs = z.infer<typeof LooseSocietalSchema>;

// export type SocietalInputs = {
//   customerSatisfaction: FactorInputType;
//   customerAffordability: FactorInputType;
//   companyCulture: FactorInputType;
//   communityImplications: FactorInputType;
//   knowledgeSharingAcrossTheSupplyChain: FactorInputType;
//   shareholderValue: FactorInputType;
//   guidingPrinciplesAlignment: FactorInputType;
//   publicPerception: FactorInputType;
//   workplaceCreation: FactorInputType;
//   healthAndSafety: FactorInputType;
// };
