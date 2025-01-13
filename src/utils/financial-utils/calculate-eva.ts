export const calculateEVA = (
  cashflows: number[],
  discountRate: number,
  taxRate: number,
  initialInvestment: number
): number => {
  const r: number = 1 - taxRate;
  // let NOPAT: number = 0;
  let EVA: number = 0;

  for (let i = 0; i < cashflows.length; i++) {
    const cashflow_i: number = cashflows[i];
    const NOPAT_i: number = cashflow_i * r;
    const EVA_i: number =
      (NOPAT_i > 0 ? NOPAT_i : 0) - initialInvestment * discountRate;
    // if(NOPAT_i > 0) {
    //   NOPAT += NOPAT_i;
    // }
    EVA += EVA_i;

    console.log(`EVA in year ${i}: ${EVA_i}`);
  }
  // const NOPAT: number = cashflow * (1 - taxRate);
  // const totalCapital: number = initialInvestment;

  // const EVA = NOPAT - totalCapital * discountRate;
  return EVA;
};
