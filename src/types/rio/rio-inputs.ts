import { RioSchema } from "@/lib/schemas";
import { z } from "zod";

export type RioInputs = z.infer<typeof RioSchema>;

// export type RioInputs = {
//   privacy: FactorInputType;
//   marketAdvantage: FactorInputType;
//   longTermResilience: FactorInputType;
//   longTermScalability: FactorInputType;
//   legalRequirements: FactorInputType;
//   innovation: FactorInputType;
//   otherRisks: FactorInputType;
// };
