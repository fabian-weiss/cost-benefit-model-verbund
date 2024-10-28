import { InputFieldType } from "./input-field-type";

export type InputGroupType = {
  inputField: InputFieldType;
  label: string;
  values: number[];
  removeCallback: (value: number) => void;
  isCurrency?: boolean;
  suffix?: string;
  rangeAdjustments?: number[];
};
