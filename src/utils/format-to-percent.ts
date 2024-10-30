export const formatToPercent = (value?: number): string => {
  if (!value) return "Unable to calculate";
  return `${(value * 100).toFixed(2)}%`;
};
