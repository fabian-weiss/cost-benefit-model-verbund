import { Impact } from "@/enums/Impact";
import { DropdownEntryType } from "@/types/dropdown-entry-type";

export const impactEntries: DropdownEntryType[] = [
  {
    impact: Impact.VERY_NEGATIVE,
  },
  {
    impact: Impact.NEGATIVE,
  },
  {
    impact: Impact.NEUTRAL,
  },
  {
    impact: Impact.POSITIVE,
  },
  {
    impact: Impact.VERY_POSITIVE,
  },
];
