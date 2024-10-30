export const calculateEVA = (
  cashflow: number,
  discountRate: number,
  initialInvestment: number
): number => {
  const NOPAT: number = cashflow * (1 - discountRate);
  const totalCapital: number = initialInvestment;

  const EVA = NOPAT - totalCapital * discountRate;
  return EVA;
};
