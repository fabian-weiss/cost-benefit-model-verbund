import { StructuredInputs } from "@/lib/schemas";
import { z } from "zod";

export type StructuredInputsType = z.infer<typeof StructuredInputs>;
