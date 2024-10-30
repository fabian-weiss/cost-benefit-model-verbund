import { ValueType } from "@/enums/ValueType";
import { ChangeEvent, KeyboardEventHandler } from "react";

type InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
export type InputFieldType = {
  id: string;
  value: string;
  placeholder?: string;
  error?: string;
  type?: "text" | "number";
  required?: boolean;
  label?: string;
  description?: string;
  onChange?: InputChangeHandler;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  prefix?: string;
  actionWidget?: React.ReactNode;
  values?: number[];
  removeCallback: (value: number) => void;
  valueType: ValueType;
  suffix?: string;
  rangeAdjustments?: number[];
  valueLabelSuffix?: string;
  valueLabelPrefix?: string;
};
