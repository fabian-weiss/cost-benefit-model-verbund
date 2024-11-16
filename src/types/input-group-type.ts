import { FinancialCategory } from "@/enums/FinancialCategory";
import { InputFieldType } from "./input-field-type";
import { InputHeaderType } from "./input-header-type";
import { DropdownInputType } from "./dropdown-input-type";
import { DescriptionDialogType } from "./description-dialog-type";

export type InputGroupType = {
  id: string;
  financialCategory?: FinancialCategory;
  inputFields?: InputFieldType[];
  inputHeader: InputHeaderType;
  dropdownFields?: DropdownInputType[];
  detailedDescription?: DescriptionDialogType; // Tooltip description
  disableComments?: boolean;
  handleShowComments?: () => void;
  // label: string;
};
