import { DynamicInputEnum } from "@/enums/DynamicInputEnum";

export type DynamicFinancialInput = {
  id: string;
  year: number;
  amount: number;
  type: DynamicInputEnum;
};
