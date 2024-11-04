export const calculateROI = (
  totalCashflow: number,
  initialInvestment: number
): number => {
  const ROI = (totalCashflow - initialInvestment) / initialInvestment;
  //const adjustedROI = adjustForRisk(ROI, riskFactor);
  //const scaledROI = scaleNumber(adjustedROI, -1, 2);
  return ROI;
};
