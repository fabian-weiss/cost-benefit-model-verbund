import { DropdownEntryType } from "./dropdown-entry-type";

export type DropdownInputType = {
  id: string;
  selectedEntry: DropdownEntryType;
  entries: DropdownEntryType[];
  onSelect: (entry: DropdownEntryType, index: number) => void;
};
