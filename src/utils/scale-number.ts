// Helper function to scale numerical values between -1 and 1
export const scaleNumber = (
  value: number,
  min: number,
  max: number
): number => {
  return (2 * (value - min)) / (max - min) - 1;
};
