export const isBetweenOneAndHundred = (value?: number): boolean => {
  if (value != undefined && value <= 100 && value >= 0) {
    return true;
  }

  return false;
};
