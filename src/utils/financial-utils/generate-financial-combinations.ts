import { FinancialInputs } from "@/types/financials/financial-inputs";

export const generateCombinations = (
  inputRanges: Record<string, number[]>
): FinancialInputs[] => {
  const keys = Object.keys(inputRanges);
  const ranges = Object.values(inputRanges);

  function combine(
    index: number,
    currentCombo: Partial<FinancialInputs>
  ): FinancialInputs[] {
    if (index === ranges.length) {
      return [currentCombo as FinancialInputs];
    }

    const results: FinancialInputs[] = [];
    for (const value of ranges[index]) {
      results.push(
        ...combine(index + 1, { ...currentCombo, [keys[index]]: value })
      );
    }
    return results;
  }

  return combine(0, {});
};
