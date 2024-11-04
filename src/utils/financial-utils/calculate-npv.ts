export const calculateNPV = (
  initialCosts: number,
  discountedCashflow: number
): number => {
  const NPV: number = discountedCashflow - initialCosts;

  return NPV;
};
