export const adjustForRisk = (value: number, riskFactor: number): number => {
  // Adjust the value based on risk; higher risk reduces positive impacts
  return value * (1 - (riskFactor == 0 ? 0 : riskFactor / 100)); // Risk factor is assumed to impact by up to 10% per level
};
