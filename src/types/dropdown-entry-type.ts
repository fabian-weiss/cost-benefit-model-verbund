import { Impact } from "@/enums/Impact";

export type DropdownEntryType = {
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  prefix?: string;
  impact: Impact;
};
