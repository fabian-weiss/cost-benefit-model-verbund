export const calculateIRR = (
  cashFlows: number[],
  guess: number = 0.08,
  initialCosts: number
): number | undefined => {
  console.log(
    `Initial costs: ${initialCosts}, cashflows: ${cashFlows}, guess: ${guess}`
  );
  let x0 = guess;
  const tolerance = 1e-6; // Use a very small tolerance for more accuracy
  const maxIterations = 5000;

  for (let i = 0; i < maxIterations; i++) {
    // Calculate NPV for the current guess
    const npv = cashFlows.reduce(
      (acc, cashFlow, t) => acc + cashFlow / Math.pow(1 + x0, t + 1),
      -initialCosts
    );

    // Calculate the derivative of NPV for Newton's method
    const derivative = cashFlows.reduce(
      (acc, cashFlow, t) =>
        acc - ((t + 1) * cashFlow) / Math.pow(1 + x0, t + 2),
      0
    );

    // Check for convergence
    if (Math.abs(npv) < tolerance) {
      console.log(`Root found after ${i} iterations: ${x0}`);
      return x0; // Root found within tolerance
    }

    // Avoid division by zero in Newton's step
    if (Math.abs(derivative) < tolerance) {
      console.log("Derivative is too small; no root found.");
      return; // No root found due to flat curve
    }

    // Update the guess using Newton's method
    const x1 = x0 - npv / derivative;

    // Check for significant change in guess
    if (Math.abs(x1 - x0) < tolerance) {
      console.log(`Converged to solution after ${i} iterations: ${x1}`);
      return x1; // Converged to solution
    }

    x0 = x1; // Prepare for next iteration
  }

  console.log(`No root found after max iterations, last guess: ${x0}`);
  return; // No root found
};
