export const calculateROI = (
  totalCashflow: number,
  initialInvestment: number,
  totalInvestment: number
): number => {
  const ROI =
    (totalCashflow - initialInvestment) / (totalInvestment + initialInvestment);
  //const adjustedROI = adjustForRisk(ROI, riskFactor);
  //const scaledROI = scaleNumber(adjustedROI, -1, 2);
  return ROI;
};
