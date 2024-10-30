import { FinancialCategory } from "@/enums/FinancialCategory";
import { InputFieldType } from "./input-field-type";
import { InputHeaderType } from "./input-header-type";
import { DropdownInputType } from "./dropdown-input-type";

export type InputGroupType = {
  id: string;
  category?: FinancialCategory;
  inputFields?: InputFieldType[];
  inputHeader: InputHeaderType;
  dropdownFields?: DropdownInputType[];
  // label: string;
};
