export function normalizeCamelCase(str: string) {
  let normalizedString: string = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase());

  if (normalizedString.includes("Un ")) {
    normalizedString = normalizedString.replace("Un ", "UN ");
  }
  return normalizedString;
}
