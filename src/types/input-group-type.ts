import { FinancialCategory } from "@/enums/FinancialCategory";
import { InputFieldType } from "./input-field-type";
import { InputHeaderType } from "./input-header-type";
import { DropdownInputType } from "./dropdown-input-type";
import { DescriptionDialogType } from "./description-dialog-type";
import { DynamicFinancialInput } from "./financials/dynamic-financial-input";

export type InputGroupType = {
  id: string;
  financialCategory?: FinancialCategory;
  inputFields?: InputFieldType[];
  inputHeader: InputHeaderType;
  dropdownFields?: DropdownInputType[];
  detailedDescription?: DescriptionDialogType; // Tooltip description
  disableComments?: boolean;
  handleShowComments?: () => void;
  submitLabel?: string;
  submitCallback?: () => void;
  isDynamic?: boolean;
  dynamicValues?: DynamicFinancialInput[];
  dynamicRemoveCallback?: (value: DynamicFinancialInput) => void;
  // label: string;
};
