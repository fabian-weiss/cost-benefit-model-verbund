export const calculateEVA = (
  cashflow: number,
  discountRate: number,
  taxRate: number,
  initialInvestment: number
): number => {
  const NOPAT: number = cashflow * (1 - taxRate);
  const totalCapital: number = initialInvestment;

  const EVA = NOPAT - totalCapital * discountRate;
  return EVA;
};
