import { EnvironmentalSchema } from "@/lib/schemas";
// import { FactorInputType } from "../factor-input-type";
import { z } from "zod";

export type EnvironmentalInputs = z.infer<typeof EnvironmentalSchema>;

// export type EnvironmentalInputs = {
//   unSustainableGoals: FactorInputType;
//   wasteProduction: FactorInputType;
//   biodiversity: FactorInputType;
//   pollution: FactorInputType;
//   sustainableEneryIntegration: FactorInputType;
//   energyEfficiency: FactorInputType;
//   meetingEnvironmentalRegulations: FactorInputType;
// };
