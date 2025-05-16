import { LooseRioSchema, RioSchema } from "@/lib/schemas";
import { z } from "zod";

export type RioInputs = z.infer<typeof RioSchema>;
export type LooseRioInputs = z.infer<typeof LooseRioSchema>;

// export type RioInputs = {
//   privacy: FactorInputType;
//   marketAdvantage: FactorInputType;
//   longTermResilience: FactorInputType;
//   longTermScalability: FactorInputType;
//   legalRequirements: FactorInputType;
//   innovation: FactorInputType;
//   otherRisks: FactorInputType;
// };
