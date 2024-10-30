export const calculateDiscountedCashflow = (
  cashflow: number,
  discountRate: number,
  projectDuration: number
): number => {
  return cashflow / Math.pow(1 + discountRate, projectDuration);

  //   return Array.from({ length: projectDuration }).reduce(
  //     (acc: number, _, year) => {
  //       return acc + cashflow / Math.pow(1 + discountRate, year + 1);
  //     },
  //     0
  //   );
};
