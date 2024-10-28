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
  suffix?: string;
  actionWidget?: React.ReactNode;
};
