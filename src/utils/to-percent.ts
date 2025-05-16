export const toPercent = (value: number | undefined): string => {
  if (value === undefined) {
    return "0%";
  }
  return `${Math.round(value * 100)}%`;
};
