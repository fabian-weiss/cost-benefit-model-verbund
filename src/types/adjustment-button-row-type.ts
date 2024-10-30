export type AdjustmentButtonRowType = {
  adjustments: number[];
  callback: (adjustment: number) => void;
  id: string;
  disabled?: boolean;
};
